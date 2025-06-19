<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Stripe\Exception\ApiErrorException;

class StripeController extends Controller
{
    public function checkout(Request $request)
    {
        try {
            Stripe::setApiKey(config('services.stripe.secret'));

            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price' => config('services.stripe.price_id'),
                    'quantity' => 1,
                ]],
                'mode' => 'subscription',
                'success_url' => route('billing.success'),
                'cancel_url' => route('billing.cancel'),
                'customer_email' => $request->user()->email,
                'metadata' => [
                    'user_id' => $request->user()->id,
                ],
            ]);

            Log::info('Stripe checkout session created', [
                'user_id' => $request->user()->id,
                'session_id' => $session->id
            ]);

            return Inertia::location($session->url);
        } catch (\Exception $e) {
            Log::error('Stripe checkout error', [
                'user_id' => $request->user()->id,
                'error' => $e->getMessage()
            ]);

            return back()->with('error', 'Failed to create checkout session');
        }
    }

    public function webhook(Request $request)
    {
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sig_header,
                config('services.stripe.webhook_secret')
            );

            Log::info('Stripe webhook received', [
                'type' => $event->type
            ]);

            switch ($event->type) {
                case 'checkout.session.completed':
                    $session = $event->data->object;
                    $user = User::where('email', $session->customer_email)->first();

                    if ($user) {
                        // Create the subscription
                        $user->newSubscription('pro', config('services.stripe.price_id'))
                            ->create($session->subscription);

                        // Update user role to pro
                        $user->promoteToPro();

                        Log::info('Subscription created and user promoted to pro', [
                            'user_id' => $user->id,
                            'subscription_id' => $session->subscription
                        ]);
                    } else {
                        Log::error('User not found for subscription', [
                            'email' => $session->customer_email
                        ]);
                    }
                    break;

                case 'customer.subscription.deleted':
                    $subscription = $event->data->object;
                    $user = User::where('stripe_id', $subscription->customer)->first();

                    if ($user) {
                        // Only demote if they're not an admin
                        if (!$user->isAdmin()) {
                            $user->demoteToUser();
                        }

                        Log::info('Subscription cancelled and user demoted', [
                            'user_id' => $user->id,
                            'subscription_id' => $subscription->id
                        ]);
                    }
                    break;
            }

            return response()->json(['status' => 'success']);
        } catch (\UnexpectedValueException $e) {
            Log::error('Stripe webhook error - invalid payload', [
                'error' => $e->getMessage()
            ]);
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            Log::error('Stripe webhook error - invalid signature', [
                'error' => $e->getMessage()
            ]);
            return response()->json(['error' => 'Invalid signature'], 400);
        } catch (\Exception $e) {
            Log::error('Stripe webhook error', [
                'error' => $e->getMessage()
            ]);
            return response()->json(['error' => 'Webhook error'], 500);
        }
    }
}

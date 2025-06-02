<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Cashier\Exceptions\IncompletePayment;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class BillingController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        return Inertia::render('Billing/Index', [
            'auth' => [
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'onFreePlan' => !$user->subscribed('pro'),
                    'subscription' => [
                        'name' => $user->subscribed('pro') ? 'Pro' : 'Free',
                        'isPro' => $user->subscribed('pro'),
                    ],
                ],
            ],
        ]);
    }

    public function subscribe(Request $request)
    {
        $user = $request->user();

        if (!$user->onFreePlan()) {
            return redirect()->route('billing.index')
                ->with('error', 'You are already subscribed to the Pro plan.');
        }

        return Inertia::render('Billing/Subscribe', [
            'auth' => [
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'onFreePlan' => true,
                ],
            ],
        ]);
    }

    public function processSubscription(Request $request)
    {
        try {
            $request->user()->newSubscription('pro', 'price_pro')
                ->create($request->paymentMethodId);

            return redirect()->route('dashboard')
                ->with('success', 'Thank you for subscribing to Pro!');
        } catch (IncompletePayment $exception) {
            return redirect()->route('cashier.payment', [
                $exception->payment->id,
                'redirect' => route('dashboard'),
            ]);
        }
    }

    public function success()
    {
        $user = Auth::user();

        // Double check subscription status
        if (!$user->subscribed('pro')) {
            Log::warning('User accessed success page without active subscription', [
                'user_id' => $user->id
            ]);

            return redirect()->route('billing.index')
                ->with('error', 'No active subscription found. Please try subscribing again.');
        }

        return redirect()->route('dashboard')->with('success', 'Welcome to the Pro Plan! You now have unlimited resume and CV generations.');
    }

    public function cancel()
    {
        return redirect()->route('billing.index')
            ->with('error', 'Your subscription process was cancelled.');
    }

    public function portal(Request $request)
    {
        $user = $request->user();

        if ($user->onFreePlan()) {
            return redirect()->route('plans')
                ->with('error', 'You need to be subscribed to access the billing portal.');
        }

        return Inertia::render('Billing/Portal', [
            'auth' => [
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'onFreePlan' => false,
                    'subscription' => [
                        'name' => 'Pro',
                        'isPro' => true,
                    ],
                ],
            ],
        ]);
    }

    public function billingPortal(Request $request)
    {
        try {
            return $request->user()->redirectToBillingPortal();
        } catch (\Exception $e) {
            Log::error('Failed to redirect to billing portal', [
                'user_id' => $request->user()->id,
                'error' => $e->getMessage()
            ]);

            return redirect()->route('billing.index')
                ->with('error', 'Unable to access billing portal. Please try again later.');
        }
    }

    public function plans()
    {
        $user = Auth::user();

        return Inertia::render('Plans/Index', [
            'auth' => [
                'user' => [
                    'name' => $user->name,
                    'subscription' => [
                        'name' => $user->subscribed('pro') ? 'Pro' : 'Free',
                        'isPro' => $user->subscribed('pro'),
                    ],
                ],
            ],
        ]);
    }
}

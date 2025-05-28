<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class PayPalController extends Controller
{
    public function checkout(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $token = $provider->getAccessToken();

        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('paypal.success'),
                "cancel_url" => route('paypal.cancel'),
            ],
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "USD",
                        "value" => number_format($request->amount / 100, 2)
                    ],
                    "description" => "Pro Plan Subscription"
                ]
            ]
        ]);

        if (isset($response['id']) && $response['id'] != null) {
            foreach ($response['links'] as $link) {
                if ($link['rel'] === 'approve') {
                    return response()->json(['url' => $link['href']]);
                }
            }
        }

        return response()->json(['error' => 'Failed to create PayPal order'], 400);
    }

    public function success(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $token = $provider->getAccessToken();

        $response = $provider->capturePaymentOrder($request->token);

        if (isset($response['status']) && $response['status'] === 'COMPLETED') {
            $user = $request->user();
            $user->newSubscription('pro', 'price_pro_monthly')
                ->create($response['id'], [
                    'email' => $user->email,
                    'name' => $user->name,
                ]);

            return redirect()->route('billing.success');
        }

        return redirect()->route('billing.cancel');
    }

    public function cancel()
    {
        return redirect()->route('billing.cancel');
    }
}

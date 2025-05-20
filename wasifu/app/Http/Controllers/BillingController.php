<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Cashier\Exceptions\IncompletePayment;

class BillingController extends Controller
{
    public function plans()
    {
        return Inertia::render('Plans/Index');
    }

    public function billingPortal(Request $request)
    {
        return $request->user()->redirectToBillingPortal();
    }

    public function subscribe(Request $request)
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
}

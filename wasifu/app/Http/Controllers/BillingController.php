<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Cashier\Exceptions\IncompletePayment;

class BillingController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Billing/Index', [
            'auth' => [
                'user' => [
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'onFreePlan' => $request->user()->onFreePlan(),
                ],
            ],
        ]);
    }

    public function subscribe(Request $request)
    {
        if (!$request->user()->onFreePlan()) {
            return redirect()->route('billing.index')
                ->with('error', 'You are already subscribed to the Pro plan.');
        }

        return Inertia::render('Billing/Subscribe', [
            'auth' => [
                'user' => [
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
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

    public function success(Request $request)
    {
        return redirect()->route('billing.index')
            ->with('success', 'Your subscription has been activated successfully!');
    }

    public function cancel(Request $request)
    {
        return redirect()->route('billing.index')
            ->with('error', 'Your subscription was not completed.');
    }

    public function portal(Request $request)
    {
        if ($request->user()->onFreePlan()) {
            return redirect()->route('plans');
        }

        return Inertia::render('Billing/Portal', [
            'auth' => [
                'user' => [
                    'name' => $request->user()->name,
                    'email' => $request->user()->email,
                    'onFreePlan' => false,
                ],
            ],
        ]);
    }

    public function billingPortal(Request $request)
    {
        return $request->user()->redirectToBillingPortal();
    }

    public function plans()
    {
        return Inertia::render('Plans/Index');
    }
}

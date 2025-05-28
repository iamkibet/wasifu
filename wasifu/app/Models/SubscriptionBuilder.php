<?php

namespace App\Models;

class SubscriptionBuilder
{
    protected $user;
    protected $name;
    protected $stripePrice;

    public function __construct($user, $name, $stripePrice)
    {
        $this->user = $user;
        $this->name = $name;
        $this->stripePrice = $stripePrice;
    }

    public function create($stripeId, array $options = [])
    {
        $subscription = $this->user->subscriptions()->create([
            'name' => $this->name,
            'stripe_id' => $stripeId,
            'stripe_status' => 'active',
            'stripe_price' => $this->stripePrice,
            'quantity' => $options['quantity'] ?? 1,
        ]);

        return $subscription;
    }
}

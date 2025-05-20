<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Wallet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'balance',
    ];

    protected $casts = [
        'balance' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function credit(float $amount, string $description = null, array $metadata = null): Transaction
    {
        $this->increment('balance', $amount);

        return $this->user->transactions()->create([
            'amount' => $amount,
            'type' => 'credit',
            'status' => 'completed',
            'reference' => uniqid('CR'),
            'description' => $description,
            'metadata' => $metadata,
        ]);
    }

    public function debit(float $amount, string $description = null, array $metadata = null): Transaction
    {
        if ($this->balance < $amount) {
            throw new \Exception('Insufficient balance');
        }

        $this->decrement('balance', $amount);

        return $this->user->transactions()->create([
            'amount' => $amount,
            'type' => 'debit',
            'status' => 'completed',
            'reference' => uniqid('DB'),
            'description' => $description,
            'metadata' => $metadata,
        ]);
    }
}

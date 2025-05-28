<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MpesaTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'merchant_request_id',
        'checkout_request_id',
        'phone_number',
        'amount',
        'reference',
        'status',
        'mpesa_receipt_number',
        'transaction_date',
        'response_data',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'transaction_date' => 'datetime',
        'response_data' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

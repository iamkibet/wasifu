<?php

return [
    'environment' => env('MPESA_ENVIRONMENT', 'sandbox'),
    'mpesa_consumer_key' => env('MPESA_CONSUMER_KEY'),
    'mpesa_consumer_secret' => env('MPESA_CONSUMER_SECRET'),
    'passkey' => env('SAFARICOM_PASSKEY', 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'),
    'shortcode' => env('MPESA_BUSINESS_SHORTCODE', '174379'),
    'initiator_name' => env('MPESA_INITIATOR_NAME', 'testapi'),
    'initiator_password' => env('MPESA_INITIATOR_PASSWORD'),
    'b2c_shortcode' => env('MPESA_B2C_SHORTCODE'),
    'callbacks' => [
        'c2b_validation_url' => env('MPESA_C2B_VALIDATION_URL'),
        'c2b_confirmation_url' => env('MPESA_C2B_CONFIRMATION_URL'),
        'b2c_result_url' => env('MPESA_B2C_RESULT_URL'),
        'b2c_timeout_url' => env('MPESA_B2C_TIMEOUT_URL'),
        'callback_url' => env('MPESA_CALLBACK_URL'),
        'status_result_url' => env('MPESA_STATUS_RESULT_URL'),
        'status_timeout_url' => env('MPESA_STATUS_TIMEOUT_URL'),
        'balance_result_url' => env('MPESA_BALANCE_RESULT_URL'),
        'balance_timeout_url' => env('MPESA_BALANCE_TIMEOUT_URL'),
        'reversal_result_url' => env('MPESA_REVERSAL_RESULT_URL'),
        'reversal_timeout_url' => env('MPESA_REVERSAL_TIMEOUT_URL'),
        'b2b_result_url' => env('MPESA_B2B_RESULT_URL'),
        'b2b_timeout_url' => env('MPESA_B2B_TIMEOUT_URL'),
    ],
];

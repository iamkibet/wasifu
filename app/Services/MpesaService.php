<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MpesaService
{
    protected $baseUrl;
    protected $consumerKey;
    protected $consumerSecret;
    protected $passkey;
    protected $shortcode;

    public function __construct()
    {
        $this->baseUrl = config('services.mpesa.base_url');
        $this->consumerKey = config('services.mpesa.consumer_key');
        $this->consumerSecret = config('services.mpesa.consumer_secret');
        $this->passkey = config('services.mpesa.passkey');
        $this->shortcode = config('services.mpesa.shortcode');
    }

    public function initiateSTKPush($phoneNumber, $amount, $reference)
    {
        try {
            $timestamp = date('YmdHis');
            $password = base64_encode($this->shortcode . $this->passkey . $timestamp);

            // Format phone number to ensure it starts with 254
            $formattedPhone = $this->formatPhoneNumber($phoneNumber);

            // Convert amount from cents to KES
            $amountInKes = ceil($amount / 100);

            $requestBody = [
                'BusinessShortCode' => $this->shortcode,
                'Password' => $password,
                'Timestamp' => $timestamp,
                'TransactionType' => 'CustomerPayBillOnline',
                'Amount' => $amountInKes,
                'PartyA' => $formattedPhone,
                'PartyB' => $this->shortcode,
                'PhoneNumber' => $formattedPhone,
                'CallBackURL' => route('mpesa.callback'),
                'AccountReference' => substr($reference, 0, 12),
                'TransactionDesc' => 'Pro Plan Subscription'
            ];

            Log::info('M-Pesa STK Push request', [
                'request' => $requestBody,
                'phone' => $formattedPhone,
                'amount' => $amountInKes
            ]);

            $response = Http::withToken($this->getAccessToken())
                ->post($this->baseUrl . '/mpesa/stkpush/v1/processrequest', $requestBody);

            $responseData = $response->json();

            Log::info('M-Pesa STK Push response', [
                'response' => $responseData
            ]);

            if (!$response->successful()) {
                Log::error('M-Pesa API error', [
                    'status' => $response->status(),
                    'response' => $responseData
                ]);

                return [
                    'success' => false,
                    'message' => $responseData['errorMessage'] ?? 'Failed to initiate payment. Please try again.'
                ];
            }

            if (isset($responseData['errorCode'])) {
                Log::error('M-Pesa business error', [
                    'error_code' => $responseData['errorCode'],
                    'error_message' => $responseData['errorMessage']
                ]);

                return [
                    'success' => false,
                    'message' => $responseData['errorMessage'] ?? 'Failed to initiate payment. Please try again.'
                ];
            }

            return [
                'success' => true,
                'CheckoutRequestID' => $responseData['CheckoutRequestID'] ?? null,
                'MerchantRequestID' => $responseData['MerchantRequestID'] ?? null,
                'ResponseCode' => $responseData['ResponseCode'] ?? null,
                'ResponseDescription' => $responseData['ResponseDescription'] ?? null,
                'CustomerMessage' => $responseData['CustomerMessage'] ?? null
            ];
        } catch (\Exception $e) {
            Log::error('M-Pesa service error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return [
                'success' => false,
                'message' => 'An error occurred while processing your payment. Please try again.'
            ];
        }
    }

    protected function getAccessToken()
    {
        try {
            $credentials = base64_encode($this->consumerKey . ':' . $this->consumerSecret);

            $response = Http::withHeaders([
                'Authorization' => 'Basic ' . $credentials
            ])->get($this->baseUrl . '/oauth/v1/generate?grant_type=client_credentials');

            if (!$response->successful()) {
                Log::error('Failed to get M-Pesa access token', [
                    'status' => $response->status(),
                    'response' => $response->json()
                ]);
                throw new \Exception('Failed to get access token');
            }

            $data = $response->json();
            return $data['access_token'] ?? null;
        } catch (\Exception $e) {
            Log::error('Error getting M-Pesa access token', [
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }

    protected function formatPhoneNumber($phone)
    {
        // Remove any non-digit characters
        $phone = preg_replace('/[^0-9]/', '', $phone);

        // If number starts with 0, replace with 254
        if (substr($phone, 0, 1) === '0') {
            $phone = '254' . substr($phone, 1);
        }

        // If number doesn't start with 254, add it
        if (substr($phone, 0, 3) !== '254') {
            $phone = '254' . $phone;
        }

        return $phone;
    }
}

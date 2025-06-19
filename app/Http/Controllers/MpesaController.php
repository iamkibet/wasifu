<?php

namespace App\Http\Controllers;

use App\Models\MpesaTransaction;
use IanKumu\Mpesa\Mpesa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MpesaController extends Controller
{
    protected $mpesa;

    public function __construct(Mpesa $mpesa)
    {
        $this->mpesa = $mpesa;
    }

    public function initiatePayment(Request $request)
    {
        try {
            $request->validate([
                'phoneNumber' => 'required|string|min:10|max:12',
            ]);

            Log::info('Initiating M-Pesa payment', [
                'user_id' => $request->user()->id,
                'phone' => $request->phoneNumber,
                'amount' => 30,
                'reference' => 'PRO_SUB_' . $request->user()->id
            ]);

            $response = $this->mpesa->stkPush(
                $request->phoneNumber,
                30,
                'PRO_SUB_' . $request->user()->id,
                'Pro Plan Subscription'
            );

            if (!$response['success']) {
                Log::error('M-Pesa payment initiation failed', [
                    'user_id' => $request->user()->id,
                    'error' => $response['message'] ?? 'Unknown error',
                    'response' => $response
                ]);

                return back()->with('error', $response['message'] ?? 'Failed to initiate payment. Please try again.');
            }

            // Create transaction record
            MpesaTransaction::create([
                'user_id' => $request->user()->id,
                'phone_number' => $request->phoneNumber,
                'amount' => 30,
                'reference' => 'PRO_SUB_' . $request->user()->id,
                'checkout_request_id' => $response['CheckoutRequestID'] ?? null,
                'merchant_request_id' => $response['MerchantRequestID'] ?? null,
                'status' => 'pending'
            ]);

            Log::info('M-Pesa payment initiated successfully', [
                'user_id' => $request->user()->id,
                'checkout_request_id' => $response['CheckoutRequestID'] ?? null
            ]);

            return back()->with('success', 'Payment initiated successfully. Please check your phone for the M-Pesa prompt.');
        } catch (\Exception $e) {
            Log::error('M-Pesa payment error', [
                'user_id' => $request->user()->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return back()->with('error', 'An error occurred while processing your payment. Please try again.');
        }
    }

    public function callback(Request $request)
    {
        try {
            Log::info('M-Pesa callback received', [
                'data' => $request->all()
            ]);

            $callbackData = $request->all();
            $result = $callbackData['Body']['stkCallback']['ResultDesc'] ?? null;
            $resultCode = $callbackData['Body']['stkCallback']['ResultCode'] ?? null;
            $checkoutRequestId = $callbackData['Body']['stkCallback']['CheckoutRequestID'] ?? null;

            if (!$checkoutRequestId) {
                Log::error('Invalid callback data - missing CheckoutRequestID', [
                    'data' => $callbackData
                ]);
                return response()->json(['message' => 'Invalid callback data'], 400);
            }

            $transaction = MpesaTransaction::where('checkout_request_id', $checkoutRequestId)->first();

            if (!$transaction) {
                Log::error('Transaction not found', [
                    'checkout_request_id' => $checkoutRequestId
                ]);
                return response()->json(['message' => 'Transaction not found'], 404);
            }

            // Update transaction status
            $transaction->status = $resultCode === 0 ? 'completed' : 'failed';
            $transaction->result_code = $resultCode;
            $transaction->result_desc = $result;
            $transaction->save();

            Log::info('Transaction status updated', [
                'transaction_id' => $transaction->id,
                'status' => $transaction->status,
                'result_code' => $resultCode,
                'result_desc' => $result
            ]);

            // If payment was successful, activate subscription
            if ($resultCode === 0) {
                $user = $transaction->user;
                $user->subscription('pro')->create([
                    'name' => 'pro',
                    'stripe_id' => 'mpesa_' . $transaction->id,
                    'stripe_status' => 'active',
                    'stripe_price' => 'price_pro',
                    'quantity' => 1,
                    'trial_ends_at' => null,
                    'ends_at' => null,
                ]);

                Log::info('Subscription activated', [
                    'user_id' => $user->id,
                    'transaction_id' => $transaction->id
                ]);
            }

            return response()->json(['message' => 'Callback processed successfully']);
        } catch (\Exception $e) {
            Log::error('Error processing M-Pesa callback', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data' => $request->all()
            ]);

            return response()->json(['message' => 'Error processing callback'], 500);
        }
    }

    public function checkStatus(Request $request)
    {
        try {
            $transaction = MpesaTransaction::where('user_id', $request->user()->id)
                ->latest()
                ->first();

            if (!$transaction) {
                return response()->json([
                    'success' => false,
                    'message' => 'No transaction found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'status' => $transaction->status,
                'message' => $transaction->result_desc
            ]);
        } catch (\Exception $e) {
            Log::error('Error checking transaction status', [
                'user_id' => $request->user()->id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error checking payment status'
            ], 500);
        }
    }
}

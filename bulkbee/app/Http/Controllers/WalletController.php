<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function index()
    {
        $wallet = Auth::user()->wallet;
        $transactions = Transaction::where('user_id', Auth::id())
            ->latest()
            ->paginate(10);

        return Inertia::render('wallet/index', [
            'wallet' => $wallet,
            'transactions' => $transactions,
        ]);
    }

    public function history()
    {
        $transactions = Transaction::where('user_id', Auth::id())
            ->latest()
            ->paginate(20);

        return Inertia::render('wallet/history', [
            'transactions' => $transactions,
        ]);
    }

    public function topup(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:100',
            'phone' => 'required|string|size:12',
        ]);

        // TODO: Implement M-Pesa STK Push
        // This will involve:
        // 1. Initiating STK Push request to M-Pesa
        // 2. Creating a pending transaction
        // 3. Handling the callback to update transaction status
        // 4. Updating user's wallet balance

        return redirect()->route('wallet.index')
            ->with('success', 'Payment request initiated. Please check your phone to complete the payment.');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin');
    }

    public function users()
    {
        $users = User::withCount(['campaigns', 'transactions'])
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Users', [
            'users' => $users,
        ]);
    }

    public function campaigns()
    {
        $campaigns = Campaign::with(['user', 'contactGroup'])
            ->withCount('messages')
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Campaigns', [
            'campaigns' => $campaigns,
        ]);
    }

    public function payments()
    {
        $transactions = Transaction::with('user')
            ->latest()
            ->paginate(20);

        return Inertia::render('Admin/Payments', [
            'transactions' => $transactions,
        ]);
    }

    public function settings()
    {
        return Inertia::render('Admin/Settings');
    }
}

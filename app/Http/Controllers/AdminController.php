<?php

namespace App\Http\Controllers;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function dashboard()
    {
        // Check if user is admin
        if (!auth()->user()->isAdmin()) {
            return redirect()->route('dashboard');
        }

        $users = User::latest()->paginate(10);

        // Get dashboard statistics
        $stats = [
            'totalUsers' => User::count(),
            'activeSubscriptions' => User::whereHas('subscriptions', function($query) {
                $query->where('stripe_status', 'active')->whereNull('ends_at');
            })->count(),
            'monthlyRevenue' => $this->calculateMonthlyRevenue(),
            'documentsGenerated' => \App\Models\GeneratedDocument::count(),
            'newUsersThisMonth' => User::whereMonth('created_at', now()->month)->count(),
            'conversionRate' => $this->calculateConversionRate(),
        ];

        return Inertia::render('Admin/Dashboard', [
            'users' => $users,
            'stats' => $stats
        ]);
    }

    private function calculateMonthlyRevenue()
    {
        // Calculate revenue from active subscriptions
        $activeSubscriptions = User::whereHas('subscriptions', function($query) {
            $query->where('stripe_status', 'active')->whereNull('ends_at');
        })->get();

        return $activeSubscriptions->count() * 9.99; // Pro plan price
    }

    private function calculateConversionRate()
    {
        $totalUsers = User::count();
        $paidUsers = User::whereHas('subscriptions', function($query) {
            $query->where('stripe_status', 'active')->whereNull('ends_at');
        })->count();

        return $totalUsers > 0 ? round(($paidUsers / $totalUsers) * 100, 2) : 0;
    }

    public function updateUserRole(Request $request, User $user)
    {
        $request->validate([
            'role' => ['required', 'string', 'in:user,admin'],
        ]);

        try {
            match ($request->role) {
                'admin' => $user->promoteToAdmin(),
                default => $user->demoteToUser(),
            };

            Log::info('User role updated', [
                'admin_id' => $request->user()->id,
                'user_id' => $user->id,
                'new_role' => $request->role
            ]);

            return back()->with('success', 'User role updated successfully.');
        } catch (\Exception $e) {
            Log::error('Failed to update user role', [
                'admin_id' => $request->user()->id,
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);

            return back()->with('error', 'Failed to update user role.');
        }
    }
}

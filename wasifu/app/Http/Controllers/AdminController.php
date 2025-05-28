<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('admin');
    }

    public function dashboard()
    {
        $users = User::latest()->paginate(10);

        return Inertia::render('Admin/Dashboard', [
            'users' => $users
        ]);
    }

    public function updateUserRole(Request $request, User $user)
    {
        $request->validate([
            'role' => ['required', 'string', 'in:user,pro,admin'],
        ]);

        try {
            match ($request->role) {
                'admin' => $user->promoteToAdmin(),
                'pro' => $user->promoteToPro(),
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

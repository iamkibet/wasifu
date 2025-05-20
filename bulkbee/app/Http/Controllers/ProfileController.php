<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function edit()
    {
        return Inertia::render('Settings/Profile', [
            'user' => Auth::user(),
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . Auth::id(),
            'current_password' => 'nullable|string|current_password',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $user = Auth::user();

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('profile.edit')
            ->with('success', 'Profile updated successfully.');
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'password' => 'required|string|current_password',
        ]);

        $user = Auth::user();
        Auth::logout();
        $user->delete();

        return redirect()->route('welcome')
            ->with('success', 'Your account has been deleted.');
    }

    public function notifications()
    {
        return Inertia::render('Settings/Notifications', [
            'user' => Auth::user(),
        ]);
    }

    public function updateNotifications(Request $request)
    {
        $validated = $request->validate([
            'email_notifications' => 'boolean',
            'sms_notifications' => 'boolean',
            'campaign_updates' => 'boolean',
            'payment_updates' => 'boolean',
        ]);

        Auth::user()->update($validated);

        return redirect()->route('profile.notifications')
            ->with('success', 'Notification preferences updated successfully.');
    }

    public function api()
    {
        return Inertia::render('Settings/Api', [
            'user' => Auth::user(),
        ]);
    }
}

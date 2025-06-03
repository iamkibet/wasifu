<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function show()
    {
        return Inertia::render('contact');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string',
        ]);

        // Here you would typically:
        // 1. Send an email
        // 2. Store in database
        // 3. Send notification

        return redirect()->back()->with('success', 'Thank you for your message. We will get back to you soon!');
    }
}

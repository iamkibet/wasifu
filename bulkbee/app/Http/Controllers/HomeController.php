<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function welcome()
    {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('welcome', [
            'features' => [
                [
                    'title' => 'Bulk SMS',
                    'description' => 'Send messages to thousands of recipients instantly with our reliable SMS gateway.',
                    'icon' => 'Smartphone',
                ],
                [
                    'title' => 'Email Marketing',
                    'description' => 'Create and send beautiful email campaigns with our easy-to-use email builder.',
                    'icon' => 'Mail',
                ],
                [
                    'title' => 'Contact Management',
                    'description' => 'Organize and manage your contacts efficiently with smart grouping and segmentation.',
                    'icon' => 'Users',
                ],
                [
                    'title' => 'Scheduled Campaigns',
                    'description' => 'Plan and schedule your campaigns in advance for optimal delivery times.',
                    'icon' => 'Clock',
                ],
                [
                    'title' => 'Real-time Analytics',
                    'description' => 'Track campaign performance with detailed analytics and reporting.',
                    'icon' => 'BarChart',
                ],
                [
                    'title' => 'Secure & Reliable',
                    'description' => 'Enterprise-grade security and 99.9% uptime guarantee for your peace of mind.',
                    'icon' => 'Shield',
                ],
            ],
        ]);
    }
}

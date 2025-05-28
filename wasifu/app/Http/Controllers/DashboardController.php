<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $now = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth();

        // Get user's subscription status
        $subscription = [
            'name' => $user->onFreePlan() ? 'Free Plan' : 'Pro Plan',
            'isPro' => !$user->onFreePlan(),
        ];

        // Get weekly document stats
        $weeklyStats = [];
        for ($i = 0; $i < 4; $i++) {
            $weekStart = $startOfMonth->copy()->addWeeks($i);
            $weekEnd = $weekStart->copy()->endOfWeek();

            $weeklyStats[] = [
                'name' => $weekStart->format('d M'),
                'resumes' => $user->generatedDocuments()
                    ->where('created_at', '>=', $weekStart)
                    ->where('created_at', '<=', $weekEnd)
                    ->whereNotNull('resume_html')
                    ->count(),
                'coverLetters' => $user->generatedDocuments()
                    ->where('created_at', '>=', $weekStart)
                    ->where('created_at', '<=', $weekEnd)
                    ->whereNotNull('cover_letter_html')
                    ->count(),
            ];
        }

        // Get generations this month
        $generationsThisMonth = $user->generatedDocuments()
            ->where('created_at', '>=', $startOfMonth)
            ->count();

        // Get max generations based on plan
        $maxGenerations = $user->onFreePlan() ? 2 : PHP_INT_MAX;

        // Get recent documents count
        $recentDocuments = $user->generatedDocuments()->count();

        // Calculate profile completion
        $profile = $user->profile;
        $profileCompletion = 0;
        if ($profile) {
            $requiredFields = [
                'full_name',
                'professional_summary',
                'work_experience',
                'education',
                'skills',
            ];
            $completedFields = 0;
            foreach ($requiredFields as $field) {
                if (!empty($profile->$field)) {
                    $completedFields++;
                }
            }
            $profileCompletion = ($completedFields / count($requiredFields)) * 100;
        }

        // Get job descriptions count
        $jobDescriptionsCount = $user->jobDescriptions()->count();

        // Get recent documents
        $recentDocumentsList = $user->generatedDocuments()
            ->with('jobDescription')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($doc) {
                return [
                    'id' => $doc->id,
                    'job_title' => $doc->jobDescription->job_title,
                    'created_at' => $doc->created_at,
                ];
            });

        return Inertia::render('dashboard', [
            'user' => [
                'name' => $user->name,
                'subscription' => $subscription,
            ],
            'stats' => [
                'generationsThisMonth' => $generationsThisMonth,
                'maxGenerations' => $maxGenerations,
                'recentDocuments' => $recentDocuments,
                'profileCompletion' => $profileCompletion,
                'jobDescriptionsCount' => $jobDescriptionsCount,
                'weeklyStats' => $weeklyStats,
            ],
            'recentDocuments' => $recentDocumentsList,
        ]);
    }
}

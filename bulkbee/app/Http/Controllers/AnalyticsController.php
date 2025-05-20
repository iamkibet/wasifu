<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index(Request $request)
    {
        $period = $request->input('period', '30d');
        $type = $request->input('type', 'all');

        $query = Campaign::where('user_id', Auth::id());

        if ($type !== 'all') {
            $query->where('type', $type);
        }

        $campaigns = $query->withCount(['messages as total_messages', 'messages as delivered_messages' => function ($query) {
            $query->where('status', 'delivered');
        }])->latest()->paginate(10);

        $stats = [
            'total_campaigns' => Campaign::where('user_id', Auth::id())->count(),
            'total_messages' => Message::whereHas('campaign', function ($query) {
                $query->where('user_id', Auth::id());
            })->count(),
            'delivered_messages' => Message::whereHas('campaign', function ($query) {
                $query->where('user_id', Auth::id());
            })->where('status', 'delivered')->count(),
            'failed_messages' => Message::whereHas('campaign', function ($query) {
                $query->where('user_id', Auth::id());
            })->where('status', 'failed')->count(),
        ];

        return Inertia::render('analytics/index', [
            'campaigns' => $campaigns,
            'stats' => $stats,
            'filters' => [
                'period' => $period,
                'type' => $type,
            ],
        ]);
    }
}

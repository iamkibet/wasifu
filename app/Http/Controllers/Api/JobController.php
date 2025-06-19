<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ScrapedJob;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index(Request $request)
    {
        $query = ScrapedJob::query();

        // Filter by source if provided
        if ($request->has('source')) {
            $query->where('source', $request->source);
        }

        // Search in title and company if search term provided
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('company', 'like', "%{$search}%");
            });
        }

        // Order by most recent first
        $query->latest();

        // Paginate results
        $jobs = $query->paginate(20);

        return response()->json($jobs);
    }
}

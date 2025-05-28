<?php

namespace App\Http\Controllers;

use App\Models\JobDescription;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class JobDescriptionController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $jobDescriptions = $request->user()->jobDescriptions()->latest()->get();
        return Inertia::render('JobDescription/Index', [
            'jobDescriptions' => $jobDescriptions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('JobDescription/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $jobDescription = $request->user()->jobDescriptions()->create($validated);

        return redirect()->route('job-descriptions.index')
            ->with('success', 'Job description saved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(JobDescription $jobDescription)
    {
        $this->authorize('view', $jobDescription);
        return Inertia::render('JobDescription/Show', [
            'jobDescription' => $jobDescription,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobDescription $jobDescription)
    {
        $this->authorize('update', $jobDescription);
        return Inertia::render('JobDescription/Edit', [
            'jobDescription' => $jobDescription,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JobDescription $jobDescription)
    {
        $this->authorize('update', $jobDescription);

        $validated = $request->validate([
            'job_title' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $jobDescription->update($validated);

        return redirect()->route('job-descriptions.index')
            ->with('success', 'Job description updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobDescription $jobDescription)
    {
        $this->authorize('delete', $jobDescription);
        $jobDescription->delete();

        return redirect()->route('job-descriptions.index')
            ->with('success', 'Job description deleted successfully.');
    }
}

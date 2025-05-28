<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'professional_summary' => 'required|string',
            'work_experience' => 'required|array',
            'work_experience.*.company' => 'required|string|max:255',
            'work_experience.*.position' => 'required|string|max:255',
            'work_experience.*.start_date' => 'required|date',
            'work_experience.*.end_date' => 'required|date',
            'work_experience.*.description' => 'required|string',
            'education' => 'required|array',
            'education.*.institution' => 'required|string|max:255',
            'education.*.degree' => 'required|string|max:255',
            'education.*.field' => 'required|string|max:255',
            'education.*.graduation_date' => 'required|date',
            'skills' => 'required|array',
            'skills.*' => 'string|max:255',
            'certifications' => 'nullable|array',
            'certifications.*' => 'string|max:255',
        ]);

        $profile = new Profile();
        $profile->fill($validated);
        $profile->user_id = $request->user()->id;
        $profile->save();

        return redirect()->route('profile.add')->with('success', 'Profile created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request)
    {
        $profile = $request->user()->profile ?? new Profile();

        // Calculate profile completion
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

        return Inertia::render('Profile/Add', [
            'profile' => $profile,
            'profileCompletion' => $profileCompletion,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'professional_summary' => 'required|string',
            'work_experience' => 'required|array',
            'work_experience.*.company' => 'required|string|max:255',
            'work_experience.*.position' => 'required|string|max:255',
            'work_experience.*.start_date' => 'required|date',
            'work_experience.*.end_date' => 'required|date',
            'work_experience.*.description' => 'required|string',
            'education' => 'required|array',
            'education.*.institution' => 'required|string|max:255',
            'education.*.degree' => 'required|string|max:255',
            'education.*.field' => 'required|string|max:255',
            'education.*.graduation_date' => 'required|date',
            'skills' => 'required|array',
            'skills.*' => 'string|max:255',
            'certifications' => 'nullable|array',
            'certifications.*' => 'string|max:255',
        ]);

        $profile = $request->user()->profile ?? new Profile();
        $profile->fill($validated);
        $profile->user_id = $request->user()->id;
        $profile->save();

        return redirect()->route('profile.edit')->with('success', 'Profile updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $profile = Profile::where('user_id', Auth::id())->first();
        return Inertia::render('Profile/Index', [
            'profile' => $profile
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Profile/Create');
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

        return redirect()->route('profile.show', $profile)->with('success', 'Profile created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Profile $profile)
    {
        return Inertia::render('Profile/Show', [
            'profile' => $profile->load('user')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Profile $profile)
    {
        Gate::authorize('update', $profile);

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

        return Inertia::render('Profile/Edit', [
            'profile' => $profile,
            'profileCompletion' => $profileCompletion,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Profile $profile)
    {
        Gate::authorize('update', $profile);

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

        $profile->update($validated);

        return redirect()->route('profile.index')
            ->with('flash', ['success' => 'Profile updated successfully.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Profile $profile)
    {
        Gate::authorize('delete', $profile);

        $profile->delete();

        return redirect()->route('profile.index')->with('success', 'Profile deleted successfully.');
    }

    /**
     * Update a specific section of the profile.
     */
    public function updateSection(Request $request, Profile $profile, string $section)
    {
        Gate::authorize('update', $profile);

        $rules = [];
        switch ($section) {
            case 'summary':
                $rules = ['professional_summary' => 'required|string'];
                break;
            case 'work':
                $rules = [
                    'company' => 'required|string|max:255',
                    'position' => 'required|string|max:255',
                    'start_date' => 'required|date',
                    'end_date' => 'required|date',
                    'description' => 'required|string'
                ];
                break;
            case 'education':
                $rules = [
                    'institution' => 'required|string|max:255',
                    'degree' => 'required|string|max:255',
                    'field' => 'required|string|max:255',
                    'graduation_date' => 'required|date'
                ];
                break;
            case 'skills':
                $rules = ['skills' => 'required|array|min:1'];
                break;
            case 'certifications':
                $rules = ['certifications' => 'required|array|min:1'];
                break;
            default:
                return back()->with('error', 'Invalid section');
        }

        $validated = $request->validate($rules);

        // Update only the specific section
        switch ($section) {
            case 'summary':
                $profile->professional_summary = $validated['professional_summary'];
                break;
            case 'work':
                $workExperience = $profile->work_experience ?? [];
                $workExperience[] = [
                    'company' => $validated['company'],
                    'position' => $validated['position'],
                    'start_date' => $validated['start_date'],
                    'end_date' => $validated['end_date'],
                    'description' => $validated['description']
                ];
                $profile->work_experience = $workExperience;
                break;
            case 'education':
                $education = $profile->education ?? [];
                $education[] = [
                    'institution' => $validated['institution'],
                    'degree' => $validated['degree'],
                    'field' => $validated['field'],
                    'graduation_date' => $validated['graduation_date']
                ];
                $profile->education = $education;
                break;
            case 'skills':
                $skills = $profile->skills ?? [];
                $skills = array_merge($skills, $validated['skills']);
                $profile->skills = array_values(array_unique($skills));
                break;
            case 'certifications':
                $certifications = $profile->certifications ?? [];
                $certifications = array_merge($certifications, $validated['certifications']);
                $profile->certifications = array_values(array_unique($certifications));
                break;
        }

        $profile->save();

        return back()->with('profile', $profile);
    }

    /**
     * Update a specific item in a section.
     */
    public function updateItem(Request $request, Profile $profile, string $section, int $index)
    {
        Gate::authorize('update', $profile);

        $validated = $request->validate([
            'company' => 'required_if:section,work|string|max:255',
            'position' => 'required_if:section,work|string|max:255',
            'start_date' => 'required_if:section,work|date',
            'end_date' => 'required_if:section,work|date',
            'description' => 'required_if:section,work|string',
            'institution' => 'required_if:section,education|string|max:255',
            'degree' => 'required_if:section,education|string|max:255',
            'field' => 'required_if:section,education|string|max:255',
            'graduation_date' => 'required_if:section,education|date',
            'skills' => 'required_if:section,skills|array',
            'certifications' => 'required_if:section,certifications|array',
        ]);

        switch ($section) {
            case 'work':
                $workExperience = $profile->work_experience ?? [];
                if (!isset($workExperience[$index])) {
                    return back()->with('error', 'Work experience not found');
                }
                $workExperience[$index] = [
                    'company' => $validated['company'],
                    'position' => $validated['position'],
                    'start_date' => $validated['start_date'],
                    'end_date' => $validated['end_date'],
                    'description' => $validated['description'],
                ];
                $profile->work_experience = $workExperience;
                break;
            case 'education':
                $education = $profile->education ?? [];
                if (!isset($education[$index])) {
                    return back()->with('error', 'Education not found');
                }
                $education[$index] = [
                    'institution' => $validated['institution'],
                    'degree' => $validated['degree'],
                    'field' => $validated['field'],
                    'graduation_date' => $validated['graduation_date'],
                ];
                $profile->education = $education;
                break;
            case 'skills':
                $skills = $profile->skills ?? [];
                if (!isset($skills[$index])) {
                    return back()->with('error', 'Skill not found');
                }
                $skills[$index] = $validated['skills'][0];
                $profile->skills = $skills;
                break;
            case 'certifications':
                $certifications = $profile->certifications ?? [];
                if (!isset($certifications[$index])) {
                    return back()->with('error', 'Certification not found');
                }
                $certifications[$index] = $validated['certifications'][0];
                $profile->certifications = $certifications;
                break;
            default:
                return back()->with('error', 'Invalid section');
        }

        $profile->save();

        return back()->with('profile', $profile);
    }

    /**
     * Delete a specific item from a section.
     */
    public function deleteItem(Request $request, Profile $profile, string $section, int $index)
    {
        Gate::authorize('update', $profile);

        switch ($section) {
            case 'work':
                $workExperience = $profile->work_experience ?? [];
                if (!isset($workExperience[$index])) {
                    return back()->with('error', 'Work experience not found');
                }
                array_splice($workExperience, $index, 1);
                $profile->work_experience = $workExperience;
                break;
            case 'education':
                $education = $profile->education ?? [];
                if (!isset($education[$index])) {
                    return back()->with('error', 'Education not found');
                }
                array_splice($education, $index, 1);
                $profile->education = $education;
                break;
            case 'skills':
                $skills = $profile->skills ?? [];
                if (!isset($skills[$index])) {
                    return back()->with('error', 'Skill not found');
                }
                array_splice($skills, $index, 1);
                $profile->skills = $skills;
                break;
            case 'certifications':
                $certifications = $profile->certifications ?? [];
                if (!isset($certifications[$index])) {
                    return back()->with('error', 'Certification not found');
                }
                array_splice($certifications, $index, 1);
                $profile->certifications = $certifications;
                break;
            default:
                return back()->with('error', 'Invalid section');
        }

        $profile->save();

        return back()->with('profile', $profile);
    }
}

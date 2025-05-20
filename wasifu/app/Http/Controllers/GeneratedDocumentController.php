<?php

namespace App\Http\Controllers;

use App\Models\GeneratedDocument;
use App\Models\JobDescription;
use Illuminate\Http\Request;
use Inertia\Inertia;
use OpenAI\Laravel\Facades\OpenAI;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class GeneratedDocumentController extends Controller
{
    use AuthorizesRequests;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $documents = $request->user()->generatedDocuments()
            ->with('jobDescription')
            ->latest()
            ->get();

        return Inertia::render('Documents/Index', [
            'documents' => $documents,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $jobDescriptions = $request->user()->jobDescriptions()
            ->select('id', 'job_title', 'company')
            ->get();

        return Inertia::render('Generate/Create', [
            'jobDescriptions' => $jobDescriptions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'job_description_id' => 'required|exists:job_descriptions,id',
        ]);

        $jobDescription = JobDescription::findOrFail($validated['job_description_id']);
        $this->authorize('view', $jobDescription);

        $profile = $request->user()->profile;
        if (!$profile) {
            return redirect()->route('profile.edit')
                ->with('error', 'Please complete your profile before generating documents.');
        }

        // Generate resume using OpenAI
        $resumePrompt = $this->buildResumePrompt($profile, $jobDescription);
        $resumeResponse = OpenAI::chat()->create([
            'model' => 'gpt-4',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a professional resume writer.'],
                ['role' => 'user', 'content' => $resumePrompt],
            ],
        ]);

        // Generate cover letter using OpenAI
        $coverLetterPrompt = $this->buildCoverLetterPrompt($profile, $jobDescription);
        $coverLetterResponse = OpenAI::chat()->create([
            'model' => 'gpt-4',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a professional cover letter writer.'],
                ['role' => 'user', 'content' => $coverLetterPrompt],
            ],
        ]);

        $document = $request->user()->generatedDocuments()->create([
            'job_description_id' => $jobDescription->id,
            'resume_html' => $resumeResponse->choices[0]->message->content,
            'cover_letter_html' => $coverLetterResponse->choices[0]->message->content,
        ]);

        return redirect()->route('documents.show', $document)
            ->with('success', 'Documents generated successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(GeneratedDocument $document)
    {
        $this->authorize('view', $document);

        return Inertia::render('Documents/Show', [
            'document' => $document->load('jobDescription'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function downloadResume(GeneratedDocument $document)
    {
        $this->authorize('view', $document);

        if ($document->user->onFreePlan()) {
            return redirect()->route('plans')
                ->with('error', 'Please upgrade to Pro to download PDFs.');
        }

        $pdf = PDF::loadView('documents.resume', [
            'document' => $document,
            'profile' => $document->user->profile,
        ]);

        return $pdf->download('resume.pdf');
    }

    public function downloadCoverLetter(GeneratedDocument $document)
    {
        $this->authorize('view', $document);

        if ($document->user->onFreePlan()) {
            return redirect()->route('plans')
                ->with('error', 'Please upgrade to Pro to download PDFs.');
        }

        $pdf = PDF::loadView('documents.cover-letter', [
            'document' => $document,
            'profile' => $document->user->profile,
        ]);

        return $pdf->download('cover-letter.pdf');
    }

    private function buildResumePrompt($profile, $jobDescription): string
    {
        return "Create a professional resume for a {$jobDescription->job_title} position at {$jobDescription->company}. " .
            "Use the following information:\n\n" .
            "Name: {$profile->full_name}\n" .
            "Professional Summary: {$profile->professional_summary}\n" .
            "Work Experience: " . json_encode($profile->work_experience) . "\n" .
            "Education: " . json_encode($profile->education) . "\n" .
            "Skills: " . implode(', ', $profile->skills) . "\n" .
            "Certifications: " . implode(', ', $profile->certifications) . "\n\n" .
            "Job Description: {$jobDescription->description}\n\n" .
            "Format the resume in HTML with appropriate styling. Focus on highlighting relevant experience and skills for this specific position.";
    }

    private function buildCoverLetterPrompt($profile, $jobDescription): string
    {
        return "Create a professional cover letter for a {$jobDescription->job_title} position at {$jobDescription->company}. " .
            "Use the following information:\n\n" .
            "Name: {$profile->full_name}\n" .
            "Professional Summary: {$profile->professional_summary}\n" .
            "Work Experience: " . json_encode($profile->work_experience) . "\n" .
            "Education: " . json_encode($profile->education) . "\n" .
            "Skills: " . implode(', ', $profile->skills) . "\n" .
            "Certifications: " . implode(', ', $profile->certifications) . "\n\n" .
            "Job Description: {$jobDescription->description}\n\n" .
            "Format the cover letter in HTML with appropriate styling. Make it compelling and tailored to this specific position.";
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\GeneratedDocument;
use App\Models\JobDescription;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Log;

class GeneratedDocumentController extends Controller
{
    use AuthorizesRequests;

    protected $geminiService;

    public function __construct(GeminiService $geminiService)
    {
        $this->geminiService = $geminiService;
    }

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
            'auth' => [
                'user' => [
                    'onFreePlan' => $request->user()->onFreePlan(),
                ],
            ],
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
        Log::info('Starting document generation request', [
            'user_id' => $request->user()->id,
            'job_description_id' => $request->input('job_description_id'),
            'request_data' => $request->all()
        ]);

        try {
            $validated = $request->validate([
                'job_description_id' => 'required|exists:job_descriptions,id',
            ]);

            $jobDescription = JobDescription::findOrFail($validated['job_description_id']);
            Log::info('Found job description', ['job_description' => $jobDescription->toArray()]);

            $this->authorize('view', $jobDescription);

            $profile = $request->user()->profile;
            if (!$profile) {
                Log::warning('User attempted to generate documents without a profile', [
                    'user_id' => $request->user()->id
                ]);
                return redirect()->route('profile.edit')
                    ->with('error', 'Please complete your profile before generating documents.');
            }

            Log::info('Found user profile', ['profile' => $profile->toArray()]);

            // Create a placeholder document first
            $document = $request->user()->generatedDocuments()->create([
                'job_description_id' => $jobDescription->id,
                'resume_html' => '<div>Generating resume...</div>',
                'cover_letter_html' => '<div>Generating cover letter...</div>',
            ]);

            Log::info('Created placeholder document', ['document_id' => $document->id]);

            // Generate resume using Gemini
            Log::info('Starting resume generation...', ['document_id' => $document->id]);
            $resumePrompt = $this->buildResumePrompt($profile, $jobDescription);
            Log::info('Built resume prompt', ['prompt_length' => strlen($resumePrompt)]);

            $resumeHtml = $this->geminiService->generateContent($resumePrompt);
            Log::info('Resume generation completed', [
                'document_id' => $document->id,
                'response_length' => strlen($resumeHtml)
            ]);

            // Update resume in document
            $document->update(['resume_html' => $resumeHtml]);
            Log::info('Updated document with resume', ['document_id' => $document->id]);

            // Generate cover letter using Gemini
            Log::info('Starting cover letter generation...', ['document_id' => $document->id]);
            $coverLetterPrompt = $this->buildCoverLetterPrompt($profile, $jobDescription);
            Log::info('Built cover letter prompt', ['prompt_length' => strlen($coverLetterPrompt)]);

            $coverLetterHtml = $this->geminiService->generateContent($coverLetterPrompt);
            Log::info('Cover letter generation completed', [
                'document_id' => $document->id,
                'response_length' => strlen($coverLetterHtml)
            ]);

            // Update the document with generated content
            $document->update([
                'cover_letter_html' => $coverLetterHtml,
            ]);
            Log::info('Updated document with cover letter', ['document_id' => $document->id]);

            return redirect()->route('documents.show', $document)
                ->with('success', 'Documents generated successfully!');
        } catch (\Exception $e) {
            Log::error('Document generation failed: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'user_id' => $request->user()->id,
                'job_description_id' => $request->input('job_description_id'),
                'exception_class' => get_class($e)
            ]);

            // If we created a document, delete it
            if (isset($document)) {
                $document->delete();
                Log::info('Deleted failed document', ['document_id' => $document->id]);
            }

            return back()->with('error', 'Failed to generate documents: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(GeneratedDocument $document)
    {
        $this->authorize('view', $document);

        return Inertia::render('Documents/Show', [
            'document' => $document->load('jobDescription'),
            'auth' => [
                'user' => [
                    'onFreePlan' => request()->user()->onFreePlan(),
                ],
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GeneratedDocument $document)
    {
        $this->authorize('view', $document);

        return Inertia::render('Documents/Edit', [
            'document' => $document->load('jobDescription'),
            'auth' => [
                'user' => [
                    'onFreePlan' => request()->user()->onFreePlan(),
                ],
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GeneratedDocument $document)
    {
        $this->authorize('view', $document);

        $validated = $request->validate([
            'resume_html' => 'required|string',
            'cover_letter_html' => 'required|string',
        ]);

        $document->update($validated);

        return redirect()->route('documents.show', $document)
            ->with('success', 'Document updated successfully!');
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
            'jobDescription' => $document->jobDescription,
        ]);

        return $pdf->download("resume-{$document->jobDescription->job_title}.pdf");
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
            'jobDescription' => $document->jobDescription,
        ]);

        return $pdf->download("cover-letter-{$document->jobDescription->job_title}.pdf");
    }

    private function buildResumePrompt($profile, $jobDescription): string
    {
        return "You are a professional resume writer. Create a modern, professional resume for a {$jobDescription->job_title} position at {$jobDescription->company}. " .
            "Use the following information:\n\n" .
            "Name: {$profile->full_name}\n" .
            "Professional Summary: {$profile->professional_summary}\n" .
            "Work Experience: " . json_encode($profile->work_experience) . "\n" .
            "Education: " . json_encode($profile->education) . "\n" .
            "Skills: " . implode(', ', $profile->skills) . "\n" .
            "Certifications: " . implode(', ', $profile->certifications) . "\n\n" .
            "Job Description: {$jobDescription->description}\n\n" .
            "Format the resume in HTML with modern styling. Use this structure:\n" .
            "1. Header with name, contact info, and professional summary\n" .
            "2. Work experience section with company, title, dates, and bullet points\n" .
            "3. Education section with institution, degree, and dates\n" .
            "4. Skills section with relevant skills for this position\n" .
            "5. Certifications section if applicable\n\n" .
            "Use modern CSS styling with:\n" .
            "- Clean typography with proper spacing\n" .
            "- Subtle colors for section headers\n" .
            "- Professional font stack\n" .
            "- Responsive layout\n" .
            "- Proper margins and padding\n" .
            "- Bullet points for experience\n" .
            "- Clear visual hierarchy\n\n" .
            "Focus on highlighting relevant experience and skills for this specific position. " .
            "Use semantic HTML5 tags and modern CSS styling.";
    }

    private function buildCoverLetterPrompt($profile, $jobDescription): string
    {
        return "You are a professional cover letter writer. Create a compelling cover letter for a {$jobDescription->job_title} position at {$jobDescription->company}. " .
            "Use the following information:\n\n" .
            "Name: {$profile->full_name}\n" .
            "Professional Summary: {$profile->professional_summary}\n" .
            "Work Experience: " . json_encode($profile->work_experience) . "\n" .
            "Education: " . json_encode($profile->education) . "\n" .
            "Skills: " . implode(', ', $profile->skills) . "\n" .
            "Certifications: " . implode(', ', $profile->certifications) . "\n\n" .
            "Job Description: {$jobDescription->description}\n\n" .
            "Format the cover letter in HTML with professional styling. Use this structure:\n" .
            "1. Header with your contact information\n" .
            "2. Date and recipient's information\n" .
            "3. Professional greeting\n" .
            "4. Opening paragraph that captures attention\n" .
            "5. Body paragraphs highlighting relevant experience and skills\n" .
            "6. Closing paragraph with call to action\n" .
            "7. Professional sign-off\n\n" .
            "Use modern CSS styling with:\n" .
            "- Professional letter formatting\n" .
            "- Clean typography with proper spacing\n" .
            "- Professional font stack\n" .
            "- Proper margins and padding\n" .
            "- Clear visual hierarchy\n" .
            "- Subtle colors for emphasis\n\n" .
            "Make it compelling and tailored to this specific position. " .
            "Use semantic HTML5 tags and modern CSS styling.";
    }
}

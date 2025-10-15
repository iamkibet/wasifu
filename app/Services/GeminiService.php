<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiService
{
    protected $apiKey;
    protected $modelName;
    protected $baseUrl;

    public function __construct()
    {
        $this->apiKey = env('GEMINI_API_KEY');
        $this->modelName = 'gemini-1.5-flash';
        $this->baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
    }

    public function generateContent(string $prompt, array $config = [])
    {
        // If no API key is configured, use mock content for development
        if (empty($this->apiKey)) {
            Log::info('Gemini API key not configured, using mock content for development');
            return $this->generateMockContent($prompt);
        }

        try {
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
            ])->post("{$this->baseUrl}/{$this->modelName}:generateContent?key={$this->apiKey}", [
                'contents' => [
                    [
                        'role' => 'user',
                        'parts' => [
                            ['text' => $prompt]
                        ]
                    ]
                ],
                'generationConfig' => array_merge([
                    'temperature' => 0.7,
                    'maxOutputTokens' => 2048,
                ], $config)
            ]);

            if (!$response->successful()) {
                Log::error('Gemini API call failed', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                    'prompt' => $prompt
                ]);
                throw new \Exception("Gemini API call failed: " . $response->body());
            }

            $data = $response->json();

            if (empty($data['candidates'])) {
                Log::warning("Gemini API: No content candidates returned for prompt: " . $prompt);
                throw new \Exception("Gemini API did not return content.");
            }

            return $data['candidates'][0]['content']['parts'][0]['text'];
        } catch (\Exception $e) {
            Log::error('Gemini API call failed: ' . $e->getMessage(), [
                'prompt' => $prompt,
                'trace' => $e->getTraceAsString()
            ]);
            
            // Fallback to mock content if API fails
            Log::info('Falling back to mock content due to API failure');
            return $this->generateMockContent($prompt);
        }
    }

    private function generateMockContent(string $prompt): string
    {
        // Determine if this is a resume or cover letter prompt
        if (strpos($prompt, 'resume') !== false || strpos($prompt, 'Resume') !== false) {
            return $this->generateMockResume();
        } else {
            return $this->generateMockCoverLetter();
        }
    }

    private function generateMockResume(): string
    {
        return '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Professional Resume</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
                .header { text-align: center; border-bottom: 2px solid #f97316; padding-bottom: 20px; margin-bottom: 30px; }
                .name { font-size: 28px; font-weight: bold; color: #f97316; margin-bottom: 10px; }
                .contact { font-size: 14px; color: #666; }
                .section { margin-bottom: 25px; }
                .section-title { font-size: 18px; font-weight: bold; color: #f97316; border-bottom: 1px solid #e5e5e5; padding-bottom: 5px; margin-bottom: 15px; }
                .job-title { font-weight: bold; color: #333; }
                .company { color: #666; }
                .date { color: #999; font-size: 14px; }
                .description { margin-top: 5px; }
                .skills { display: flex; flex-wrap: wrap; gap: 10px; }
                .skill { background: #f97316; color: white; padding: 5px 10px; border-radius: 15px; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="name">Dennis Kibet</div>
                <div class="contact">
                    Email: dennis@example.com | Phone: +1 (555) 123-4567<br>
                    Location: Nairobi, Kenya
                </div>
            </div>

            <div class="section">
                <div class="section-title">Professional Summary</div>
                <p>Experienced software developer with a passion for creating innovative solutions. Skilled in modern web technologies and committed to delivering high-quality applications that meet business objectives.</p>
            </div>

            <div class="section">
                <div class="section-title">Work Experience</div>
                <div class="job-title">Senior Frontend Developer</div>
                <div class="company">Tech Solutions Inc. | <span class="date">2022 - Present</span></div>
                <div class="description">
                    • Led development of responsive web applications using React and TypeScript<br>
                    • Collaborated with cross-functional teams to deliver high-quality software solutions<br>
                    • Mentored junior developers and conducted code reviews<br>
                    • Implemented modern development practices and CI/CD pipelines
                </div>

                <div style="margin-top: 20px;">
                    <div class="job-title">Frontend Developer</div>
                    <div class="company">Digital Agency Ltd. | <span class="date">2020 - 2022</span></div>
                    <div class="description">
                        • Developed user interfaces for various client projects<br>
                        • Worked with JavaScript, HTML5, CSS3, and modern frameworks<br>
                        • Optimized application performance and user experience<br>
                        • Participated in agile development processes
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Education</div>
                <div class="job-title">Bachelor of Science in Computer Science</div>
                <div class="company">University of Nairobi | <span class="date">2016 - 2020</span></div>
                <div class="description">Graduated with honors, focusing on software engineering and web development.</div>
            </div>

            <div class="section">
                <div class="section-title">Skills</div>
                <div class="skills">
                    <span class="skill">JavaScript</span>
                    <span class="skill">React</span>
                    <span class="skill">TypeScript</span>
                    <span class="skill">Node.js</span>
                    <span class="skill">HTML5</span>
                    <span class="skill">CSS3</span>
                    <span class="skill">Git</span>
                    <span class="skill">Agile</span>
                </div>
            </div>
        </body>
        </html>';
    }

    private function generateMockCoverLetter(): string
    {
        return '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Cover Letter</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
                .date { text-align: right; margin-bottom: 30px; color: #666; }
                .recipient { margin-bottom: 30px; }
                .salutation { margin-bottom: 20px; }
                .paragraph { margin-bottom: 20px; text-align: justify; }
                .closing { margin-top: 30px; }
                .signature { margin-top: 50px; }
            </style>
        </head>
        <body>
            <div class="date">' . date('F j, Y') . '</div>

            <div class="recipient">
                <strong>Hiring Manager</strong><br>
                Acme.sh<br>
                [Company Address]<br>
                [City, State ZIP Code]
            </div>

            <div class="salutation">Dear Hiring Manager,</div>

            <div class="paragraph">
                I am writing to express my strong interest in the Web Frontend Engineer position at Acme.sh. With my extensive experience in modern web development technologies and passion for creating exceptional user experiences, I am confident that I would be a valuable addition to your team.
            </div>

            <div class="paragraph">
                Throughout my career, I have developed expertise in JavaScript, React, TypeScript, and other cutting-edge frontend technologies. My experience includes leading development teams, implementing responsive web applications, and optimizing performance for better user engagement. I have a proven track record of delivering high-quality software solutions that meet business objectives and exceed user expectations.
            </div>

            <div class="paragraph">
                What excites me most about this opportunity at Acme.sh is the chance to work with innovative technologies and contribute to projects that make a real impact. I am particularly drawn to your company\'s commitment to excellence and innovation in web development. I am eager to bring my technical skills, collaborative mindset, and problem-solving abilities to help drive your frontend development initiatives forward.
            </div>

            <div class="paragraph">
                I would welcome the opportunity to discuss how my background and enthusiasm can contribute to your team\'s success. Thank you for considering my application. I look forward to hearing from you soon.
            </div>

            <div class="closing">
                Sincerely,<br>
                Dennis Kibet
            </div>

            <div class="signature">
                <strong>Dennis Kibet</strong><br>
                Email: dennis@example.com<br>
                Phone: +1 (555) 123-4567
            </div>
        </body>
        </html>';
    }
}

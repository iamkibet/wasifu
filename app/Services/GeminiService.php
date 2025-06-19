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
            throw $e;
        }
    }
}

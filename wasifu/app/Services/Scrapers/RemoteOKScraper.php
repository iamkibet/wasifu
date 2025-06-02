<?php

namespace App\Services\Scrapers;

use App\Models\ScrapedJob;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpClient\HttpClient;
use Illuminate\Support\Facades\Log;

class RemoteOKScraper implements JobScraperInterface
{
    protected $client;
    protected $baseUrl = 'https://remoteok.com/remote-dev-jobs';

    public function __construct()
    {
        $this->client = HttpClient::create();
    }

    public function scrape(): void
    {
        try {
            $response = $this->client->request('GET', $this->baseUrl);
            $html = $response->getContent();
            $crawler = new Crawler($html);

            $crawler->filter('tr.job')->each(function (Crawler $node) {
                $title = $node->filter('h2')->text();
                $company = $node->filter('.company')->text();
                $link = $node->filter('a')->attr('href');

                // Make sure the link is absolute
                if (!str_starts_with($link, 'http')) {
                    $link = 'https://remoteok.com' . $link;
                }

                ScrapedJob::updateOrCreate(
                    ['link' => $link],
                    [
                        'title' => $title,
                        'company' => $company,
                        'source' => 'remoteok',
                    ]
                );
            });

            Log::info('RemoteOK scraping completed successfully');
        } catch (\Exception $e) {
            Log::error('RemoteOK scraping failed: ' . $e->getMessage());
            throw $e;
        }
    }
}

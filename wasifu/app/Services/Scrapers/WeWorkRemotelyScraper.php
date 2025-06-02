<?php

namespace App\Services\Scrapers;

use App\Models\ScrapedJob;
use Symfony\Component\DomCrawler\Crawler;
use Symfony\Component\HttpClient\HttpClient;
use Illuminate\Support\Facades\Log;

class WeWorkRemotelyScraper implements JobScraperInterface
{
    protected $client;
    protected $baseUrl = 'https://weworkremotely.com/categories/remote-programming-jobs';

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

            $crawler->filter('.jobs article')->each(function (Crawler $node) {
                $title = $node->filter('h2')->text();
                $company = $node->filter('.company')->text();
                $link = $node->filter('a')->attr('href');

                // Make sure the link is absolute
                if (!str_starts_with($link, 'http')) {
                    $link = 'https://weworkremotely.com' . $link;
                }

                ScrapedJob::updateOrCreate(
                    ['link' => $link],
                    [
                        'title' => $title,
                        'company' => $company,
                        'source' => 'weworkremotely',
                    ]
                );
            });

            Log::info('WeWorkRemotely scraping completed successfully');
        } catch (\Exception $e) {
            Log::error('WeWorkRemotely scraping failed: ' . $e->getMessage());
            throw $e;
        }
    }
}

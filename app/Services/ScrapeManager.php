<?php

namespace App\Services;

use App\Services\Scrapers\RemoteOKScraper;
use App\Services\Scrapers\WeWorkRemotelyScraper;
use Illuminate\Support\Facades\Log;

class ScrapeManager
{
    protected $scrapers;

    public function __construct()
    {
        $this->scrapers = [
            new RemoteOKScraper(),
            new WeWorkRemotelyScraper(),
        ];
    }

    public function run(): void
    {
        foreach ($this->scrapers as $scraper) {
            try {
                $scraper->scrape();
            } catch (\Exception $e) {
                Log::error('Scraper failed: ' . get_class($scraper) . ' - ' . $e->getMessage());
                // Continue with other scrapers even if one fails
                continue;
            }
        }
    }
}

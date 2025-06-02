<?php

namespace App\Console\Commands;

use App\Services\ScrapeManager;
use Illuminate\Console\Command;

class ScrapeJobs extends Command
{
    protected $signature = 'jobs:scrape';
    protected $description = 'Scrape jobs from various remote job boards';

    public function handle(ScrapeManager $scrapeManager)
    {
        $this->info('Starting job scraping...');

        try {
            $scrapeManager->run();
            $this->info('Job scraping completed successfully!');
        } catch (\Exception $e) {
            $this->error('Job scraping failed: ' . $e->getMessage());
            return 1;
        }

        return 0;
    }
}

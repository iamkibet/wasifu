<?php

namespace App\Services\Scrapers;

interface JobScraperInterface
{
    /**
     * Scrape jobs from the target website and store them in the database
     */
    public function scrape(): void;
}

<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class WorkController extends Controller
{
    public function index()
    {
        return Inertia::render('work/index');
    }

    public function portfolio()
    {
        return Inertia::render('work/portfolio');
    }

    public function caseStudies()
    {
        return Inertia::render('work/case-studies');
    }
}

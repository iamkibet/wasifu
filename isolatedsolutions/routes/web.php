<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TechnologyController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Main Pages
Route::get('/', [PageController::class, 'welcome'])->name('home');
Route::get('/about-us', [PageController::class, 'about'])->name('about-us');
Route::get('/team', [PageController::class, 'team'])->name('team');
Route::get('/careers', [PageController::class, 'careers'])->name('careers');
Route::get('/contact', [ContactController::class, 'show'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Services Routes
Route::prefix('services')->name('services.')->group(function () {
    Route::get('/', fn() => Inertia::render('Services/Index'))->name('index');
    Route::get('/web-development', fn() => Inertia::render('Services/WebDevelopment'))->name('web-development');
    Route::get('/app-development', fn() => Inertia::render('Services/AppDevelopment'))->name('app-development');
    Route::get('/ecommerce', fn() => Inertia::render('Services/Ecommerce'))->name('ecommerce');
    Route::get('/consulting', fn() => Inertia::render('Services/Consulting'))->name('consulting');
    Route::get('/software-testing', fn() => Inertia::render('Services/SoftwareTesting'))->name('software-testing');
    Route::get('/devops', fn() => Inertia::render('Services/DevOps'))->name('devops');
    Route::get('/cloud-integration', fn() => Inertia::render('Services/CloudIntegration'))->name('cloud-integration');
});

// Technologies Routes
Route::prefix('technologies')->name('technologies.')->group(function () {
    Route::get('/mobile', fn() => Inertia::render('Technologies/Mobile'))->name('mobile');
    Route::get('/cloud', fn() => Inertia::render('Technologies/Cloud'))->name('cloud');
    Route::get('/cms', fn() => Inertia::render('Technologies/CMS'))->name('cms');
    Route::get('/frontend', fn() => Inertia::render('Technologies/Frontend'))->name('frontend');
    Route::get('/backend', fn() => Inertia::render('Technologies/Backend'))->name('backend');
    Route::get('/fullstack', fn() => Inertia::render('Technologies/Fullstack'))->name('fullstack');
});

// Industries Routes
Route::prefix('industries')->name('industries.')->group(function () {
    Route::get('/ecommerce', fn() => Inertia::render('Industries/Ecommerce'))->name('ecommerce');
    Route::get('/saas', fn() => Inertia::render('Industries/Saas'))->name('saas');
    Route::get('/fintech', fn() => Inertia::render('Industries/Fintech'))->name('fintech');
    Route::get('/edtech', fn() => Inertia::render('Industries/Edtech'))->name('edtech');
    Route::get('/wellness', fn() => Inertia::render('Industries/Wellness'))->name('wellness');
    Route::get('/agritech', fn() => Inertia::render('Industries/Agritech'))->name('agritech');
    Route::get('/insurance', fn() => Inertia::render('Industries/Insurance'))->name('insurance');
    Route::get('/government', fn() => Inertia::render('Industries/Government'))->name('government');
});

// Work Routes
Route::prefix('work')->name('work.')->group(function () {
    Route::get('/', [WorkController::class, 'index'])->name('index');
    Route::get('/portfolio', [WorkController::class, 'portfolio'])->name('portfolio');
    Route::get('/case-studies', [WorkController::class, 'caseStudies'])->name('case-studies');
});

// Products Routes
Route::prefix('products')->name('products.')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('index');
    Route::get('/{product}', [ProductController::class, 'show'])->name('show');
});

// Profile Routes (if needed)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

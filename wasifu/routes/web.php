<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobDescriptionController;
use App\Http\Controllers\GeneratedDocumentController;
use App\Http\Controllers\BillingController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Homepage
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Features Page
Route::get('/features', function () {
    return Inertia::render('Features');
})->name('features');

// Pricing Page
Route::get('/plans', function () {
    return Inertia::render('Plans/Index');
})->name('plans');

// Contact Page
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Profile Management
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // Job Description Management
    Route::get('/job-descriptions', [JobDescriptionController::class, 'index'])->name('job-descriptions.index');
    Route::post('/job-descriptions', [JobDescriptionController::class, 'store'])->name('job-descriptions.store');
    Route::get('/job-descriptions/create', [JobDescriptionController::class, 'create'])->name('job-descriptions.create');
    Route::get('/job-descriptions/{jobDescription}', [JobDescriptionController::class, 'show'])->name('job-descriptions.show');
    Route::put('/job-descriptions/{jobDescription}', [JobDescriptionController::class, 'update'])->name('job-descriptions.update');
    Route::delete('/job-descriptions/{jobDescription}', [JobDescriptionController::class, 'destroy'])->name('job-descriptions.destroy');

    // Document Generation
    Route::get('/generate', [GeneratedDocumentController::class, 'create'])->name('generate.create');
    Route::post('/generate', [GeneratedDocumentController::class, 'store'])->name('generate.store');

    // Generated Documents
    Route::get('/documents', [GeneratedDocumentController::class, 'index'])->name('documents.index');
    Route::get('/documents/{document}', [GeneratedDocumentController::class, 'show'])->name('documents.show');
    Route::get('/documents/{document}/download-resume', [GeneratedDocumentController::class, 'downloadResume'])->name('documents.download.resume');
    Route::get('/documents/{document}/download-cover-letter', [GeneratedDocumentController::class, 'downloadCoverLetter'])->name('documents.download.cover_letter');

    // Billing & Subscriptions
    Route::get('/billing', [BillingController::class, 'index'])->name('billing.index');
    Route::get('/subscribe', [BillingController::class, 'subscribe'])->name('billing.subscribe');
});

/*
|--------------------------------------------------------------------------
| Additional Routes
|--------------------------------------------------------------------------
*/

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

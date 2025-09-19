<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\JobDescriptionController;
use App\Http\Controllers\GeneratedDocumentController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MpesaController;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\PayPalController;
use App\Http\Controllers\AdminController;
use App\Http\Middleware\VerifyCsrfToken;

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
    // Dashboard - redirect based on role
    Route::get('/dashboard', function (Request $request) {
        if (auth()->user()->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }
        return app(DashboardController::class)->index($request);
    })->name('dashboard');
    
    // Home redirect - redirect authenticated users to appropriate dashboard
    Route::get('/home', function () {
        if (auth()->user()->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('dashboard');
    })->name('home');

    // Profile Management
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/profile/create', [ProfileController::class, 'create'])->name('profile.create');
    Route::post('/profile', [ProfileController::class, 'store'])->name('profile.store');
    Route::get('/profile/{profile}', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/{profile}/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile/{profile}', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile/{profile}', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Profile Item Management
    Route::post('/profile/{profile}/update-section/{section}', [ProfileController::class, 'updateSection'])->name('profile.update-section');
    Route::post('/profile/{profile}/update-item/{section}/{index}', [ProfileController::class, 'updateItem'])->name('profile.update-item');
    Route::delete('/profile/{profile}/delete-item/{section}/{index}', [ProfileController::class, 'deleteItem'])->name('profile.delete-item');

    // Job Description Management
    Route::get('/job-descriptions', [JobDescriptionController::class, 'index'])->name('job-descriptions.index');
    Route::post('/job-descriptions', [JobDescriptionController::class, 'store'])->name('job-descriptions.store');
    Route::get('/job-descriptions/create', [JobDescriptionController::class, 'create'])->name('job-descriptions.create');
    Route::get('/job-descriptions/{jobDescription}', [JobDescriptionController::class, 'show'])->name('job-descriptions.show');
    Route::get('/job-descriptions/{jobDescription}/edit', [JobDescriptionController::class, 'edit'])->name('job-descriptions.edit');
    Route::put('/job-descriptions/{jobDescription}', [JobDescriptionController::class, 'update'])->name('job-descriptions.update');
    Route::delete('/job-descriptions/{jobDescription}', [JobDescriptionController::class, 'destroy'])->name('job-descriptions.destroy');

    // Document Generation
    Route::get('/generate', [GeneratedDocumentController::class, 'create'])->name('generate.create');
    Route::post('/generate', [GeneratedDocumentController::class, 'store'])->name('generate.store');

    // Generated Documents
    Route::get('/documents', [GeneratedDocumentController::class, 'index'])->name('documents.index');
    Route::get('/documents/{document}', [GeneratedDocumentController::class, 'show'])->name('documents.show');
    Route::get('/documents/{document}/edit', [GeneratedDocumentController::class, 'edit'])->name('documents.edit');
    Route::put('/documents/{document}', [GeneratedDocumentController::class, 'update'])->name('documents.update');
    Route::get('/documents/{document}/download-resume', [GeneratedDocumentController::class, 'downloadResume'])->name('documents.download.resume');
    Route::get('/documents/{document}/download-cover-letter', [GeneratedDocumentController::class, 'downloadCoverLetter'])->name('documents.download.cover_letter');

    // Billing & Subscriptions
    Route::get('/billing', [BillingController::class, 'index'])->name('billing.index');
    Route::get('/billing/subscribe', [BillingController::class, 'subscribe'])->name('billing.subscribe');
    Route::post('/billing/subscribe', [BillingController::class, 'processSubscription'])->name('billing.process');
    Route::get('/billing/portal', [BillingController::class, 'portal'])->name('billing.portal');
    Route::get('/billing/portal/redirect', [BillingController::class, 'billingPortal'])->name('billing.portal.redirect');
    Route::get('/billing/success', [BillingController::class, 'success'])->name('billing.success');
    Route::get('/billing/cancel', [BillingController::class, 'cancel'])->name('billing.cancel');

    // Payment Routes
    Route::post('/stripe/checkout', [StripeController::class, 'checkout'])->name('stripe.checkout');

    // PayPal Routes
    Route::post('/paypal/checkout', [PayPalController::class, 'checkout'])->name('paypal.checkout');
    Route::get('/paypal/success', [PayPalController::class, 'success'])->name('paypal.success');
    Route::get('/paypal/cancel', [PayPalController::class, 'cancel'])->name('paypal.cancel');
});

// M-Pesa Routes
Route::middleware(['auth'])->group(function () {
    Route::post('/mpesa/initiate', [MpesaController::class, 'initiatePayment'])->name('mpesa.initiate');
    Route::get('/mpesa/status', [MpesaController::class, 'checkStatus'])->name('mpesa.status');
});

// M-Pesa Callback URL (no auth required)
Route::post('/mpesa/callback', [MpesaController::class, 'callback'])->name('mpesa.callback');

// Webhook Routes (no auth required)
Route::post('/stripe/webhook', [BillingController::class, 'handleWebhook'])
    ->name('stripe.webhook')
    ->withoutMiddleware(['web', 'auth', VerifyCsrfToken::class]);

/*
|--------------------------------------------------------------------------
| Additional Routes
|--------------------------------------------------------------------------
*/

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

// Admin routes - protected by role middleware
Route::middleware(['auth'])->group(function () {
    Route::get('/admin-dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::post('/admin/users/{user}/role', [AdminController::class, 'updateUserRole'])->name('admin.users.role');
});

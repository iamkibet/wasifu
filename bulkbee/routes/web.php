<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Controller imports grouped by functionality
use App\Http\Controllers\{
    ProfileController,
    HomeController,
    ContactController,
    CampaignController,
    TemplateController,
    WalletController,
    AnalyticsController,
    AdminController,
    ContactGroupController
};

// Public routes
Route::get('/', [HomeController::class, 'welcome'])->name('home');

// Authentication routes (from auth.php)
require __DIR__ . '/auth.php';

// Authenticated user routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Contact management
    Route::prefix('contacts')->name('contacts.')->group(function () {
        Route::resource('/', ContactController::class)
            ->parameters(['' => 'contact'])
            ->except(['show']);

        Route::post('import', [ContactController::class, 'import'])
            ->name('import');

        Route::get('groups', [ContactController::class, 'groups'])
            ->name('groups');
    });

    // Campaign management
    Route::resource('campaigns', CampaignController::class)
        ->except(['show']);
    Route::post('campaigns/{campaign}/send', [CampaignController::class, 'send'])
        ->name('campaigns.send');

    // Template management
    Route::resource('templates', TemplateController::class)
        ->except(['show']);

    // Wallet management
    Route::prefix('wallet')->name('wallet.')->group(function () {
        Route::get('/', [WalletController::class, 'index'])->name('index');
        Route::get('history', [WalletController::class, 'history'])->name('history');
        Route::post('topup', [WalletController::class, 'topup'])->name('topup');
    });

    // Analytics
    Route::get('analytics', [AnalyticsController::class, 'index'])
        ->name('analytics.index');

    // User settings
    Route::prefix('settings')->name('settings.')->group(function () {
        Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::get('notifications', [ProfileController::class, 'notifications'])
            ->name('notifications');
        Route::patch('notifications', [ProfileController::class, 'updateNotifications'])
            ->name('notifications.update');

        Route::get('api', [ProfileController::class, 'api'])->name('api');
    });

    // Contact groups
    Route::resource('contact-groups', ContactGroupController::class)
        ->except(['show']);
});

// Admin routes
Route::middleware(['auth', 'verified', 'admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('users', [AdminController::class, 'users'])->name('users');
        Route::get('campaigns', [AdminController::class, 'campaigns'])->name('campaigns');
        Route::get('payments', [AdminController::class, 'payments'])->name('payments');
        Route::get('settings', [AdminController::class, 'settings'])->name('settings');
    });

// Additional configuration routes (from settings.php)
require __DIR__ . '/settings.php';

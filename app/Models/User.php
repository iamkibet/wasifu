<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, Billable;

    public const ROLE_USER = 'user';
    public const ROLE_PRO = 'pro';
    public const ROLE_ADMIN = 'admin';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function jobDescriptions()
    {
        return $this->hasMany(JobDescription::class);
    }

    public function generatedDocuments()
    {
        return $this->hasMany(GeneratedDocument::class);
    }

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    public function hasActiveSubscription()
    {
        return $this->subscriptions()
            ->where('stripe_status', 'active')
            ->whereNull('ends_at')
            ->exists();
    }

    public function onFreePlan()
    {
        return !$this->hasActiveSubscription();
    }

    public function subscribed($name = 'pro')
    {
        return $this->hasActiveSubscription();
    }

    public function documentCountThisMonth()
    {
        return $this->generatedDocuments()
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();
    }

    public function newSubscription($name, $stripePrice)
    {
        return new SubscriptionBuilder($this, $name, $stripePrice);
    }

    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    public function isPro(): bool
    {
        return $this->role === self::ROLE_PRO || $this->isAdmin();
    }

    public function hasProAccess(): bool
    {
        return $this->isPro() || $this->subscribed('pro');
    }

    public function promoteToPro()
    {
        $this->update(['role' => self::ROLE_PRO]);
    }

    public function demoteToUser()
    {
        $this->update(['role' => self::ROLE_USER]);
    }

    public function promoteToAdmin(): void
    {
        $this->update(['role' => self::ROLE_ADMIN]);
    }

    public function getRoleBadge(): string
    {
        return match ($this->role) {
            self::ROLE_ADMIN => 'Admin',
            self::ROLE_PRO => 'Pro',
            default => 'User',
        };
    }
}

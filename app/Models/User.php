<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\Role;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, Billable;


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
            'role' => Role::class,
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
        return $this->role === Role::ADMIN;
    }

    public function isUser(): bool
    {
        return $this->role === Role::USER;
    }

    public function hasProAccess(): bool
    {
        return $this->isAdmin() || $this->subscribed('pro');
    }

    public function promoteToAdmin(): void
    {
        $this->update(['role' => Role::ADMIN]);
    }

    public function demoteToUser(): void
    {
        $this->update(['role' => Role::USER]);
    }

    public function getRoleBadge(): string
    {
        return $this->role->label();
    }
}

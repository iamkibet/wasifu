<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profile extends Model
{
    protected $fillable = [
        'user_id',
        'full_name',
        'professional_summary',
        'work_experience',
        'education',
        'skills',
        'certifications',
    ];

    protected $casts = [
        'work_experience' => 'array',
        'education' => 'array',
        'skills' => 'array',
        'certifications' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

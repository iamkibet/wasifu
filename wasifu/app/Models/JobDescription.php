<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JobDescription extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'job_title',
        'company',
        'description',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function generatedDocuments(): HasMany
    {
        return $this->hasMany(GeneratedDocument::class);
    }
}

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Employer;
use App\Models\Tag;

class Job extends Model
{

    use HasFactory;
    protected $table = 'job_listings';

    protected $guarded = [];

    public function employer()
    {
        return $this->belongsTo(Employer::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, foreignPivotKey: 'job_listings_id');
    }
}
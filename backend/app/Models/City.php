<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
    use HasFactory;

    protected $fillable = [
        'country_id',
        'name',
        'slug',
        'description',
        'images',
    ];

    protected $casts = [
        'images' => 'array',
    ];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function tours()
    {
        return $this->hasMany(Tour::class);
    }

    public function homestays()
    {
        return $this->hasMany(Homestay::class);
    }

    public function destinations()
    {
        return $this->hasMany(Destination::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    use HasFactory;

    protected $fillable = ['country_id', 'city_id', 'name', 'slug', 'tagline', 'description', 'highlight', 'images'];

    protected $casts = [
        'images' => 'array',
    ];

    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function tours()
    {
        return $this->hasMany(Tour::class);
    }

    public function homestays()
    {
        return $this->hasMany(Homestay::class);
    }
}

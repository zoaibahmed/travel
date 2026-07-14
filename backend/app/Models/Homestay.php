<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Homestay extends Model
{
    use HasFactory;

    protected $fillable = [
        'country_id',
        'city_id',
        'destination_id',
        'name',
        'slug',
        'description',
        'price_per_night',
        'amenities',
        'images',
        'rating'
    ];

    protected $casts = [
        'amenities' => 'array',
        'images' => 'array',
        'rating' => 'float',
    ];

    public function destination()
    {
        return $this->belongsTo(Destination::class);
    }

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
        return $this->belongsToMany(Tour::class, 'tour_homestay');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{
    use HasFactory;

    protected $fillable = [
        'country_id', 'city_id', 'destination_id', 'title', 'location', 'slug', 'description', 
        'price', 'duration', 'itinerary', 'includes', 'images', 'rating',
        'nights', 'group_size', 'currency', 'overview', 'narrative', 
        'accommodation', 'transport', 'best_season', 'difficulty', 
        'hero_image', 'excludes', 'luxury_features', 'highlights', 
        'booking_button_text'
    ];

    protected $casts = [
        'itinerary' => 'array',
        'includes' => 'array',
        'images' => 'array',
        'excludes' => 'array',
        'luxury_features' => 'array',
        'highlights' => 'array',
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

    public function homestays()
    {
        return $this->belongsToMany(Homestay::class, 'tour_homestay')->withPivot('day');
    }
}

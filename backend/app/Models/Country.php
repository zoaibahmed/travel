<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'image', 'description'];

    public function destinations()
    {
        return $this->hasMany(Destination::class);
    }

    public function cities()
    {
        return $this->hasMany(City::class);
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

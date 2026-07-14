<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'destination',
        'message',
        'status',
        'quote_amount',
        'quote_currency',
        'item_type',
        'item_id',
        'travel_date',
        'travelers',
        'phone',
        'proposal_data',
    ];

    protected $casts = [
        'proposal_data' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}

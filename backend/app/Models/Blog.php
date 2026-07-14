<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'subtitle',
        'author',
        'author_role',
        'category',
        'image',
        'content'
    ];

    protected $casts = [
        'content' => 'array',
    ];
}

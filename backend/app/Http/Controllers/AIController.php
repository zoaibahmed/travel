<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tour;

class AIController extends Controller
{
    public function recommend(Request $request)
    {
        // Simple mock AI logic: Recommend based on popular tours
        $recommendations = Tour::with('destination.country')
            ->orderBy('rating', 'desc')
            ->take(3)
            ->get();
            
        return response()->json([
            'message' => 'AI Recommendations based on your profile',
            'data' => $recommendations
        ]);
    }
}

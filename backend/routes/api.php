<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TourController;
use App\Http\Controllers\HomestayController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\AIController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    // Auth Routes
    Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);
    Route::post('/register', [App\Http\Controllers\AuthController::class, 'register']);
    Route::post('/password/email', [App\Http\Controllers\AuthController::class, 'sendResetLinkEmail']);
    Route::post('/password/reset', [App\Http\Controllers\AuthController::class, 'resetPassword']);
    Route::apiResource('inquiries', App\Http\Controllers\InquiryController::class)->only(['store']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout']);
        
        // Saved Escapes
        Route::get('/saved-escapes', [App\Http\Controllers\SavedEscapeController::class, 'index']);
        Route::post('/saved-escapes', [App\Http\Controllers\SavedEscapeController::class, 'store']);
        Route::delete('/saved-escapes/{id}', [App\Http\Controllers\SavedEscapeController::class, 'destroy']);

        // Transactions
        Route::get('/transactions', [App\Http\Controllers\TransactionController::class, 'index']);

        // Inquiry Management (Protected)
        Route::get('/inquiries', [App\Http\Controllers\InquiryController::class, 'index']);
        Route::get('/inquiries/{id}', [App\Http\Controllers\InquiryController::class, 'show']);
        Route::patch('inquiries/{id}/confirm', [App\Http\Controllers\InquiryController::class, 'confirm']);
        Route::patch('inquiries/{id}/set-quote', [App\Http\Controllers\InquiryController::class, 'setQuote']);
        Route::patch('inquiries/{id}/send-proposal', [App\Http\Controllers\InquiryController::class, 'sendProposal']);
        Route::patch('inquiries/{id}/accept-proposal', [App\Http\Controllers\InquiryController::class, 'acceptProposal']);
        Route::patch('inquiries/{id}/finalize', [App\Http\Controllers\InquiryController::class, 'finalize']);
        Route::post('inquiries/{id}/pay', [App\Http\Controllers\InquiryController::class, 'pay']);

        // Messaging
        Route::get('inquiries/{id}/messages', [App\Http\Controllers\MessageController::class, 'index']);
        Route::post('inquiries/{id}/messages', [App\Http\Controllers\MessageController::class, 'store']);
    });

    // Marketplace Resources
    Route::apiResource('cities', App\Http\Controllers\CityController::class);
    Route::apiResource('tours', App\Http\Controllers\TourController::class);
    Route::apiResource('homestays', App\Http\Controllers\HomestayController::class);
    Route::apiResource('destinations', App\Http\Controllers\DestinationController::class);
    Route::apiResource('blogs', App\Http\Controllers\BlogController::class);
    
    Route::get('/countries', function() {
        return App\Models\Country::with('destinations')->get();
    });
    
    Route::get('/ai/recommend', [AIController::class, 'recommend']);
});

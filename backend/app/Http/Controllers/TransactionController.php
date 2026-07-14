<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if (!$user) return response()->json([], 401);

        $query = Transaction::with(['inquiry', 'user'])->latest();
        
        if (!$user->is_admin) {
            $query->where('user_id', $user->id);
        }

        return response()->json($query->get());
    }
}

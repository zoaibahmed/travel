<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Inquiry;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index(Request $request, $inquiryId)
    {
        $inquiry = Inquiry::findOrFail($inquiryId);
        
        // Basic authorization: user must own inquiry or be admin
        if (!$request->user()->is_admin && $inquiry->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $messages = Message::where('inquiry_id', $inquiryId)->with('sender:id,name')->orderBy('created_at', 'asc')->get();
        return response()->json($messages);
    }

    public function store(Request $request, $inquiryId)
    {
        $request->validate(['message' => 'required|string']);
        
        $inquiry = Inquiry::findOrFail($inquiryId);
        $user = $request->user();

        // Basic authorization
        if (!$user->is_admin && $inquiry->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $receiverId = $user->is_admin ? $inquiry->user_id : (\App\Models\User::where('is_admin', true)->value('id') ?? 1);

        $message = Message::create([
            'inquiry_id' => $inquiry->id,
            'sender_id' => $user->id,
            'receiver_id' => $receiverId,
            'message' => $request->message,
        ]);

        return response()->json($message->load('sender:id,name'), 201);
    }
}

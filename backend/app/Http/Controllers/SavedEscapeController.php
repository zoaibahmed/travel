<?php

namespace App\Http\Controllers;

use App\Models\SavedEscape;
use App\Models\Tour;
use App\Models\Homestay;
use Illuminate\Http\Request;

class SavedEscapeController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        if (!$user) return response()->json([], 401);

        $saved = SavedEscape::where('user_id', $user->id)->get();
        
        $results = [];
        foreach ($saved as $item) {
            $data = null;
            if ($item->item_type === 'tour') {
                $data = Tour::find($item->item_id);
            } else if ($item->item_type === 'homestay') {
                $data = Homestay::find($item->item_id);
            }
            
            if ($data) {
                $results[] = [
                    'id' => $item->id,
                    'item_type' => $item->item_type,
                    'item_id' => $item->item_id,
                    'data' => $data
                ];
            }
        }

        return response()->json($results);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        if (!$user) return response()->json(['message' => 'Unauthorized'], 401);

        $request->validate([
            'item_type' => 'required|string|in:tour,homestay',
            'item_id' => 'required|integer',
        ]);

        // Check if already saved
        $exists = SavedEscape::where('user_id', $user->id)
            ->where('item_type', $request->item_type)
            ->where('item_id', $request->item_id)
            ->first();

        if ($exists) {
            return response()->json(['message' => 'Item already saved', 'id' => $exists->id]);
        }

        $saved = SavedEscape::create([
            'user_id' => $user->id,
            'item_type' => $request->item_type,
            'item_id' => $request->item_id,
        ]);

        return response()->json($saved, 201);
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();
        if (!$user) return response()->json(['message' => 'Unauthorized'], 401);

        $saved = SavedEscape::where('user_id', $user->id)->find($id);
        
        // Alternative: toggle by item_type and item_id if ID is not known
        if (!$saved) {
             $request->validate([
                'item_type' => 'required|string',
                'item_id' => 'required|integer',
            ]);
            $saved = SavedEscape::where('user_id', $user->id)
                ->where('item_type', $request->item_type)
                ->where('item_id', $request->item_id)
                ->first();
        }

        if ($saved) {
            $saved->delete();
            return response()->json(['message' => 'Unsaved successfully']);
        }

        return response()->json(['message' => 'Item not found'], 404);
    }
}

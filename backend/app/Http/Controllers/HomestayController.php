<?php

namespace App\Http\Controllers;

use App\Models\Homestay;
use Illuminate\Http\Request;

class HomestayController extends Controller
{
    public function index()
    {
        return response()->json(Homestay::with(['country', 'city', 'destination'])->latest()->get());
    }

    public function show($id)
    {
        $homestay = Homestay::with(['country', 'city', 'destination'])
            ->where('id', $id)
            ->orWhere('slug', $id)
            ->firstOrFail();
        return response()->json($homestay);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:homestays,slug',
            'destination_id' => 'required|exists:destinations,id',
            'price_per_night' => 'required|numeric',
            'description' => 'nullable|string',
            'amenities' => 'nullable|array',
            'images' => 'nullable|array',
        ]);

        $data = $request->all();

        // Handle image uploads if any
        $images = [];
        for ($i = 1; $i <= 3; $i++) {
            if ($request->hasFile("image{$i}_file")) {
                $path = $request->file("image{$i}_file")->store('homestays', 'public');
                $images[] = "/storage/{$path}";
            } elseif ($request->input("image{$i}_url")) {
                $images[] = $request->input("image{$i}_url");
            }
        }
        if (!empty($images)) {
            $data['images'] = $images;
        }

        $homestay = Homestay::create($data);
        return response()->json($homestay, 201);
    }

    public function update(Request $request, $id)
    {
        $homestay = Homestay::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'string|max:255',
            'slug' => 'string|unique:homestays,slug,' . $id,
            'destination_id' => 'exists:destinations,id',
            'price_per_night' => 'numeric',
            'description' => 'nullable|string',
            'amenities' => 'nullable|array',
            'images' => 'nullable|array',
        ]);

        $data = $request->all();

        // Handle image uploads if any
        $images = $homestay->images ?? [];
        for ($i = 1; $i <= 3; $i++) {
            if ($request->hasFile("image{$i}_file")) {
                $path = $request->file("image{$i}_file")->store('homestays', 'public');
                $images[$i-1] = "/storage/{$path}";
            } elseif ($request->input("image{$i}_url")) {
                $images[$i-1] = $request->input("image{$i}_url");
            }
        }
        $data['images'] = $images;

        $homestay->update($data);
        return response()->json($homestay);
    }

    public function destroy($id)
    {
        $homestay = Homestay::findOrFail($id);
        $homestay->delete();
        return response()->json(null, 204);
    }
}

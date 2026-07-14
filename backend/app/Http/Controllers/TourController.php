<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use Illuminate\Http\Request;

class TourController extends Controller
{
    public function index()
    {
        return response()->json(Tour::with(['country', 'city', 'destination'])->latest()->get());
    }

    public function show($id)
    {
        $tour = Tour::with(['country', 'city', 'destination', 'homestays'])
            ->where('id', $id)
            ->orWhere('slug', $id)
            ->firstOrFail();
        return response()->json($tour);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        
        // Handle Images
        $images = [];
        for ($i = 1; $i <= 3; $i++) {
            if ($request->hasFile("image{$i}_file")) {
                $path = $request->file("image{$i}_file")->store('tours', 'public');
                $images[] = asset('storage/' . $path);
            } elseif ($request->filled("image{$i}_url")) {
                $images[] = $request->input("image{$i}_url");
            }
        }
        $data['images'] = $images;

        // Ensure array fields are handled correctly
        $jsonFields = ['itinerary', 'includes', 'excludes', 'luxury_features', 'highlights'];
        foreach ($jsonFields as $field) {
            if (is_string($request->$field)) {
                $data[$field] = json_decode($request->$field, true);
            }
        }

        $tour = Tour::create($data);

        if ($request->has('homestay_ids')) {
            $rawIds = is_string($request->homestay_ids) ? json_decode($request->homestay_ids, true) : $request->homestay_ids;
            $syncData = [];
            foreach ($rawIds as $item) {
                if (is_array($item)) {
                    $syncData[$item['id']] = ['day' => $item['day'] ?? null];
                } else {
                    $syncData[$item] = ['day' => null];
                }
            }
            $tour->homestays()->sync($syncData);
        }

        return response()->json($tour, 201);
    }

    public function update(Request $request, $id)
    {
        $tour = Tour::findOrFail($id);
        $data = $request->all();

        // Handle Images
        $images = $tour->images ?? [];
        for ($i = 1; $i <= 3; $i++) {
            if ($request->hasFile("image{$i}_file")) {
                $path = $request->file("image{$i}_file")->store('tours', 'public');
                $images[$i-1] = asset('storage/' . $path);
            } elseif ($request->filled("image{$i}_url")) {
                $images[$i-1] = $request->input("image{$i}_url");
            }
        }
        $data['images'] = array_values($images);

        // Ensure array fields are handled correctly
        $jsonFields = ['itinerary', 'includes', 'excludes', 'luxury_features', 'highlights'];
        foreach ($jsonFields as $field) {
            if (is_string($request->$field)) {
                $data[$field] = json_decode($request->$field, true);
            }
        }

        $tour->update($data);

        if ($request->has('homestay_ids')) {
            $rawIds = is_string($request->homestay_ids) ? json_decode($request->homestay_ids, true) : $request->homestay_ids;
            $syncData = [];
            foreach ($rawIds as $item) {
                if (is_array($item)) {
                    $syncData[$item['id']] = ['day' => $item['day'] ?? null];
                } else {
                    $syncData[$item] = ['day' => null];
                }
            }
            $tour->homestays()->sync($syncData);
        }

        return response()->json($tour);
    }

    public function destroy($id)
    {
        $tour = Tour::findOrFail($id);
        $tour->delete();
        return response()->json(null, 204);
    }
}

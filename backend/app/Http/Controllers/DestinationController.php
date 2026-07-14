<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
    public function index()
    {
        return response()->json(Destination::with(['country', 'city'])->latest()->get());
    }

    public function show($id)
    {
        // 1. Try to find as a specific Landmark/Destination
        $destination = Destination::with(['country', 'city', 'tours', 'homestays'])
            ->where('id', $id)
            ->orWhere('slug', $id)
            ->first();

        if ($destination) {
            return response()->json($destination);
        }
        // 2. Fallback: Try to find as a Country
        $country = \App\Models\Country::with(['cities', 'tours', 'homestays', 'destinations'])
            ->where('slug', $id)
            ->first();

        if ($country) {
            // Transform Country into a Destination-like object for the frontend
            return response()->json([
                'id' => $country->id,
                'name' => $country->name,
                'slug' => $country->slug,
                'tagline' => 'The Grand Territory of ' . $country->name,
                'description' => $country->description ?? 'Discover the untold stories and hidden sanctuaries of ' . $country->name . '. A legacy waiting to be unveiled.',
                'highlight' => 'National Heritage',
                'images' => [$country->image],
                'tours' => $country->tours->take(4),
                'homestays' => $country->homestays->take(3),
                'is_country' => true
            ]);
        }

        abort(404, 'Territory not chartered.');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:destinations,slug',
            'country_id' => 'required|exists:countries,id',
            'tagline' => 'nullable|string',
            'description' => 'nullable|string',
            'highlight' => 'nullable|string',
            'images' => 'nullable|array',
        ]);

        $data = $request->all();
        
        // Handle image uploads if any
        $images = [];
        for ($i = 1; $i <= 3; $i++) {
            if ($request->hasFile("image{$i}_file")) {
                $path = $request->file("image{$i}_file")->store('destinations', 'public');
                $images[] = "/storage/{$path}";
            } elseif ($request->input("image{$i}_url")) {
                $images[] = $request->input("image{$i}_url");
            }
        }
        if (!empty($images)) {
            $data['images'] = $images;
        }

        $destination = Destination::create($data);
        return response()->json($destination, 201);
    }

    public function update(Request $request, $id)
    {
        $destination = Destination::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'string|max:255',
            'slug' => 'string|unique:destinations,slug,' . $id,
            'country_id' => 'exists:countries,id',
            'tagline' => 'nullable|string',
            'description' => 'nullable|string',
            'highlight' => 'nullable|string',
            'images' => 'nullable|array',
        ]);

        $data = $request->all();

        // Handle image uploads if any
        $images = $destination->images ?? [];
        for ($i = 1; $i <= 3; $i++) {
            if ($request->hasFile("image{$i}_file")) {
                $path = $request->file("image{$i}_file")->store('destinations', 'public');
                $images[$i-1] = "/storage/{$path}";
            } elseif ($request->input("image{$i}_url")) {
                $images[$i-1] = $request->input("image{$i}_url");
            }
        }
        $data['images'] = $images;

        $destination->update($data);
        return response()->json($destination);
    }

    public function destroy($id)
    {
        $destination = Destination::findOrFail($id);
        $destination->delete();
        return response()->json(null, 204);
    }
}

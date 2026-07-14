<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function index()
    {
        return response()->json(City::with('country')->latest()->get());
    }

    public function show($id)
    {
        $city = City::with('country')
            ->where('id', $id)
            ->orWhere('slug', $id)
            ->firstOrFail();
        return response()->json($city);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        
        // Handle Images
        $images = [];
        for ($i = 1; $i <= 3; $i++) {
            if ($request->hasFile("image{$i}_file")) {
                $path = $request->file("image{$i}_file")->store('cities', 'public');
                $images[] = asset('storage/' . $path);
            } elseif ($request->filled("image{$i}_url")) {
                $images[] = $request->input("image{$i}_url");
            }
        }
        if (!empty($images)) {
            $data['images'] = $images;
        }

        $city = City::create($data);
        return response()->json($city, 201);
    }

    public function update(Request $request, $id)
    {
        $city = City::findOrFail($id);
        $data = $request->all();

        // Handle Images
        $images = $city->images ?? [];
        for ($i = 1; $i <= 3; $i++) {
            if ($request->hasFile("image{$i}_file")) {
                $path = $request->file("image{$i}_file")->store('cities', 'public');
                $images[$i-1] = asset('storage/' . $path);
            } elseif ($request->filled("image{$i}_url")) {
                $images[$i-1] = $request->input("image{$i}_url");
            }
        }
        $data['images'] = array_values($images);

        $city->update($data);
        return response()->json($city);
    }

    public function destroy($id)
    {
        $city = City::findOrFail($id);
        $city->delete();
        return response()->json(null, 204);
    }
}

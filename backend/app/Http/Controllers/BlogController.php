<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        return response()->json(Blog::latest()->get());
    }

    public function show($id)
    {
        $blog = Blog::where('id', $id)
            ->orWhere('slug', $id)
            ->firstOrFail();
        return response()->json($blog);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        // Handle image upload
        if ($request->hasFile('image1_file')) {
            $path = $request->file('image1_file')->store('blogs', 'public');
            $data['image'] = "/storage/{$path}";
        } elseif ($request->filled('image1_url')) {
            $data['image'] = $request->image1_url;
        }

        // Handle content decoding
        if (is_string($request->content)) {
            $data['content'] = json_decode($request->content, true);
        }

        $blog = Blog::create($data);
        return response()->json($blog, 201);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);
        $data = $request->all();

        // Handle image upload
        if ($request->hasFile('image1_file')) {
            $path = $request->file('image1_file')->store('blogs', 'public');
            $data['image'] = "/storage/{$path}";
        } elseif ($request->filled('image1_url')) {
            $data['image'] = $request->image1_url;
        }

        // Handle content decoding
        if (is_string($request->content)) {
            $data['content'] = json_decode($request->content, true);
        }

        $blog->update($data);
        return response()->json($blog);
    }

    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();
        return response()->json(null, 204);
    }
}

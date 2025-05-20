<?php

namespace App\Http\Controllers;

use App\Models\Blogger;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BloggerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Blogger/Index', [
            'bloggers' => Blogger::with('user:id,name')->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $request->user()->blogger()->create($validated);

        return redirect(route('blogger.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Blogger $blogger)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Blogger $blogger)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blogger $blogger)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blogger $blogger)
    {
        //
    }
}

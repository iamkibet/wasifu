<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ContactGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ContactGroupController extends Controller
{
    public function index()
    {
        $groups = ContactGroup::where('user_id', Auth::id())
            ->withCount('contacts')
            ->latest()
            ->paginate(10);

        return Inertia::render('ContactGroups/Index', [
            'groups' => $groups,
        ]);
    }

    public function create()
    {
        return Inertia::render('ContactGroups/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Auth::user()->contactGroups()->create($validated);

        return redirect()->route('contact-groups.index')
            ->with('success', 'Contact group created successfully.');
    }

    public function show(ContactGroup $contactGroup)
    {
        $this->authorize('view', $contactGroup);

        $contactGroup->load('contacts');

        return Inertia::render('ContactGroups/Show', [
            'group' => $contactGroup,
        ]);
    }

    public function edit(ContactGroup $contactGroup)
    {
        $this->authorize('update', $contactGroup);

        return Inertia::render('ContactGroups/Edit', [
            'group' => $contactGroup,
        ]);
    }

    public function update(Request $request, ContactGroup $contactGroup)
    {
        $this->authorize('update', $contactGroup);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $contactGroup->update($validated);

        return redirect()->route('contact-groups.show', $contactGroup)
            ->with('success', 'Contact group updated successfully.');
    }

    public function destroy(ContactGroup $contactGroup)
    {
        $this->authorize('delete', $contactGroup);

        $contactGroup->delete();

        return redirect()->route('contact-groups.index')
            ->with('success', 'Contact group deleted successfully.');
    }
}

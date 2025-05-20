<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\ContactGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function index()
    {
        $contacts = Contact::where('user_id', Auth::id())
            ->with('groups')
            ->latest()
            ->paginate(10);

        return Inertia::render('contacts/index', [
            'contacts' => $contacts,
        ]);
    }

    public function create()
    {
        $groups = ContactGroup::where('user_id', Auth::id())->get();

        return Inertia::render('contacts/create', [
            'groups' => $groups,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'custom_fields' => 'nullable|array',
            'is_subscribed' => 'boolean',
            'group_ids' => 'nullable|array',
            'group_ids.*' => 'exists:contact_groups,id',
        ]);

        $contact = Auth::user()->contacts()->create($validated);

        if ($request->has('group_ids')) {
            $contact->groups()->attach($request->group_ids);
        }

        return redirect()->route('contacts.index')
            ->with('success', 'Contact created successfully.');
    }

    public function show(Contact $contact)
    {
        $this->authorize('view', $contact);

        $contact->load('groups');

        return Inertia::render('contacts/show', [
            'contact' => $contact,
        ]);
    }

    public function edit(Contact $contact)
    {
        $this->authorize('update', $contact);

        $contact->load('groups');
        $groups = ContactGroup::where('user_id', Auth::id())->get();

        return Inertia::render('contacts/edit', [
            'contact' => $contact,
            'groups' => $groups,
        ]);
    }

    public function update(Request $request, Contact $contact)
    {
        $this->authorize('update', $contact);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:255',
            'custom_fields' => 'nullable|array',
            'is_subscribed' => 'boolean',
            'group_ids' => 'nullable|array',
            'group_ids.*' => 'exists:contact_groups,id',
        ]);

        $contact->update($validated);

        if ($request->has('group_ids')) {
            $contact->groups()->sync($request->group_ids);
        }

        return redirect()->route('contacts.show', $contact)
            ->with('success', 'Contact updated successfully.');
    }

    public function destroy(Contact $contact)
    {
        $this->authorize('delete', $contact);

        $contact->delete();

        return redirect()->route('contacts.index')
            ->with('success', 'Contact deleted successfully.');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt',
            'group_id' => 'nullable|exists:contact_groups,id',
        ]);

        // TODO: Implement CSV import logic
        // This will involve:
        // 1. Reading the CSV file
        // 2. Validating each row
        // 3. Creating contacts
        // 4. Attaching to group if specified

        return redirect()->route('contacts.index')
            ->with('success', 'Contacts imported successfully.');
    }

    public function groups()
    {
        $groups = ContactGroup::where('user_id', Auth::id())
            ->withCount('contacts')
            ->latest()
            ->paginate(10);

        return Inertia::render('contacts/groups', [
            'groups' => $groups,
        ]);
    }
}

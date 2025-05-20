<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\Contact;
use App\Models\ContactGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CampaignController extends Controller
{
    public function index()
    {
        $campaigns = Campaign::with('contactGroup')
            ->where('user_id', Auth::id())
            ->latest()
            ->paginate(10);

        return Inertia::render('campaigns/index', [
            'campaigns' => $campaigns,
        ]);
    }

    public function create()
    {
        $contactGroups = ContactGroup::where('user_id', Auth::id())->get();
        $contacts = Contact::where('user_id', Auth::id())->get();

        return Inertia::render('campaigns/create', [
            'contactGroups' => $contactGroups,
            'contacts' => $contacts,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:sms,email',
            'message' => 'required|string',
            'scheduled_at' => 'nullable|date|after:now',
            'contact_group_id' => 'nullable|exists:contact_groups,id',
            'contact_ids' => 'nullable|array',
            'contact_ids.*' => 'exists:contacts,id',
        ]);

        $campaign = Auth::user()->campaigns()->create($validated);

        if ($request->has('contact_ids')) {
            $campaign->contacts()->attach($request->contact_ids);
        }

        return redirect()->route('campaigns.show', $campaign)
            ->with('success', 'Campaign created successfully.');
    }

    public function show(Campaign $campaign)
    {
        $this->authorize('view', $campaign);

        $campaign->load(['contactGroup', 'contacts', 'messages']);

        return Inertia::render('campaigns/show', [
            'campaign' => $campaign,
        ]);
    }

    public function edit(Campaign $campaign)
    {
        $this->authorize('update', $campaign);

        $contactGroups = ContactGroup::where('user_id', Auth::id())->get();
        $contacts = Contact::where('user_id', Auth::id())->get();

        return Inertia::render('campaigns/edit', [
            'campaign' => $campaign,
            'contactGroups' => $contactGroups,
            'contacts' => $contacts,
        ]);
    }

    public function update(Request $request, Campaign $campaign)
    {
        $this->authorize('update', $campaign);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:sms,email',
            'message' => 'required|string',
            'scheduled_at' => 'nullable|date|after:now',
            'contact_group_id' => 'nullable|exists:contact_groups,id',
            'contact_ids' => 'nullable|array',
            'contact_ids.*' => 'exists:contacts,id',
        ]);

        $campaign->update($validated);

        if ($request->has('contact_ids')) {
            $campaign->contacts()->sync($request->contact_ids);
        }

        return redirect()->route('campaigns.show', $campaign)
            ->with('success', 'Campaign updated successfully.');
    }

    public function destroy(Campaign $campaign)
    {
        $this->authorize('delete', $campaign);

        $campaign->delete();

        return redirect()->route('campaigns.index')
            ->with('success', 'Campaign deleted successfully.');
    }

    public function send(Campaign $campaign)
    {
        $this->authorize('update', $campaign);

        // TODO: Implement campaign sending logic
        // This will involve:
        // 1. Checking user's wallet balance
        // 2. Sending messages to contacts
        // 3. Updating campaign status
        // 4. Deducting from wallet

        return redirect()->route('campaigns.show', $campaign)
            ->with('success', 'Campaign sent successfully.');
    }
}

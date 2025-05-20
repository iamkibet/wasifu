<?php

namespace App\Http\Controllers;

use App\Models\Template;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemplateController extends Controller
{
    public function index()
    {
        $templates = Template::where('user_id', auth()->id())
            ->latest()
            ->paginate(10);

        return Inertia::render('Templates/Index', [
            'templates' => $templates,
        ]);
    }

    public function create()
    {
        return Inertia::render('Templates/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:sms,email',
            'content' => 'required|string',
            'variables' => 'nullable|array',
        ]);

        auth()->user()->templates()->create($validated);

        return redirect()->route('templates.index')
            ->with('success', 'Template created successfully.');
    }

    public function show(Template $template)
    {
        $this->authorize('view', $template);

        return Inertia::render('Templates/Show', [
            'template' => $template,
        ]);
    }

    public function edit(Template $template)
    {
        $this->authorize('update', $template);

        return Inertia::render('Templates/Edit', [
            'template' => $template,
        ]);
    }

    public function update(Request $request, Template $template)
    {
        $this->authorize('update', $template);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:sms,email',
            'content' => 'required|string',
            'variables' => 'nullable|array',
        ]);

        $template->update($validated);

        return redirect()->route('templates.show', $template)
            ->with('success', 'Template updated successfully.');
    }

    public function destroy(Template $template)
    {
        $this->authorize('delete', $template);

        $template->delete();

        return redirect()->route('templates.index')
            ->with('success', 'Template deleted successfully.');
    }
}

<?php


namespace App\Http\Controllers;
use App\Models\Job;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Mail\JobPosted;
use Illuminate\Support\Facades\Mail;

class JobController extends Controller
{
    public function index() 
    {
       
       $jobs = Job::with('employer')->latest()->simplePaginate(5);
       
        return view('jobs.index', ['jobs' => $jobs]);
    }

    public function create() 
    {
        return view('jobs.create');
    }


    public function show(Job $job) 
    {
        return view('jobs.show', ['job' => $job]);
    }

    public function store() 
    {
        request()->validate([
        'title' => ['required', 'min:3'],
        'description' => ['required'],
        'salary' => ['required']
    ]);

    $job = Job::create([
        'title' => request('title'),
        'description' => request('description'),
        'salary' => request('salary'),
        'employer_id' => 1
        ]);


    Mail::to($job->employer->user)->queue(
        new JobPosted($job)
    );

    return redirect('/jobs');
    }

    public function edit(Job $job) 
    {
         return view('jobs.edit', ['job' => $job]);
    }

    public function update(Job $job) 
    {
        request()->validate([
        'title' => ['required', 'min:3'],
        'description' => ['required'],
        'salary' => ['required']
        ]);

        $job->update([
            'title' => request('title'),
            'description' => request('description'),
            'salary' => request('salary')
        ]);


    

        return redirect('/jobs/' . $job->id);
    }

    public function destroy(Job $job) 
    {
        $job->delete();
        return redirect('/jobs');
    }
}
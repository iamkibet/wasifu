<h2>{{$job->title}}</h2>

<p>
    Your Job was Successfully Posted
</p>

<p>
    <a href="{{url('/jobs/' . $job->id)}}">View Your Job Listing</a>
</p>
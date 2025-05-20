<x-layout>
    <x-slot:heading>
        Job Listing
    </x-slot:heading>
     <div class="space-y-3">
        @foreach ($jobs as $job)
       <li class=" block px-4 py-6 border border-gray-200 rounded-lg"> 
            <div class="font-bold text-blue-500">
                    {{ $job->employer->name }}
            </div>     
            <div>
                <a href="/jobs/{{ $job['id'] }}">
                    <strong> Title: </strong>{{ $job['title'] }} <br> Description: {{$job['description']}} <br><br>Salary: {{$job['salary']}}
                </a>
            </div>
        </li>
        @endforeach

        <div>
            {{ $jobs->links() }}
        </div>
     </div>
</x-layout>
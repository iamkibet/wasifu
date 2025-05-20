<x-layout>
    <x-slot:heading>
        Job
    </x-slot:heading>
     <h2 class="font-bold text-2xl">
        {{ $job->title}}
     </h2>
        <p class="pt-3 italic text-xl">
            {{ $job->description }}
        </p>
        <p class="pt-3 italic text-xl">
            Salary: {{ $job->salary }}
        </p>

        @can('edit', $job)
            <p>
                <x-button href="/jobs/{{$job->id}}/edit">Edit Job</x-button>
            </p>
        @endcan
</x-layout>
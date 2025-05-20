<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Resume - {{ $profile->full_name }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 24px;
            margin: 0;
            color: #2d3748;
        }

        .section {
            margin-bottom: 20px;
        }

        .section-title {
            font-size: 18px;
            color: #2d3748;
            border-bottom: 2px solid #e2e8f0;
            margin-bottom: 10px;
            padding-bottom: 5px;
        }

        .experience-item,
        .education-item {
            margin-bottom: 15px;
        }

        .experience-item h3,
        .education-item h3 {
            font-size: 16px;
            margin: 0;
            color: #4a5568;
        }

        .experience-item .company,
        .education-item .institution {
            font-weight: bold;
        }

        .experience-item .date,
        .education-item .date {
            color: #718096;
            font-size: 14px;
        }

        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .skill {
            background: #edf2f7;
            padding: 5px 10px;
            border-radius: 3px;
            font-size: 14px;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>{{ $profile->full_name }}</h1>
        <p>{{ $profile->professional_summary }}</p>
    </div>

    <div class="section">
        <h2 class="section-title">Work Experience</h2>
        @foreach ($profile->work_experience as $experience)
            <div class="experience-item">
                <h3>
                    <span class="position">{{ $experience['position'] }}</span>
                    at
                    <span class="company">{{ $experience['company'] }}</span>
                </h3>
                <div class="date">
                    {{ \Carbon\Carbon::parse($experience['start_date'])->format('M Y') }} -
                    {{ \Carbon\Carbon::parse($experience['end_date'])->format('M Y') }}
                </div>
                <p>{{ $experience['description'] }}</p>
            </div>
        @endforeach
    </div>

    <div class="section">
        <h2 class="section-title">Education</h2>
        @foreach ($profile->education as $education)
            <div class="education-item">
                <h3>
                    <span class="degree">{{ $education['degree'] }}</span>
                    in
                    <span class="field">{{ $education['field'] }}</span>
                </h3>
                <div class="institution">{{ $education['institution'] }}</div>
                <div class="date">
                    Graduated: {{ \Carbon\Carbon::parse($education['graduation_date'])->format('M Y') }}
                </div>
            </div>
        @endforeach
    </div>

    <div class="section">
        <h2 class="section-title">Skills</h2>
        <div class="skills-list">
            @foreach ($profile->skills as $skill)
                <span class="skill">{{ $skill }}</span>
            @endforeach
        </div>
    </div>

    @if (count($profile->certifications) > 0)
        <div class="section">
            <h2 class="section-title">Certifications</h2>
            <ul>
                @foreach ($profile->certifications as $certification)
                    <li>{{ $certification }}</li>
                @endforeach
            </ul>
        </div>
    @endif
</body>

</html>

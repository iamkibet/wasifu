<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Resume - {{ $profile->full_name }}</title>
    <style>
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 20px;
        }

        .header h1 {
            color: #2c3e50;
            margin: 0;
            font-size: 28px;
        }

        .contact-info {
            margin-top: 10px;
            color: #666;
        }

        .section {
            margin-bottom: 25px;
        }

        .section-title {
            color: #2c3e50;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
            margin-bottom: 15px;
            font-size: 18px;
        }

        .experience-item,
        .education-item {
            margin-bottom: 15px;
        }

        .experience-header,
        .education-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }

        .company,
        .institution {
            font-weight: bold;
            color: #2c3e50;
        }

        .date {
            color: #666;
        }

        .title,
        .degree {
            font-style: italic;
            color: #666;
        }

        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .skill {
            background: #f8f9fa;
            padding: 5px 10px;
            border-radius: 3px;
            font-size: 14px;
        }

        ul {
            margin: 0;
            padding-left: 20px;
        }

        li {
            margin-bottom: 5px;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>{{ $profile->full_name }}</h1>
        <div class="contact-info">
            {{ $profile->email }} | {{ $profile->phone }}
        </div>
    </div>

    <div class="section">
        <h2 class="section-title">Professional Summary</h2>
        <p>{{ $profile->professional_summary }}</p>
    </div>

    <div class="section">
        <h2 class="section-title">Work Experience</h2>
        @foreach ($profile->work_experience as $experience)
            <div class="experience-item">
                <div class="experience-header">
                    <span class="company">{{ $experience['company'] }}</span>
                    <span class="date">{{ $experience['start_date'] }} - {{ $experience['end_date'] }}</span>
                </div>
                <div class="title">{{ $experience['title'] }}</div>
                <ul>
                    @foreach ($experience['responsibilities'] as $responsibility)
                        <li>{{ $responsibility }}</li>
                    @endforeach
                </ul>
            </div>
        @endforeach
    </div>

    <div class="section">
        <h2 class="section-title">Education</h2>
        @foreach ($profile->education as $education)
            <div class="education-item">
                <div class="education-header">
                    <span class="institution">{{ $education['institution'] }}</span>
                    <span class="date">{{ $education['start_date'] }} - {{ $education['end_date'] }}</span>
                </div>
                <div class="degree">{{ $education['degree'] }} in {{ $education['field'] }}</div>
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

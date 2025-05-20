<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Cover Letter - {{ $profile->full_name }}</title>
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
            text-align: right;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 24px;
            margin: 0;
            color: #2d3748;
        }

        .date {
            margin-bottom: 20px;
        }

        .recipient {
            margin-bottom: 20px;
        }

        .content {
            margin-bottom: 20px;
        }

        .signature {
            margin-top: 40px;
        }

        .signature-name {
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>{{ $profile->full_name }}</h1>
        <p>{{ $profile->email }}</p>
        <p>{{ $profile->phone }}</p>
    </div>

    <div class="date">
        {{ \Carbon\Carbon::now()->format('F d, Y') }}
    </div>

    <div class="recipient">
        <p>
            Hiring Manager<br>
            {{ $document->jobDescription->company }}<br>
            {{ $document->jobDescription->job_title }} Position
        </p>
    </div>

    <div class="content">
        {!! $document->cover_letter_html !!}
    </div>

    <div class="signature">
        <p>Sincerely,</p>
        <p class="signature-name">{{ $profile->full_name }}</p>
    </div>
</body>

</html>

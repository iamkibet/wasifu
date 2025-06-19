<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Cover Letter - {{ $profile->full_name }}</title>
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
            margin-bottom: 30px;
        }

        .contact-info {
            text-align: right;
            margin-bottom: 20px;
        }

        .date {
            text-align: right;
            margin-bottom: 20px;
        }

        .recipient {
            margin-bottom: 20px;
        }

        .greeting {
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
            margin-top: 10px;
        }
    </style>
</head>

<body>
    <div class="header">
        <div class="contact-info">
            {{ $profile->full_name }}<br>
            {{ $profile->email }}<br>
            {{ $profile->phone }}
        </div>
    </div>

    <div class="date">
        {{ now()->format('F d, Y') }}
    </div>

    <div class="recipient">
        Hiring Manager<br>
        {{ $jobDescription->company }}<br>
        {{ $jobDescription->job_title }} Position
    </div>

    <div class="greeting">
        Dear Hiring Manager,
    </div>

    <div class="content">
        {!! $document->cover_letter_html !!}
    </div>

    <div class="signature">
        Sincerely,<br>
        <div class="signature-name">{{ $profile->full_name }}</div>
    </div>
</body>

</html>

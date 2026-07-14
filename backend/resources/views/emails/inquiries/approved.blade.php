<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Consultation Phase Initiated - Sovereign Elite</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #fafafa; color: #111; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #eaeaea; }
        .header { background-color: #000000; color: #ffffff; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-weight: 300; font-size: 24px; letter-spacing: 4px; text-transform: uppercase; }
        .content { padding: 40px 30px; line-height: 1.6; }
        .footer { text-align: center; padding: 30px; color: #888; font-size: 12px; background-color: #f5f5f5; border-top: 1px solid #eaeaea; }
        .btn { display: inline-block; padding: 15px 30px; background-color: #000; color: #fff; text-decoration: none; text-transform: uppercase; letter-spacing: 2px; font-size: 12px; font-weight: bold; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Sovereign Elite</h1>
        </div>
        <div class="content">
            <p>Dear {{ $inquiry->name }},</p>
            <p>We are pleased to inform you that your inquiry for <strong>{{ $inquiry->destination ?: 'your bespoke journey' }}</strong> has been officially acknowledged by our Senior Travel Curators.</p>
            <p>You have now entered the <strong>Consultation Phase</strong>. Your personal curator will be contacting you shortly to discuss your exact preferences, travel dates, and any special requirements you may have.</p>
            <p>In the meantime, you can log into your Sovereign Dashboard to track the status of your inquiry.</p>
            <div style="text-align: center;">
                <a href="{{ env('FRONTEND_URL', 'http://localhost:3000') }}/login" class="btn">Access Dashboard</a>
            </div>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} Sovereign Elite. All rights reserved.
        </div>
    </div>
</body>
</html>

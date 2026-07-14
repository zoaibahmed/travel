<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Official Quote - Sovereign Elite</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #fafafa; color: #111; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #eaeaea; }
        .header { background-color: #000000; color: #ffffff; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-weight: 300; font-size: 24px; letter-spacing: 4px; text-transform: uppercase; }
        .content { padding: 40px 30px; line-height: 1.6; text-align: center; }
        .quote-box { border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 30px; margin: 30px 0; }
        .amount { font-size: 36px; font-weight: 300; letter-spacing: 2px; margin: 10px 0; }
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
            <h2 style="font-weight: 300; text-transform: uppercase; letter-spacing: 2px;">Official Quote</h2>
            <p>Dear {{ $inquiry->name }},</p>
            <p>Your Senior Travel Curator has finalized the details for your bespoke journey to <strong>{{ $inquiry->destination ?: 'your preferred destination' }}</strong>.</p>
            
            <div class="quote-box">
                <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 10px; color: #888; margin: 0;">Total Investment</p>
                <div class="amount">{{ $inquiry->quote_currency }} {{ number_format($inquiry->quote_amount, 2) }}</div>
            </div>

            <p>Your itinerary is now awaiting your final approval and payment. Please log into your Sovereign Dashboard to finalize the booking and seal your expedition.</p>
            
            <a href="{{ env('FRONTEND_URL', 'http://localhost:3000') }}/login" class="btn">View & Pay Securely</a>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} Sovereign Elite. All rights reserved.
        </div>
    </div>
</body>
</html>

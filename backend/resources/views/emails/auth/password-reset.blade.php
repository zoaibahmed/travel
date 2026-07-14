<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Secure Access Code - Sovereign Elite</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #fafafa; color: #111; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #eaeaea; }
        .header { background-color: #000000; color: #ffffff; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-weight: 300; font-size: 24px; letter-spacing: 4px; text-transform: uppercase; }
        .content { padding: 40px 30px; line-height: 1.6; text-align: center; }
        .otp-box { background-color: #fafafa; border: 1px solid #eaeaea; padding: 20px; font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #d4af37; margin: 30px 0; display: inline-block; }
        .footer { text-align: center; padding: 30px; color: #888; font-size: 12px; background-color: #f5f5f5; border-top: 1px solid #eaeaea; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Sovereign Elite</h1>
        </div>
        <div class="content">
            <h2 style="font-weight: 300; text-transform: uppercase; letter-spacing: 2px;">Identity Verification</h2>
            <p>Dear {{ $user->name }},</p>
            <p>A request has been made to recover access to your Sovereign Elite account. Please use the following highly secure One-Time Password (OTP) to establish a new access key.</p>
            
            <div class="otp-box">
                {{ $otp }}
            </div>

            <p style="font-size: 14px; color: #666;">This code is valid for 15 minutes. If you did not request this, please ignore this email.</p>
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} Sovereign Elite. All rights reserved.
        </div>
    </div>
</body>
</html>

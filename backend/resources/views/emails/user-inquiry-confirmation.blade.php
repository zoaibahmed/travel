<!DOCTYPE html>
<html>
<head>
    <title>Sovereign Elite Inquiry</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="background-color: #ffffff; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid #eeeeee;">
        <h2 style="font-weight: 300; text-transform: uppercase; letter-spacing: 2px;">Welcome to Sovereign Elite, {{ $inquiry->name }}</h2>
        <p>Thank you for reaching out to us regarding your journey to <strong>{{ $inquiry->destination ?: 'our exclusive destinations' }}</strong>.</p>
        <p>Our travel concierge has received your inquiry and will be crafting a personalized response for you shortly.</p>
        
        @if($password)
        <div style="background-color: #f5f5f5; padding: 20px; margin-top: 30px;">
            <h4 style="margin-top: 0; text-transform: uppercase; letter-spacing: 1px;">Your Private Dashboard</h4>
            <p style="margin-bottom: 5px;">We have prepared an exclusive dashboard for you to track your journeys.</p>
            <p style="margin-bottom: 5px;"><strong>Email:</strong> {{ $inquiry->email }}</p>
            <p><strong>Temporary Password:</strong> {{ $password }}</p>
            <p style="font-size: 12px; color: #888;">You can log in at our website to view the status of your inquiry.</p>
        </div>
        @endif
        
        <p style="margin-top: 40px; font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px;">The Sovereign Concierge Team</p>
    </div>
</body>
</html>

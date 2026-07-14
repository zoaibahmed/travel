<!DOCTYPE html>
<html>
<head>
    <title>New Inquiry - Sovereign Elite</title>
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f0f0f0; padding: 30px; margin: 0; color: #333;">
    <div style="background-color: #ffffff; padding: 40px; max-width: 650px; margin: 0 auto; border-top: 4px solid #000; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
        <h2 style="font-weight: 300; text-transform: uppercase; letter-spacing: 2px; margin-top: 0;">New Inquiry Received</h2>
        <p style="color: #666; font-size: 15px;">A new client inquiry has been submitted via the Sovereign Elite platform.</p>
        
        <div style="background-color: #fafafa; border: 1px solid #eee; padding: 20px; margin-top: 25px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                    <td style="padding: 12px 10px; border-bottom: 1px solid #eee; width: 120px; color: #888;"><strong>Client Name:</strong></td>
                    <td style="padding: 12px 10px; border-bottom: 1px solid #eee; font-weight: bold;">{{ $inquiry->name }}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 10px; border-bottom: 1px solid #eee; color: #888;"><strong>Email:</strong></td>
                    <td style="padding: 12px 10px; border-bottom: 1px solid #eee;"><a href="mailto:{{ $inquiry->email }}" style="color: #000; text-decoration: none;">{{ $inquiry->email }}</a></td>
                </tr>
                <tr>
                    <td style="padding: 12px 10px; border-bottom: 1px solid #eee; color: #888;"><strong>Destination:</strong></td>
                    <td style="padding: 12px 10px; border-bottom: 1px solid #eee;">{{ $inquiry->destination ?: 'N/A' }}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 10px; border-bottom: 1px solid #eee; color: #888;"><strong>Item:</strong></td>
                    <td style="padding: 12px 10px; border-bottom: 1px solid #eee;">{{ $inquiry->item_type ?: 'General' }} {{ $inquiry->item_id ? '#'.$inquiry->item_id : '' }}</td>
                </tr>
                <tr>
                    <td style="padding: 12px 10px; color: #888; vertical-align: top;"><strong>Message:</strong></td>
                    <td style="padding: 12px 10px; line-height: 1.5; font-style: italic;">"{{ $inquiry->message }}"</td>
                </tr>
            </table>
        </div>
        
        <div style="margin-top: 30px; text-align: center;">
            <a href="{{ env('FRONTEND_URL', 'http://localhost:3000') }}/admin/inquiries" style="display: inline-block; background-color: #000; color: #fff; padding: 12px 25px; text-decoration: none; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Review in Admin Panel</a>
        </div>
    </div>
</body>
</html>

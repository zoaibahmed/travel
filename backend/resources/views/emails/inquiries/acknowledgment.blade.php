<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Your Inquiry - Sovereign Elite</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #fafafa; color: #111; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 40px auto; background-color: #ffffff; border: 1px solid #eaeaea; }
        .header { background-color: #000000; color: #ffffff; padding: 40px 30px; text-align: center; }
        .header h1 { margin: 0; font-weight: 300; font-size: 24px; letter-spacing: 4px; text-transform: uppercase; }
        .content { padding: 40px 30px; line-height: 1.6; }
        .concierge-note { font-style: italic; color: #555; border-left: 2px solid #000; padding-left: 15px; margin: 20px 0; }
        .recommendation { display: flex; margin-bottom: 20px; border: 1px solid #eee; }
        .rec-image { width: 150px; height: 100px; background-color: #ddd; object-fit: cover; }
        .rec-details { padding: 15px; }
        .rec-title { margin: 0 0 5px 0; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .rec-price { margin: 0; color: #777; font-size: 14px; }
        .footer { text-align: center; padding: 30px; color: #888; font-size: 12px; background-color: #f5f5f5; border-top: 1px solid #eaeaea; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Sovereign Elite</h1>
        </div>
        <div class="content">
            <p>Dear {{ $inquiry->name }},</p>
            <p>Thank you for reaching out to us regarding your bespoke journey to <strong>{{ $inquiry->destination ?: 'your preferred destination' }}</strong>.</p>
            
            <div class="concierge-note">
                "I will be your personal Senior Travel Curator for this inquiry. I am currently reviewing your request and will be in touch shortly to craft the perfect itinerary for you." <br>
                <strong>— {{ $concierge }}, Senior Travel Curator</strong>
            </div>

            @if($recommendations && $recommendations->count() > 0)
                <h3 style="text-transform: uppercase; letter-spacing: 2px; font-weight: 400; border-bottom: 1px solid #000; padding-bottom: 10px; margin-top: 40px;">While You Wait: Curated Inspirations</h3>
                <p>Based on your inquiry, you might find these curated experiences inspiring:</p>
                
                @foreach($recommendations as $tour)
                    <div class="recommendation">
                        @php
                            $imageUrl = !empty($tour->images) && is_array($tour->images) ? url(trim($tour->images[0], '/')) : 'https://via.placeholder.com/150';
                        @endphp
                        <img src="{{ $imageUrl }}" alt="{{ $tour->title }}" class="rec-image">
                        <div class="rec-details">
                            <h4 class="rec-title">{{ $tour->title }}</h4>
                            <p class="rec-price">{{ $tour->currency }} {{ number_format($tour->price, 0) }} &bull; {{ $tour->location }}</p>
                        </div>
                    </div>
                @endforeach
            @endif
        </div>
        <div class="footer">
            &copy; {{ date('Y') }} Sovereign Elite. All rights reserved.
        </div>
    </div>
</body>
</html>

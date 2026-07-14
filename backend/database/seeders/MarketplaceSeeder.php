<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Country;
use App\Models\City;
use App\Models\Destination;
use App\Models\Tour;
use App\Models\Homestay;
use App\Models\Blog;
use Illuminate\Support\Str;

class MarketplaceSeeder extends Seeder
{
    public function run()
    {
        // 0. Create Admin User
        \App\Models\User::updateOrCreate(
            ['email' => 'admin@sovereign.com'],
            [
                'name' => 'Grand Admin',
                'password' => \Illuminate\Support\Facades\Hash::make('admin123'),
                'is_first_login' => false
            ]
        );

        $unsplashIds = [
            '1464822759023-fed622ff2c3b', // Mountains
            '1544085311-11a028465b03', // Lake
            '1581454153094-1d0176d66e74', // Valley
            '1540518614846-7eded433c457', // Green hills
            '1596422846543-75c6fc18a593', // River
            '1583212292454-1fe6229603b7', // Forest
            '1590691566700-31d6ad04843a', // Desert
            '1512917774080-9991f1c4c750', // Luxury
            '1449156001935-d2863fb72610', // Snow
            '1622547748225-3fc4abd2cca0', // Architecture
            '1534438327276-14e5300c3a48', // City
            '1524231757912-21f4fe3a7200', // Market
            '1506905925346-21bda4d32df4', // Mangrove
            '1581091226825-a6a2a5aee158', // Wildlife
            '1472396961693-142e6e269027', // Nature
            '1571896349842-ed8bb6f78f65', // Luxury room
            '1600596542815-ffad4c1539a9', // Mansion
            '1566073771259-6a8506099945', // Resort pool
            '1520250497591-112f2f40a3f4', // Tropical beach
            '1582610116397-edb318620f90'  // Tea garden
        ];

        $getRandomImages = function($count = 3) use ($unsplashIds) {
            $images = [];
            $keys = array_rand($unsplashIds, $count);
            if (!is_array($keys)) $keys = [$keys];
            foreach ($keys as $key) {
                $images[] = "https://images.unsplash.com/photo-{$unsplashIds[$key]}?w=1200&auto=format&fit=crop&q=80";
            }
            return $images;
        };

        // 1. Countries
        $pakistan = Country::updateOrCreate(['name' => 'Pakistan'], ['slug' => 'pakistan', 'image' => "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200"]);
        $bangladesh = Country::updateOrCreate(['name' => 'Bangladesh'], ['slug' => 'bangladesh', 'image' => "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200"]);

        // 2. Cities (8 total)
        $cityData = [
            [
                'name' => 'Hunza Valley',
                'country_id' => $pakistan->id,
                'description' => 'A land where time stands still, surrounded by peaks that touch the heavens.',
            ],
            [
                'name' => 'Lahore',
                'country_id' => $pakistan->id,
                'description' => 'Step into the living history of the Mughal Empire. A city of architecture, art, and vibrant culinary scenes.',
            ],
            [
                'name' => 'Skardu',
                'country_id' => $pakistan->id,
                'description' => 'The heart of the high mountains. Cold deserts, turquoise lakes, and the literal gateway to K2.',
            ],
            [
                'name' => 'Islamabad',
                'country_id' => $pakistan->id,
                'description' => 'A serene capital city nestled in the Margalla Hills, offering a perfect blend of nature and modern elegance.',
            ],
            [
                'name' => 'Sylhet',
                'country_id' => $bangladesh->id,
                'description' => 'Navigate the mystical swamp forests and endless rolling tea gardens of eastern Bangladesh.',
            ],
            [
                'name' => 'Khulna',
                'country_id' => $bangladesh->id,
                'description' => 'Gateway to the Sundarbans. A labyrinth of tidal waterways, mudflats, and home to the Royal Bengal Tiger.',
            ],
            [
                'name' => 'Dhaka',
                'country_id' => $bangladesh->id,
                'description' => 'The vibrant heart of Bengal, where centuries of history meet bustling modern life.',
            ],
            [
                'name' => 'Cox\'s Bazar',
                'country_id' => $bangladesh->id,
                'description' => 'Home to the world\'s longest natural sea beach, a haven of endless horizons and ocean breezes.',
            ]
        ];

        foreach ($cityData as $c) {
            $c['images'] = $getRandomImages(3);
            City::updateOrCreate(
                ['slug' => Str::slug($c['name'])],
                $c
            );
        }

        $cities = City::all();
        $tourTitles = ['Royal Expedition', 'Heritage Walk', 'Scenic Escape', 'Luxury Retreat', 'Adventure Trail', 'Sunset Cruise', 'Cultural Odyssey'];
        $destTitles = ['Grand Mosque', 'Historical Fort', 'Emerald Lake', 'Hidden Valley', 'Royal Gardens', 'Ancient Ruins', 'Mountain Pass'];
        $homeTitles = ['The Grand Manor', 'Riverside Villa', 'Mountain Lodge', 'Heritage Haven', 'Boutique Residence', 'Royal Suites', 'Oasis Retreat'];

        foreach ($cities as $city) {
            // Generate 6 to 7 items for each category per city
            $itemCount = rand(6, 7);

            for ($i = 0; $i < $itemCount; $i++) {
                
                // Destinations
                $destName = $city->name . ' ' . $destTitles[$i % count($destTitles)] . ' ' . ($i + 1);
                Destination::updateOrCreate(
                    ['slug' => Str::slug($destName)],
                    [
                        'name' => $destName,
                        'country_id' => $city->country_id,
                        'city_id' => $city->id,
                        'tagline' => 'Iconic Landmark of ' . $city->name,
                        'description' => 'Discover the beauty and history of ' . $destName . ', an unmissable part of your journey in ' . $city->name . '.',
                        'highlight' => 'Exclusive Access',
                        'images' => $getRandomImages(3),
                    ]
                );

                // Tours
                $tourName = $city->name . ' ' . $tourTitles[$i % count($tourTitles)] . ' ' . ($i + 1);
                Tour::updateOrCreate(
                    ['slug' => Str::slug($tourName)],
                    [
                        'title' => $tourName,
                        'country_id' => $city->country_id,
                        'city_id' => $city->id,
                        'location' => $city->name,
                        'price' => rand(2000, 15000),
                        'duration' => rand(3, 14) . ' Days',
                        'description' => 'A curated ' . $city->name . ' journey designed for the modern explorer. Experience absolute luxury.',
                        'images' => $getRandomImages(3),
                        'includes' => ['Luxury Lodging', 'Private Concierge', 'Gourmet Dining'],
                        'itinerary' => [
                            ['day' => 'Day 1', 'title' => 'Arrival & Welcome', 'desc' => 'Settle into your luxury suite.', 'points' => ['Champagne reception']],
                            ['day' => 'Day 2', 'title' => 'Exploration', 'desc' => 'A full day exploring iconic landmarks.', 'points' => ['Private guided tour']],
                            ['day' => 'Day 3', 'title' => 'Immersion', 'desc' => 'Meet local artisans and experience heritage.', 'points' => ['Handicraft workshop']],
                        ]
                    ]
                );

                // Homestays
                $homeName = $city->name . ' ' . $homeTitles[$i % count($homeTitles)] . ' ' . ($i + 1);
                Homestay::updateOrCreate(
                    ['slug' => Str::slug($homeName)],
                    [
                        'name' => $homeName,
                        'country_id' => $city->country_id,
                        'city_id' => $city->id,
                        'price_per_night' => rand(150, 1200),
                        'description' => 'An elite residence in ' . $city->name . '. Experience the local charm with the Sovereign standard of service.',
                        'images' => $getRandomImages(3),
                        'amenities' => ['Private Chef', 'High-speed Wifi', 'Climate Control', 'Security Detail']
                    ]
                );
            }
        }

        // Blogs
        $blogData = [
            [
                'title' => '10 Hidden Gems in Pakistan\'s Northern Areas',
                'subtitle' => 'Beyond the famous valleys lie untouched sanctuaries of peace.',
                'author' => 'Zainab Ali',
                'author_role' => 'Travel Curator',
                'category' => 'Guides',
                'image' => 'https://images.unsplash.com/photo-1595152230661-00f64a23807d?w=1200',
                'content' => [
                    ['type' => 'paragraph', 'text' => 'The Karakoram Highway is just the beginning. The real magic happens when you turn off the main road...'],
                    ['type' => 'quote', 'text' => 'To travel is to discover that everyone is wrong about other countries.']
                ]
            ],
            [
                'title' => 'The Ultimate Guide to Bangladesh\'s Tea Gardens',
                'subtitle' => 'A journey through the emerald rolling hills of Sylhet.',
                'author' => 'Arif Hassan',
                'author_role' => 'Nature Expert',
                'category' => 'Nature',
                'image' => 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1200',
                'content' => [
                    ['type' => 'paragraph', 'text' => 'Sylhet is not just a destination; it\'s an atmosphere of serenity and emerald light...']
                ]
            ],
            [
                'title' => 'Mughal Architecture: A Legacy of Stone and Soul',
                'subtitle' => 'Exploring the architectural wonders of Lahore.',
                'author' => 'Fatima Noor',
                'author_role' => 'Heritage Historian',
                'category' => 'Culture',
                'image' => 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=1200',
                'content' => [
                    ['type' => 'paragraph', 'text' => 'The Walled City of Lahore tells a story in every brick, from the Badshahi Mosque to the hidden havelis...']
                ]
            ]
        ];

        foreach ($blogData as $b) {
            Blog::updateOrCreate(
                ['slug' => Str::slug($b['title'])],
                $b
            );
        }
    }
}

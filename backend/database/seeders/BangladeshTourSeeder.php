<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use App\Models\City;
use App\Models\Country;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class BangladeshTourSeeder extends Seeder
{
    public function run()
    {
        // 1. CLEAR OLD DATA (Country ID 2)
        Tour::where('country_id', 2)->delete();

        $bangladeshId = 2;

        $tours = [
            // ==========================================
            // COX'S BAZAR (City ID: 8)
            // ==========================================
            [
                'title' => 'Cox’s Bazar Ocean Prestige',
                'city_id' => 8,
                'price' => 185000,
                'duration' => '6 Days',
                'nights' => 5,
                'group_size' => 8,
                'overview' => 'A luxury coastal retreat blending oceanfront relaxation, island exploration, curated dining, and cinematic beach experiences.',
                'narrative' => 'Experience the world’s longest sea beach through private resort stays, sunset yacht moments, luxury seafood dining, and exclusive coastal adventures. This journey is curated for those who seek the rhythm of the tides without compromising on elite comfort.',
                'accommodation' => 'Luxury Beachfront Resort',
                'transport' => 'Private SUV & Premium Speedboat',
                'best_season' => 'November to March',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1583920183232-e89c0a6b579a?auto=format&fit=crop&q=80&w=1920',
                'images' => [
                    'https://images.unsplash.com/photo-1583920183232-e89c0a6b579a?auto=format&fit=crop&q=80&w=1200',
                    'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200'
                ],
                'highlights' => ['Cox’s Bazar Beach', 'Inani Beach', 'Saint Martin Island', 'Sunset Yacht Dinner', 'Marine Drive'],
                'includes' => ['Luxury accommodation', 'Gourmet breakfast & dinner', 'Airport transfers', 'Private transport', 'Guided tours', 'Island speedboat ride', 'Bonfire event'],
                'excludes' => ['Flights', 'Personal shopping', 'Insurance', 'Lunch'],
                'luxury_features' => ['Ocean-view suites', 'Private beach dinner', 'Sunset yacht experience', 'Spa treatments', 'VIP beach cabanas'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Arrival in the Coastal Capital', 'desc' => 'Upon arrival at Cox’s Bazar Airport, you will be met by our elite concierge team and whisked away in a private luxury SUV to your beachfront resort. The evening begins with a private welcome reception on the resort’s infinity deck, offering views of the Bay of Bengal as the sun dips below the horizon.'],
                    ['day' => 'Day 2', 'title' => 'The Marine Drive Odyssey', 'desc' => 'Embark on a cinematic drive along the 80km Marine Drive, where the hills meet the sea. We stop at Himchari for a panoramic view of the coastline and proceed to the secluded Inani Beach for a luxury picnic. Your afternoon is spent relaxing in a private cabana with curated refreshments.'],
                    ['day' => 'Day 3', 'title' => 'Saint Martin’s Azure Sanctuary', 'desc' => 'A premium, high-speed boat journey takes you to the coral paradise of Saint Martin’s Island. Enjoy a private tour of the island’s crystal-clear waters and white sand beaches. We have arranged a beachfront seafood lunch featuring the catch of the day, followed by a luxury sunset sail back to the mainland.'],
                    ['day' => 'Day 4', 'title' => 'Wellness & Coastal Leisure', 'desc' => 'Today is dedicated to relaxation. Enjoy a signature spa treatment at the resort’s world-class wellness center. In the afternoon, explore the local artisan markets with a private guide. The evening features a gourmet beach bonfire event with live acoustic music under the stars.'],
                    ['day' => 'Day 5', 'title' => 'Private Coastal Horizons', 'desc' => 'A leisurely day with a focus on private experiences. Choose between a private surfing lesson or a guided photography walk along the dunes. The highlight is a sunset yacht experience with a curated seafood tasting menu and premium hospitality.'],
                    ['day' => 'Day 6', 'title' => 'Final Reflection & Farewell', 'desc' => 'Enjoy a final gourmet breakfast with ocean views before your private transfer back to the airport. Our concierge will ensure a seamless check-in, concluding your Sovereign Ocean Prestige journey.']
                ]
            ],
            [
                'title' => 'Saint Martin Luxury Escape',
                'city_id' => 8,
                'price' => 210000,
                'duration' => '5 Days',
                'nights' => 4,
                'group_size' => 6,
                'overview' => 'An exclusive coral island retreat focusing on privacy, luxury beach villas, and pristine marine life.',
                'narrative' => 'Escape to the only coral island in Bangladesh. Stay in elite beachfront villas and experience the azure waters of Saint Martin’s in absolute seclusion and comfort.',
                'accommodation' => 'Luxury Beach Villas',
                'transport' => 'Private Premium Vessel & Electric Carts',
                'best_season' => 'November to February',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=1920',
                'images' => [
                    'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=1200',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
                    'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200'
                ],
                'highlights' => ['Coral Beach Access', 'Private Island Dining', 'Snorkeling', 'Sunrise Photography'],
                'includes' => ['Luxury villa stay', 'Full board gourmet meals', 'Private boat transfer', 'Guided marine tours'],
                'excludes' => ['International airfare', 'Alcohol', 'Personal expenses'],
                'luxury_features' => ['Private pool villas', 'Dedicated island butler', 'Floating breakfast'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Island Arrival', 'desc' => 'VIP transfer from Cox’s Bazar to a private vessel. Arrive at your luxury villa on Saint Martin’s Island and enjoy a private sunset reception.'],
                    ['day' => 'Day 2', 'title' => 'Coral & Crystal Waters', 'desc' => 'A guided snorkeling expedition to the hidden coral reefs. In the evening, enjoy a private beach dinner with a curated menu of exotic seafood.'],
                    ['day' => 'Day 3', 'title' => 'Chera Dwip Exploration', 'desc' => 'A private boat trip to the southernmost tip of Bangladesh, Chera Dwip. Experience the raw beauty of the coral formations and enjoy a luxury picnic on the pristine sands.'],
                    ['day' => 'Day 4', 'title' => 'Island Serenity', 'desc' => 'A day of leisure. Relax in your private pool or enjoy a guided walk through the island’s coconut groves. The evening features a farewell bonfire on the beach.'],
                    ['day' => 'Day 5', 'title' => 'Departure', 'desc' => 'Final sunrise viewing and private vessel transfer back to the mainland.']
                ]
            ],
            [
                'title' => 'Cox’s Elite Coastal Retreat',
                'city_id' => 8,
                'price' => 260000,
                'duration' => '7 Days',
                'nights' => 6,
                'group_size' => 10,
                'overview' => 'The ultimate coastal expedition covering the full length of the world’s longest beach in premium comfort.',
                'narrative' => 'From the bustling town to the quietest stretches of Marine Drive, experience the full spectrum of Cox’s Bazar’s beauty while staying in the most exclusive properties.',
                'accommodation' => 'Elite Resorts & Boutique Stays',
                'transport' => 'Luxury SUV Fleet',
                'best_season' => 'November to March',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920',
                'images' => [
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
                    'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=1200',
                    'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200'
                ],
                'highlights' => ['Inani Reefs', 'Himchari Heights', 'Marine Drive Sunset', 'Boutique Stay'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Arrival', 'desc' => 'VIP airport pickup and check-in to your elite resort.'],
                    ['day' => 'Day 2', 'title' => 'Himchari Exploration', 'desc' => 'Visit the waterfalls and the peaks of Himchari in a private SUV.'],
                    ['day' => 'Day 3', 'title' => 'The Inani Retreat', 'desc' => 'Check into a boutique property near Inani beach for ultimate privacy.'],
                    ['day' => 'Day 4', 'title' => 'Marine Drive Journey', 'desc' => 'A full day drive along the coast with multiple luxury stops.'],
                    ['day' => 'Day 5', 'title' => 'Moheshkhali Island', 'desc' => 'Private boat tour to the Adinath Temple and the hilly islands.'],
                    ['day' => 'Day 6', 'title' => 'Coastal Relaxation', 'desc' => 'Final day of leisure with spa and pool access.'],
                    ['day' => 'Day 7', 'title' => 'Departure', 'desc' => 'Airport transfer.']
                ]
            ],
            [
                'title' => 'Ocean Serenity Expedition',
                'city_id' => 8,
                'price' => 120000,
                'duration' => '4 Days',
                'nights' => 3,
                'group_size' => 5,
                'overview' => 'A short, high-impact luxury getaway for busy executives seeking immediate coastal peace.',
                'narrative' => 'The perfect weekend escape. Fly into Cox’s Bazar and spend three nights in absolute luxury, with curated experiences that maximize your time and relaxation.',
                'accommodation' => 'Premium Oceanfront Suite',
                'transport' => 'Chauffeur-Driven Luxury Sedan',
                'best_season' => 'Year-round',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1920',
                'highlights' => ['Sunset Dining', 'Private Beach Access', 'In-room Spa'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Swift Arrival', 'desc' => 'Transfer to resort and sunset drinks.'],
                    ['day' => 'Day 2', 'title' => 'Ocean Wellness', 'desc' => 'Morning yoga and full day spa treatments.'],
                    ['day' => 'Day 3', 'title' => 'Private Inani', 'desc' => 'Sunset dinner on the rocks at Inani beach.'],
                    ['day' => 'Day 4', 'title' => 'Departure', 'desc' => 'Morning breakfast and flight back.']
                ]
            ],
            [
                'title' => 'Marine Drive Prestige Journey',
                'city_id' => 8,
                'price' => 230000,
                'duration' => '6 Days',
                'nights' => 5,
                'group_size' => 8,
                'overview' => 'A cinematic road journey across the full Marine Drive, staying in the region\'s finest hidden gems.',
                'narrative' => 'Witness the meeting of the green hills and the blue ocean. This journey is designed for lovers of scenery and cinematic photography.',
                'accommodation' => 'Luxury Resorts & Eco-Lodges',
                'transport' => 'Land Cruiser Luxury Series',
                'best_season' => 'Winter',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920',
                'highlights' => ['Marine Drive Photography', 'Teknaf Reserve', 'Beachside Bonfire'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Arrival', 'desc' => 'Arrive and check-in.'],
                    ['day' => 'Day 2', 'title' => 'The Drive Part 1', 'desc' => 'Scenic journey to Himchari and Inani.'],
                    ['day' => 'Day 3', 'title' => 'Hidden Coves', 'desc' => 'Discovering secret beach spots along Marine Drive.'],
                    ['day' => 'Day 4', 'title' => 'Teknaf Wilderness', 'desc' => 'A visit to the southern tip and the forest reserves.'],
                    ['day' => 'Day 5', 'title' => 'Luxury Retreat', 'desc' => 'Return to a premium resort for a gala dinner.'],
                    ['day' => 'Day 6', 'title' => 'Departure', 'desc' => 'Final airport transfer.']
                ]
            ],

            // ==========================================
            // SYLHET (City ID: 5)
            // ==========================================
            [
                'title' => 'Sylhet Tea Garden Prestige',
                'city_id' => 5,
                'price' => 185000,
                'duration' => '5 Days',
                'nights' => 4,
                'group_size' => 8,
                'overview' => 'A luxury immersion into the emerald tea gardens and rolling hills of Sylhet.',
                'narrative' => 'Experience the serenity of the tea estates. Stay in colonial-era inspired luxury bungalows and witness the lush greenery of the region through curated private tours.',
                'accommodation' => 'Luxury Tea Resort',
                'transport' => 'Private SUV',
                'best_season' => 'June to September (Monsoon)',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1569344403223-9934bc6603a1?auto=format&fit=crop&q=80&w=1920',
                'images' => [
                    'https://images.unsplash.com/photo-1569344403223-9934bc6603a1?auto=format&fit=crop&q=80&w=1200',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
                    'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=1200'
                ],
                'highlights' => ['Tea Garden Tour', 'Private Tea Tasting', 'Srimangal Exploration', 'Waterfall Visit'],
                'includes' => ['Luxury resort stay', 'Gourmet meals', 'Private transport', 'Tea master guide'],
                'luxury_features' => ['Private tea tasting', 'Colonial bungalow stay', 'Infinity garden pool'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Arrival in the Emerald City', 'desc' => 'VIP pickup from Sylhet airport and transfer to your luxury tea resort. Welcome tea ceremony in the gardens.'],
                    ['day' => 'Day 2', 'title' => 'Tea Master Experience', 'desc' => 'A private tour of the estate with the tea master. Learn about the art of tea plucking and processing, followed by a private tasting session.'],
                    ['day' => 'Day 3', 'title' => 'Srimangal Discovery', 'desc' => 'Day trip to Srimangal, the tea capital. Visit the Lawachara National Park and enjoy a private lunch in a tea garden bungalow.'],
                    ['day' => 'Day 4', 'title' => 'Waterfalls & Wellness', 'desc' => 'Visit a hidden waterfall within the estate followed by an afternoon at the resort spa. Farewell dinner in the garden under the stars.'],
                    ['day' => 'Day 5', 'title' => 'Departure', 'desc' => 'Final morning in the gardens and transfer to the airport.']
                ]
            ],
            [
                'title' => 'Ratargul Luxury Escape',
                'city_id' => 5,
                'price' => 140000,
                'duration' => '4 Days',
                'nights' => 3,
                'group_size' => 6,
                'overview' => 'A surreal journey through the only freshwater swamp forest in Bangladesh.',
                'narrative' => 'Glide through the submerged trees of Ratargul in a private, luxury boat. This escape offers a unique connection with nature, staying in premium lakeside resorts.',
                'accommodation' => 'Luxury Lakeside Resort',
                'transport' => 'Private Boat & SUV',
                'best_season' => 'Monsoon',
                'difficulty' => 'Moderate',
                'hero_image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920',
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Arrival', 'desc' => 'Check-in to your lakeside resort.'],
                    ['day' => 'Day 2', 'title' => 'Ratargul Swamp', 'desc' => 'Private boat tour through the flooded forest.'],
                    ['day' => 'Day 3', 'title' => 'Bisnakandi Heights', 'desc' => 'A scenic boat ride to the stone collection point near the border.'],
                    ['day' => 'Day 4', 'title' => 'Departure', 'desc' => 'Transfer back to Sylhet.']
                ]
            ],
            [
                'title' => 'Sylhet Serenity Expedition',
                'city_id' => 5,
                'price' => 280000,
                'duration' => '7 Days',
                'nights' => 6,
                'group_size' => 10,
                'overview' => 'A comprehensive luxury expedition covering all the natural wonders of the Sylhet division.',
                'narrative' => 'From the tea gardens to the swamp forests and the stone-filled rivers, experience the best of Sylhet in absolute comfort and style.',
                'accommodation' => 'Elite Resorts & Heritage Stays',
                'hero_image' => 'https://images.unsplash.com/photo-1590001158193-790133597d9c?auto=format&fit=crop&q=80&w=1920',
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Arrival', 'desc' => 'Arrive and check-in.'],
                    ['day' => 'Day 2', 'title' => 'Tea Garden Life', 'desc' => 'Exploring the Malnicherra tea estate.'],
                    ['day' => 'Day 3', 'title' => 'Jaflong Gems', 'desc' => 'Visit the zero point and the Dawki river.'],
                    ['day' => 'Day 4', 'title' => 'Srimangal Wild', 'desc' => 'Exploring the Lawachara forest.'],
                    ['day' => 'Day 5', 'title' => 'Madhabpur Lake', 'desc' => 'A peaceful boat ride on the high-altitude lake.'],
                    ['day' => 'Day 6', 'title' => 'Cultural Night', 'desc' => 'Traditional Manipuri music and dance performance.'],
                    ['day' => 'Day 7', 'title' => 'Departure', 'desc' => 'Final transfer.']
                ]
            ],
            [
                'title' => 'Jaflong Elite Retreat',
                'city_id' => 5,
                'price' => 165000,
                'duration' => '4 Days',
                'nights' => 3,
                'group_size' => 8,
                'overview' => 'Experience the crystal waters of the Dawki river and the stone gardens of Jaflong in luxury.',
                'hero_image' => 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=1920',
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Arrival', 'desc' => 'Check-in to your premium Sylhet hotel.'],
                    ['day' => 'Day 2', 'title' => 'Dawki Crystal', 'desc' => 'Private boat trip on the transparent waters of the river.'],
                    ['day' => 'Day 3', 'title' => 'Lalakhal Blue', 'desc' => 'Exploring the blue waters of Lalakhal in a luxury boat.'],
                    ['day' => 'Day 4', 'title' => 'Departure', 'desc' => 'Transfer to airport.']
                ]
            ],
            [
                'title' => 'Sylhet Emerald Journey',
                'city_id' => 5,
                'price' => 220000,
                'duration' => '6 Days',
                'nights' => 5,
                'group_size' => 12,
                'overview' => 'A journey through the deepest green tea gardens and the most beautiful landscapes of Sylhet.',
                'hero_image' => 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=1920',
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Arrival', 'desc' => 'VIP airport pickup.'],
                    ['day' => 'Day 2', 'title' => 'Tea Estate Stay', 'desc' => 'Check-in to a private tea bungalow.'],
                    ['day' => 'Day 3', 'title' => 'Waterfall Hike', 'desc' => 'Guided luxury hike to a private waterfall.'],
                    ['day' => 'Day 4', 'title' => 'Srimangal Elite', 'desc' => 'Visit the best resorts in Srimangal.'],
                    ['day' => 'Day 5', 'title' => 'Lakeside Sunset', 'desc' => 'Farewell dinner at a high-end lakeside venue.'],
                    ['day' => 'Day 6', 'title' => 'Departure', 'desc' => 'Final transfer.']
                ]
            ],

            // ==========================================
            // SUNDARBANS (City ID: 6 - Khulna)
            // ==========================================
            [
                'title' => 'Sundarbans Royal Wilderness',
                'city_id' => 6,
                'price' => 320000,
                'duration' => '5 Days',
                'nights' => 4,
                'group_size' => 10,
                'overview' => 'A luxury river expedition into the world’s largest mangrove forest, the home of the Royal Bengal Tiger.',
                'narrative' => 'Cruise the delta in a private, eco-luxury vessel. Experience the wild beauty of the Sundarbans with gourmet dining on deck and guided forest safaris led by expert naturalists.',
                'accommodation' => 'Private Eco-Luxury Cruise Ship',
                'transport' => 'Private Vessel & Small Jungle Boats',
                'best_season' => 'November to March',
                'difficulty' => 'Moderate',
                'hero_image' => 'https://images.unsplash.com/photo-1621360841013-c7683c659ec6?auto=format&fit=crop&q=80&w=1920',
                'images' => [
                    'https://images.unsplash.com/photo-1621360841013-c7683c659ec6?auto=format&fit=crop&q=80&w=1200',
                    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
                    'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=1200'
                ],
                'highlights' => ['Tiger Spotting Safari', 'Mangrove Forest Walk', 'Sunset Deck Dining', 'Dolphin Watching'],
                'includes' => ['Luxury cruise accommodation', 'All gourmet meals', 'Forest permits', 'Expert naturalist guide'],
                'luxury_features' => ['Private viewing deck', 'On-board spa', 'En-suite luxury cabins'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'The Delta Boarding', 'desc' => 'VIP pickup from Khulna and boarding your luxury cruise. Sail deep into the mangroves as the sun sets, enjoying a welcome dinner on the top deck.'],
                    ['day' => 'Day 2', 'title' => 'Heart of the Mangrove', 'desc' => 'Early morning forest walk at Katka to see spotted deer and birdlife. Afternoon boat safari through the narrow creeks for tiger spotting. Dinner on a remote beach under the stars.'],
                    ['day' => 'Day 3', 'title' => 'Coastal Wilderness', 'desc' => 'Visit the beach of Kochikhali and hike through the dense forest. In the afternoon, enjoy a private dolphin-watching cruise at the confluence of the rivers.'],
                    ['day' => 'Day 4', 'title' => 'Wildlife & Estuaries', 'desc' => 'Exploring the Harbaria wildlife center and the eco-tourism spots. The final evening features a gala delta dinner with traditional local music on board.'],
                    ['day' => 'Day 5', 'title' => 'The Return Voyage', 'desc' => 'Scenic sail back to Khulna and transfer to the airport or your next destination.']
                ]
            ],
            [
                'title' => 'Mangrove Luxury Expedition',
                'city_id' => 6,
                'price' => 280000,
                'duration' => '4 Days',
                'nights' => 3,
                'group_size' => 8,
                'overview' => 'A shorter but high-intensity luxury safari through the mangrove delta.',
                'hero_image' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1920',
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Boarding', 'desc' => 'Welcome aboard your luxury vessel.'],
                    ['day' => 'Day 2', 'title' => 'The Wild Safari', 'desc' => 'Full day exploring the forest with expert guides.'],
                    ['day' => 'Day 3', 'title' => 'Delta Beauty', 'desc' => 'Sunset cruise and fine dining on deck.'],
                    ['day' => 'Day 4', 'title' => 'Departure', 'desc' => 'Return to Khulna.']
                ]
            ],
            [
                'title' => 'Bengal Delta Prestige Voyage',
                'city_id' => 6,
                'price' => 420000,
                'duration' => '10 Days',
                'nights' => 9,
                'group_size' => 14,
                'overview' => 'The ultimate luxury journey covering the entire length of the Bangladesh delta.',
                'hero_image' => 'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=1920',
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Boarding', 'desc' => 'Departure from Dhaka for a multi-day voyage.'],
                    ['day' => 'Day 2-9', 'title' => 'Delta Discovery', 'desc' => 'Extensive forest safaris, cultural visits, and premium hospitality.'],
                    ['day' => 'Day 10', 'title' => 'Return', 'desc' => 'Arrival back in Khulna.']
                ]
            ],
            [
                'title' => 'Sundarbans Serenity Escape',
                'city_id' => 6,
                'price' => 195000,
                'duration' => '3 Days',
                'nights' => 2,
                'group_size' => 6,
                'overview' => 'A boutique luxury weekend in the mangroves, staying in the region\'s finest eco-lodge.',
                'hero_image' => 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1920',
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Arrival', 'desc' => 'Check-in to the premium eco-lodge.'],
                    ['day' => 'Day 2', 'title' => 'Eco-Wild', 'desc' => 'Guided forest walk and sunset boat trip.'],
                    ['day' => 'Day 3', 'title' => 'Departure', 'desc' => 'Transfer to Khulna.']
                ]
            ],
            [
                'title' => 'Royal Bengal Retreat',
                'city_id' => 6,
                'price' => 350000,
                'duration' => '6 Days',
                'nights' => 5,
                'group_size' => 10,
                'overview' => 'A focused tiger-spotting expedition with the highest level of luxury on the delta.',
                'hero_image' => 'https://images.unsplash.com/photo-1621360841013-c7683c659ec6?auto=format&fit=crop&q=80&w=1920',
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Arrival', 'desc' => 'Boarding your private yacht.'],
                    ['day' => 'Day 2', 'title' => 'Tiger Watch 1', 'desc' => 'Deep forest safaris with specialized guides.'],
                    ['day' => 'Day 3', 'title' => 'Tiger Watch 2', 'desc' => 'Patience and observation in the best spots.'],
                    ['day' => 'Day 4', 'title' => 'Delta Relax', 'desc' => 'Spa and fine dining on board.'],
                    ['day' => 'Day 5', 'title' => 'Wildlife Gala', 'desc' => 'Celebrating the journey with a farewell dinner.'],
                    ['day' => 'Day 6', 'title' => 'Departure', 'desc' => 'Return transfer.']
                ]
            ],

            // ==========================================
            // DHAKA (City ID: 7)
            // ==========================================
            [
                'title' => 'Dhaka Heritage Prestige',
                'city_id' => 7,
                'price' => 125000,
                'duration' => '4 Days',
                'nights' => 3,
                'group_size' => 10,
                'overview' => 'Experience the rich history and vibrant culture of Dhaka through its royal monuments and elite urban spots.',
                'narrative' => 'Explore the "City of Mosques" in absolute comfort. From the Pink Palace of Ahsan Manzil to the Lalbagh Fort, discover the heritage of the Bengal capital with private access and fine dining.',
                'accommodation' => 'The Westin / InterContinental Dhaka',
                'transport' => 'Chauffeur-Driven Luxury Sedan',
                'best_season' => 'Winter',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&q=80&w=1920',
                'images' => [
                    'https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&q=80&w=1200',
                    'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200',
                    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200'
                ],
                'highlights' => ['Ahsan Manzil Private Tour', 'Lalbagh Fort', 'Buriganga River Cruise', 'Rooftop Fine Dining'],
                'includes' => ['Luxury hotel stay', 'Gourmet breakfast & dinner', 'Private transport', 'Heritage guide'],
                'luxury_features' => ['Rooftop lounge dinner', 'Private river boat', 'Executive lounge access'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'The Capital Welcome', 'desc' => 'VIP airport pickup and check-in to your luxury hotel. Evening features a private rooftop dinner overlooking the cityscape.'],
                    ['day' => 'Day 2', 'title' => 'Mughal & Zamindar Heritage', 'desc' => 'Private tour of the Lalbagh Fort and the Star Mosque. After lunch, visit the Pink Palace (Ahsan Manzil) for a private viewing of its royal collections.'],
                    ['day' => 'Day 3', 'title' => 'River & Resistance', 'desc' => 'A private morning cruise on the Buriganga river to see the bustling life of the city. Afternoon visit to the Curzon Hall and the National Museum.'],
                    ['day' => 'Day 4', 'title' => 'Urban Elegance & Departure', 'desc' => 'Leisure morning for shopping at upscale boutiques followed by a farewell lunch and airport transfer.']
                ]
            ],
            [
                'title' => 'Old Dhaka Royal Journey',
                'city_id' => 7,
                'price' => 110000,
                'duration' => '3 Days',
                'nights' => 2,
                'group_size' => 6,
                'overview' => 'A boutique journey through the ancient heart of Dhaka, staying in the region\'s finest luxury properties.',
                'hero_image' => 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1920',
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Heritage Arrival', 'desc' => 'Check-in and evening tea.'],
                    ['day' => 'Day 2', 'title' => 'Old City Secrets', 'desc' => 'Exploring the narrow alleys and the royal havelis.'],
                    ['day' => 'Day 3', 'title' => 'Departure', 'desc' => 'Final breakfast and transfer.']
                ]
            ],
            [
                'title' => 'Dhaka Luxury Urban Escape',
                'city_id' => 7,
                'price' => 95000,
                'duration' => '3 Days',
                'nights' => 2,
                'group_size' => 4,
                'overview' => 'A high-end urban escape focusing on the best dining and shopping in the capital.',
                'hero_image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920',
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Modern Dhaka', 'desc' => 'Check-in to a luxury suite in Gulshan.'],
                    ['day' => 'Day 2', 'title' => 'Elite Urban Life', 'desc' => 'Shopping at premium boutiques and dinner at a top-tier restaurant.'],
                    ['day' => 'Day 3', 'title' => 'Departure', 'desc' => 'Airport transfer.']
                ]
            ],
            [
                'title' => 'Bengal Capital Experience',
                'city_id' => 7,
                'price' => 175000,
                'duration' => '5 Days',
                'nights' => 4,
                'group_size' => 12,
                'overview' => 'A comprehensive experience of Dhaka, from its ancient roots to its modern skyscrapers.',
                'hero_image' => 'https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&q=80&w=1920',
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Arrival', 'desc' => 'Welcome dinner.'],
                    ['day' => 'Day 2', 'title' => 'The Ancient City', 'desc' => 'Full day in Old Dhaka.'],
                    ['day' => 'Day 3', 'title' => 'The Modern Pulse', 'desc' => 'Exploring the new capital and its landmarks.'],
                    ['day' => 'Day 4', 'title' => 'Cultural Night', 'desc' => 'Private performance of Bengali folk music.'],
                    ['day' => 'Day 5', 'title' => 'Departure', 'desc' => 'Final transfer.']
                ]
            ],
            [
                'title' => 'Dhaka Elite Discovery',
                'city_id' => 7,
                'price' => 220000,
                'duration' => '6 Days',
                'nights' => 5,
                'group_size' => 8,
                'overview' => 'A bespoke discovery tour for the elite traveler, featuring the most exclusive spots in Dhaka.',
                'hero_image' => 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1920',
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'The Discovery Begins', 'desc' => 'Private social club evening.'],
                    ['day' => 'Day 2', 'title' => 'Art & Heritage', 'desc' => 'Private gallery visits and museum tours.'],
                    ['day' => 'Day 3', 'title' => 'River Legacy', 'desc' => 'Private yacht cruise on the delta rivers.'],
                    ['day' => 'Day 4', 'title' => 'Culinary Dhaka', 'desc' => 'A private cooking class with a renowned chef.'],
                    ['day' => 'Day 5', 'title' => 'Gala Farewell', 'desc' => 'Dinner at an exclusive private residence.'],
                    ['day' => 'Day 6', 'title' => 'Departure', 'desc' => 'Final transfer.']
                ]
            ]
        ];

        foreach ($tours as $t) {
            $t['country_id'] = $bangladeshId;
            $t['slug'] = Str::slug($t['title']) . '-' . rand(1000, 9999);
            $t['booking_button_text'] = 'Book Expedition';
            $t['rating'] = 5.0;
            $t['destination_id'] = 2; // Default destination ID for Bangladesh
            $t['currency'] = 'BDT';
            
            // Default includes/excludes if not provided
            $t['includes'] = $t['includes'] ?? ['Luxury accommodation', 'Full board', 'Private transport', 'Guide'];
            $t['excludes'] = $t['excludes'] ?? ['International flights', 'Insurance', 'Personal expenses'];
            $t['luxury_features'] = $t['luxury_features'] ?? ['VIP concierge', 'Private dining', 'Luxury fleet'];
            $t['highlights'] = $t['highlights'] ?? ['Cinematic views', 'Cultural heritage', 'Gourmet cuisine'];

            $tour = Tour::create($t);

            // Associate Homestays in the same city
            $homestaysInCity = \App\Models\Homestay::where('city_id', $t['city_id'])->get();
            if ($homestaysInCity->count() > 0) {
                foreach ($homestaysInCity->take(3) as $idx => $h) {
                    $tour->homestays()->attach($h->id, ['day' => $idx + 1]);
                }
            }
        }
    }
}

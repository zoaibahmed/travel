<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tour;
use App\Models\City;
use App\Models\Country;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PakistanTourSeeder extends Seeder
{
    public function run()
    {
        // 1. CLEAR OLD DATA
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Tour::truncate();
        DB::table('tour_homestay')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $pakistanId = Country::where('name', 'Pakistan')->first()->id;

        $tours = [
            // ==========================================
            // HUNZA VALLEY (City ID: 1)
            // ==========================================
            [
                'title' => 'Hunza Royal Escape',
                'city_id' => 1,
                'price' => 285000,
                'duration' => '7 Days',
                'nights' => 6,
                'group_size' => 10,
                'overview' => 'A luxury northern Pakistan expedition exploring alpine valleys, lakes, forts, and cultural heritage through curated premium experiences.',
                'narrative' => 'Experience the timeless beauty of Hunza through private luxury stays, glacier viewpoints, heritage forts, curated cultural evenings, and breathtaking alpine scenery beneath the Karakoram sky.',
                'accommodation' => 'Luxury Mountain Resort',
                'transport' => 'Private Prado & Land Cruiser Convoy',
                'best_season' => 'April to October',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=2070&auto=format&fit=crop',
                'images' => [
                    'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1581454153094-1d0176d66e74?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1527549993586-dff825b37782?q=80&w=2060&auto=format&fit=crop'
                ],
                'highlights' => ['Attabad Lake', 'Baltit Fort', 'Passu Cones', 'Eagle Nest Sunset'],
                'includes' => ['Luxury accommodation', 'Gourmet breakfast & dinner', 'Private VIP transport', 'Local cultural entry'],
                'excludes' => ['International flights', 'Lunch', 'Personal insurance'],
                'luxury_features' => ['Rooftop dining', 'Personalized concierge', 'Private lake boating'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'The Royal Ascent to Hunza', 'desc' => 'Upon arrival at Gilgit Airport, you will be met by our elite concierge team and whisked away in a private luxury SUV. The drive along the Karakoram Highway is a cinematic experience in itself, offering views of the Silk Road and the meeting of three great mountain ranges. Arrive at your luxury mountain resort in Karimabad for a private welcome reception with traditional Hunza refreshments.'],
                    ['day' => 'Day 2', 'title' => 'Echoes of the Silk Road Heritage', 'desc' => 'Ascend to the 700-year-old Baltit Fort, where you will enjoy a private guided tour of the royal chambers and the ancient throne room. After exploring the heritage architecture, wander through the cobblestone streets of the local artisan market. Your afternoon concludes with a curated high-tea on the fortress terrace, overlooking the entire Hunza Valley as the sun begins to dip behind Rakaposhi.'],
                    ['day' => 'Day 3', 'title' => 'Blue Sapphire Waters of Attabad', 'desc' => 'A short drive leads us to the surreal blue waters of Attabad Lake. Embark on a private, canopy-covered boat for a serene voyage across the lake, surrounded by towering cathedral peaks. We will stop at a secluded bay for a lakeside gourmet lunch prepared by your private chef. The evening is spent at leisure, perhaps with a private massage session at the resort spa.'],
                    ['day' => 'Day 4', 'title' => 'The Cathedral Peaks of Passu', 'desc' => 'Today we venture into Upper Hunza. Witness the iconic Passu Cones, a cluster of serrated peaks that reach for the sky. Walk across the Hussaini Suspension Bridge for a thrilling perspective of the Hunza River. Lunch is served at an organic apricot orchard, where you can sample fresh valley produce. Return to Karimabad for an evening of stargazing with a professional-grade telescope.'],
                    ['day' => 'Day 5', 'title' => 'Ancient Echoes of Altit Village', 'desc' => 'Explore the sister fort of Altit, the oldest monument in Gilgit-Baltistan. Wander through the royal gardens and the traditional village of Altit, where time seems to have stood still. In the evening, enjoy a private performance of traditional Shina music at your resort, accompanied by a 7-course Hunza banquet featuring regional delicacies like Chapshuro and Walnut cake.'],
                    ['day' => 'Day 6', 'title' => 'Eagle’s Nest Sunset & Starlight', 'desc' => 'The penultimate day takes us to the highest viewpoint in the valley: Eagle’s Nest. Spend a peaceful afternoon reading or reflecting with the entire Karakoram range as your backdrop. As twilight approaches, we arrange a private "White Table" dinner on the cliffside, offering 360-degree views of Rakaposhi, Ladyfinger, and Ultar Sar under the emerging celestial dome.'],
                    ['day' => 'Day 7', 'title' => 'Final Reflection & Descent', 'desc' => 'Enjoy a final gourmet breakfast with valley views before your private transfer back to Gilgit. We will make a brief stop at the Rakaposhi View Point to pay our respects to the Mother of Clouds one last time. Our concierge will ensure a seamless check-in at the airport, concluding your Sovereign Royal Escape.']
                ]
            ],
            [
                'title' => 'Hunza Serenity Expedition',
                'city_id' => 1,
                'price' => 240000,
                'duration' => '6 Days',
                'nights' => 5,
                'group_size' => 8,
                'overview' => 'A tranquil journey through the heart of Hunza, focusing on wellness, nature, and elite boutique stays.',
                'narrative' => 'Rediscover peace amidst the giants. This curated expedition offers silent valley walks, morning yoga with mountain views, and exclusive access to the region\'s finest boutique retreats.',
                'accommodation' => 'Boutique Valley Sanctuary',
                'transport' => 'Land Cruiser Luxury Series',
                'best_season' => 'Spring and Autumn',
                'difficulty' => 'Moderate',
                'hero_image' => 'https://images.unsplash.com/photo-1527549993586-dff825b37782?q=80&w=2060&auto=format&fit=crop',
                'images' => [
                    'https://images.unsplash.com/photo-1527549993586-dff825b37782?q=80&w=2060&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1581454153094-1d0176d66e74?q=80&w=2070&auto=format&fit=crop'
                ],
                'highlights' => ['Altit Fort Gardens', 'Private Valley Picnic', 'Wellness Morning', 'Stargazing'],
                'includes' => ['Boutique lodging', 'Organic meals', 'Private guide', 'Airport VIP lounge access'],
                'excludes' => ['Alcoholic beverages', 'Gratuities', 'Extra spa treatments'],
                'luxury_features' => ['Private chef', 'Mountain-view yoga deck', 'Luxury heated suites'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Silent Valley Arrival', 'desc' => 'Arrive in Gilgit and be transferred to your secluded boutique sanctuary. The evening begins with a private mindfulness session followed by a farm-to-table welcome dinner featuring fresh trout from the glacier streams.'],
                    ['day' => 'Day 2', 'title' => 'Orchards of Contemplation', 'desc' => 'Spend your morning in the royal apricot orchards of Altit Fort. We arrange a private "Silent Picnic" among the 100-year-old trees, allowing you to fully absorb the tranquil mountain atmosphere. Afternoon is dedicated to personal reflection or a visit to a local women\'s social enterprise.'],
                    ['day' => 'Day 3', 'title' => 'Morning Yoga & Glacial Air', 'desc' => 'Start your day with a guided yoga session on a deck overlooking the Rakaposhi peak. Later, we take a gentle walk to a hidden mountain stream for a meditation session accompanied only by the sound of rushing water and birdsong.'],
                    ['day' => 'Day 4', 'title' => 'Boutique Karimabad Slow-Travel', 'desc' => 'A leisurely day exploring the quieter corners of Karimabad. Visit private art studios and enjoy coffee at a boutique cafe with views of the Ultar glacier. Your evening features a private stargazing session with our resident astronomer.'],
                    ['day' => 'Day 5', 'title' => 'Sunset over the Giants', 'desc' => 'A scenic drive to Eagle’s Nest for a final sunset meditation. As the peaks turn pink and then deep purple, enjoy a gourmet bonfire dinner with traditional local music performed softly by a private ensemble.'],
                    ['day' => 'Day 6', 'title' => 'Restored Spirit Return', 'desc' => 'Final morning meditation before a scenic transfer back to Gilgit airport. Stop for a farewell high-tea at the Rakaposhi viewpoint, concluding your journey of rejuvenation.']
                ]
            ],
            [
                'title' => 'Autumn Hunza Prestige',
                'city_id' => 1,
                'price' => 340000,
                'duration' => '8 Days',
                'nights' => 7,
                'group_size' => 12,
                'overview' => 'Witness the golden transformation of Hunza in peak autumn, staying in the region\'s most exclusive lodges.',
                'narrative' => 'Hunza in autumn is a masterpiece of gold and amber. This prestige tour is designed for photographers and lovers of cinematic landscapes, featuring elite stays and private access to the best viewpoints.',
                'accommodation' => 'Heritage Luxury Lodges',
                'transport' => 'VIP 4x4 Fleet',
                'best_season' => 'October to November',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1581454153094-1d0176d66e74?q=80&w=2070&auto=format&fit=crop',
                'images' => [
                    'https://images.unsplash.com/photo-1581454153094-1d0176d66e74?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1527549993586-dff825b37782?q=80&w=2060&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=2070&auto=format&fit=crop'
                ],
                'highlights' => ['Golden Valley Photography', 'Upper Hunza Scenic Drive', 'Heritage Dining', 'Local Harvest Feast'],
                'includes' => ['Premium lodging', 'Full board gourmet dining', 'Photography guide', 'Heated VIP transport'],
                'excludes' => ['Camera equipment rental', 'Personal laundry', 'Entry visas'],
                'luxury_features' => ['Heated blankets in-field', 'Private photography workshops', 'Evening harvest wine tasting (non-alc)'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Entering the Golden Kingdom', 'desc' => 'Arrive in Gilgit as the valley is ablaze with autumn colors. Drive through the golden poplar-lined highway to your luxury heritage lodge. A private harvest dinner awaits you, celebrating the season\'s first crop.'],
                    ['day' => 'Day 2', 'title' => 'The Amber Alleys of Karimabad', 'desc' => 'Explore the ancient streets of Karimabad, now draped in vibrant shades of red and gold. We have arranged a private photography workshop with a local master to capture the perfect autumn light reflecting off the glacier peaks.'],
                    ['day' => 'Day 3', 'title' => 'Hopper Valley’s Fiery Hues', 'desc' => 'A cross-valley excursion to the Hopper Glacier. The contrast between the black ice of the glacier and the fiery orange trees on the slopes is a visual feast. Enjoy a gourmet lunch in a private orchard cabin with a cozy wood-fire.'],
                    ['day' => 'Day 4', 'title' => 'Cathedrals in the Gold', 'desc' => 'Drive towards Upper Hunza, where the Passu Cones stand as silent sentinels over a golden landscape. Visit the Hussaini Bridge for dramatic photography before checking into a boutique lodge with 360-degree mountain views.'],
                    ['day' => 'Day 5', 'title' => 'Passu Glacier Discovery', 'desc' => 'A gentle hike to the edge of the Passu Glacier. We provide heated blankets and a portable espresso bar for a luxury coffee break with a view of the ancient ice. Return for an evening of local storytelling by the fireplace.'],
                    ['day' => 'Day 6', 'title' => 'Harvest Feast at Altit', 'desc' => 'Visit Altit Fort during the peak of the apricot harvest. Witness traditional drying techniques and participate in a private community lunch where you sample the freshest autumn produce. Your evening is free for leisure.'],
                    ['day' => 'Day 7', 'title' => 'Farewell Golden Sunset', 'desc' => 'A final sunset at Eagle’s Nest, looking over the entire valley as it glows in the dying light. We arrange a farewell 7-course banquet at your lodge, featuring a fusion of modern and heritage Hunza flavors.'],
                    ['day' => 'Day 8', 'title' => 'Departure through the Gold', 'desc' => 'Morning transfer back to Gilgit airport, with a final stop for photography at the Rakaposhi viewpoint. Our concierge will ensure a smooth departure for your onward journey.']
                ]
            ],
            [
                'title' => 'Hunza Glacier Discovery',
                'city_id' => 1,
                'price' => 390000,
                'duration' => '9 Days',
                'nights' => 8,
                'group_size' => 9,
                'overview' => 'An adventurous luxury expedition deep into the Karakoram glaciers, featuring VIP mountain camps.',
                'narrative' => 'For those who seek the wild without compromising on comfort. Reach the base of the world\'s highest peaks and return to a luxury camp with heated tents, private chefs, and absolute silence.',
                'accommodation' => 'VIP Expedition Camps & Luxury Resorts',
                'transport' => 'Off-road Modified Land Cruisers',
                'best_season' => 'June to September',
                'difficulty' => 'Hard',
                'hero_image' => 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
                'images' => [
                    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1527549993586-dff825b37782?q=80&w=2060&auto=format&fit=crop'
                ],
                'highlights' => ['Glacier Basecamp', 'Helicopter Scenic Flight', 'Hidden Valley Trek', 'Starry Nights'],
                'includes' => ['Luxury camping gear', 'Private expedition chef', 'Support porters', 'Emergency heli-evac insurance'],
                'excludes' => ['Personal hiking gear', 'Satellite phone usage', 'Excess baggage fees'],
                'luxury_features' => ['Heated expedition tents', 'Portable espresso bar', 'Champagne toast at basecamp'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'The Expedition Begins', 'desc' => 'Gear check and orientation at a luxury resort in Karimabad.'],
                    ['day' => 'Day 2', 'title' => 'Drive to the Edge', 'desc' => 'Off-road journey to the starting point of the glacier trek.'],
                    ['day' => 'Day 3', 'title' => 'The First Ascent', 'desc' => 'Moderate trek to our first VIP camp site with stunning peak views.'],
                    ['day' => 'Day 4', 'title' => 'Glacier Walk', 'desc' => 'Guided walk on the ancient ice with technical safety gear provided.'],
                    ['day' => 'Day 5', 'title' => 'Peak View Summit', 'desc' => 'Reach a vantage point overlooking four 7,000m+ peaks.'],
                    ['day' => 'Day 6', 'title' => 'Descent & Relaxation', 'desc' => 'Return to the valley and check into a luxury spa resort.'],
                    ['day' => 'Day 7', 'title' => 'Helicopter Scenic', 'desc' => 'Optional heli-tour of the Karakoram range (included).'],
                    ['day' => 'Day 8', 'title' => 'Victory Dinner', 'desc' => 'Celebrating the expedition with a gala dinner under the stars.'],
                    ['day' => 'Day 9', 'title' => 'Transfer', 'desc' => 'Return transfer to Gilgit airport.']
                ]
            ],
            [
                'title' => 'Hunza Celestial Retreat',
                'city_id' => 1,
                'price' => 220000,
                'duration' => '5 Days',
                'nights' => 4,
                'group_size' => 6,
                'overview' => 'A boutique getaway focusing on stargazing, fine dining, and elite cultural experiences.',
                'narrative' => 'The clearest skies in the world await. Spend your nights with professional telescopes and your days in the comfort of Hunza\'s most exclusive boutique retreats.',
                'accommodation' => 'Exclusive Boutique Retreat',
                'transport' => 'Luxury SUV',
                'best_season' => 'Year-round (Best in Winter for Stars)',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1532980469-53b2b00d282f?q=80&w=2070&auto=format&fit=crop',
                'images' => [
                    'https://images.unsplash.com/photo-1532980469-53b2b00d282f?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1527549993586-dff825b37782?q=80&w=2060&auto=format&fit=crop'
                ],
                'highlights' => ['Professional Stargazing', 'Fine Dining', 'Local Music Performance', 'Private Spa'],
                'includes' => ['Boutique accommodation', 'All meals included', 'Stargazing equipment', 'Cultural performers'],
                'excludes' => ['Alcohol', 'Airfare', 'Personal items'],
                'luxury_features' => ['In-room telescope', 'Private fireplace dinner', 'Heated outdoor pool'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Sky Arrival', 'desc' => 'Afternoon arrival and orientation with our resident astronomer.'],
                    ['day' => 'Day 2', 'title' => 'Daytime Discovery', 'desc' => 'Local heritage tour followed by an afternoon spa session.'],
                    ['day' => 'Day 3', 'title' => 'Celestial Night', 'desc' => 'A dedicated stargazing session at a high-altitude private deck.'],
                    ['day' => 'Day 4', 'title' => 'Culinary Hunza', 'desc' => 'A private cooking class with a renowned local chef.'],
                    ['day' => 'Day 5', 'title' => 'Morning Light', 'desc' => 'Final sunrise viewing and transfer to the airport.']
                ]
            ],

            // ==========================================
            // SKARDU (City ID: 3)
            // ==========================================
            [
                'title' => 'Skardu Royal Expedition',
                'city_id' => 3,
                'price' => 698000,
                'duration' => '11 Days',
                'nights' => 10,
                'group_size' => 12,
                'overview' => 'A curated Skardu expedition exploring lakes, deserts, valleys, heritage forts, and luxury wilderness experiences.',
                'narrative' => 'Experience absolute luxury across lakes, valleys, remote sanctuaries, desert landscapes, and premium mountain retreats. This is the ultimate northern Pakistan dossier.',
                'accommodation' => 'Shangrila Resort & Shigar Fort',
                'transport' => 'Premium 4x4 Convoy',
                'best_season' => 'May to September',
                'difficulty' => 'Moderate',
                'hero_image' => 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
                'images' => [
                    'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1527549993586-dff825b37782?q=80&w=2060&auto=format&fit=crop'
                ],
                'highlights' => ['Shangrila Resort', 'Deosai Plains', 'Shigar Fort', 'Katpana Desert'],
                'includes' => ['Luxury accommodation', 'All meals included', 'VIP transport', 'Helicopter scenic flight'],
                'excludes' => ['International flights', 'Tips', 'Insurance'],
                'luxury_features' => ['Helicopter transfer', 'Private bonfire evenings', 'VIP photography setups'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Arrival in the Land of Giants', 'desc' => 'Your private aircraft touches down in Skardu, where you are greeted by our expedition lead. A seamless transfer takes you to the legendary Shangrila Resort, often called "Heaven on Earth." Spend your first afternoon in the quietude of the heart-shaped lake, enjoying a private welcome dinner on the floating pavilion as the mountains cast long shadows over the water.'],
                    ['day' => 'Day 2', 'title' => 'Lakes of the High Altitude', 'desc' => 'Explore the deep sapphire waters of Lower Kachura. We arrange a private boating excursion with a gourmet picnic served on a secluded bank. Later, wander through the local fruit orchards, where you can pick fresh cherries and apricots while breathing in the crisp, high-altitude air.'],
                    ['day' => 'Day 3', 'title' => 'The Deep Blue of Upper Kachura', 'desc' => 'A gentle hike through a pine forest leads us to the hidden Upper Kachura Lake. Known for its immense depth and crystal-clear water, we set up a luxury lakeside retreat for the day. Enjoy paddleboarding or simply sit with a book as our private chef prepares a trout barbecue on the shore.'],
                    ['day' => 'Day 4', 'title' => 'Entering the Deosai Plateau', 'desc' => 'The journey to the world’s highest plateau begins. In a specialized Land Cruiser convoy, we ascend to 13,000 feet. Your first night in Deosai is spent in our "Elite Wilderness Camp"—a glamping setup featuring heated tents, plush bedding, and a private dining tent. Watch the sunset over the rolling plains that stretch as far as the eye can see.'],
                    ['day' => 'Day 5', 'title' => 'Wildlife & Mirror Lakes', 'desc' => 'A day dedicated to the Land of Giants. We set out early with a local wildlife expert to spot the rare Himalayan Brown Bear. Later, we reach Sheosar Lake, a perfectly still body of water that mirrors the surrounding peaks. A luxury "High-Plateau" tea is served as the clouds dance across the water’s surface.'],
                    ['day' => 'Day 6', 'title' => 'Shigar Heritage & Royal Forts', 'desc' => 'Descent into the lush Shigar Valley. Your home for the next two nights is the 17th-century Shigar Fort, beautifully restored by the Serena group. Enjoy a private tour of the fort’s museum and its royal chambers before a 5-course dinner in the historic courtyard.'],
                    ['day' => 'Day 7', 'title' => 'Desert Sands & High Peaks', 'desc' => 'Experience the surreal beauty of the Katpana Desert, the highest cold desert in the world. We arrange a luxury "Dune Tea" setup with traditional Balti musicians. Contrast the white sand dunes with the snow-capped Karakoram peaks for a truly unique cinematic experience.'],
                    ['day' => 'Day 8', 'title' => 'The Royal Palace of Khaplu', 'desc' => 'A scenic drive to the Khaplu Valley, where you check into the royal Khaplu Palace. Wander through the exquisite Persian-style gardens and visit the 700-year-old Chaqchan Mosque. The evening is spent in the palace gardens with a private performance of Balti folk songs.'],
                    ['day' => 'Day 9', 'title' => 'Sarfaranga Dunes Off-Roading', 'desc' => 'A day of adventure. We take our modified Land Cruisers into the Sarfaranga sand dunes for a cinematic off-roading experience. As the sun sets, we set up a private bonfire and grill among the dunes, offering a perspective of the mountains found nowhere else.'],
                    ['day' => 'Day 10', 'title' => 'Skardu Cultural Immersion', 'desc' => 'Return to Skardu city for a curated shopping experience. Visit private workshops where local artisans craft jewelry from precious gems found in the mountains. Your final evening features a gala farewell dinner at your resort, reflecting on the journey across the Baltistan highlands.'],
                    ['day' => 'Day 11', 'title' => 'The Final Ascent', 'desc' => 'A final morning at leisure before your private transfer to Skardu airport. As you fly over the Indus river and the K2 peak, carry with you the silence and majesty of the Land of Giants.']
                ]
            ],
            [
                'title' => 'Deosai Elite Escape',
                'city_id' => 3,
                'price' => 320000,
                'duration' => '6 Days',
                'nights' => 5,
                'group_size' => 7,
                'overview' => 'A focused luxury retreat into the Deosai National Park, the highest plateau in the world.',
                'narrative' => 'Sleep under a billion stars in a high-tech heated glamping setup. Witness the Brown Bear in its natural habitat and enjoy gourmet meals prepared at 13,000 feet.',
                'accommodation' => 'Luxury Glamping & Serena Skardu',
                'transport' => 'Specialized High-Altitude Land Cruisers',
                'best_season' => 'July to August',
                'difficulty' => 'Moderate',
                'hero_image' => 'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=2070&auto=format&fit=crop',
                'images' => [
                    'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1527549993586-dff825b37782?q=80&w=2060&auto=format&fit=crop'
                ],
                'highlights' => ['Brown Bear Spotting', 'Sheosar Lake Picnic', 'Bara Pani Bridge', 'Stargazing'],
                'includes' => ['Luxury glamping setup', 'All meals', 'Wildlife expert guide', 'Oxygen supply on-board'],
                'excludes' => ['Alcohol', 'Tips', 'Airfare'],
                'luxury_features' => ['Heated glamping tents', 'Private expedition chef', 'Portable solar power'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Skardu Base Arrival', 'desc' => 'Arrive in Skardu and check into the Serena Shigar Fort for a night of royal acclimatization. Enjoy a private tour of the heritage gardens and a welcome dinner featuring traditional Balti trout.'],
                    ['day' => 'Day 2', 'title' => 'Ascent to the Land of Giants', 'desc' => 'A specialized high-altitude Land Cruiser convoy takes you from Shigar to the Deosai Plateau. Arrive at our "Star-Link Basecamp," featuring heated glamping tents and a private lounge area. The first evening is spent stargazing with a professional-grade telescope.'],
                    ['day' => 'Day 3', 'title' => 'The Rolling Plains Expedition', 'desc' => 'Spend the day exploring the vast, rolling hills of Deosai. We set out with a wildlife expert to spot the Himalayan Brown Bear. Lunch is a gourmet "Picnic on the Plain" served at Bara Pani, where you can watch the crystal-clear streams flow over ancient rocks.'],
                    ['day' => 'Day 4', 'title' => 'The Mirror of Sheosar', 'desc' => 'A scenic drive leads to Sheosar Lake, one of the most beautiful high-altitude lakes in the world. We set up a private day-camp on the shore, offering a peaceful environment for reading, reflection, or photography. Afternoon tea is served as the sun casts a golden glow over the plateau.'],
                    ['day' => 'Day 5', 'title' => 'Descent & Palace Farewell', 'desc' => 'A final morning in the wilderness before descending back to Skardu. Check into the Serena Khaplu Palace for a night of royal luxury. Your farewell dinner is a 7-course Balti feast in the palace gardens under the stars.'],
                    ['day' => 'Day 6', 'title' => 'Flight to the Capital', 'desc' => 'Morning transfer to Skardu airport for your flight back to Islamabad. As you fly over the Karakoram range, reflect on your journey through the highest wilderness on earth.']
                ]
            ],
            [
                'title' => 'Karakoram Signature Voyage',
                'city_id' => 3,
                'price' => 520000,
                'duration' => '10 Days',
                'nights' => 9,
                'group_size' => 12,
                'overview' => 'A signature voyage through the most dramatic landscapes of the Karakoram range.',
                'narrative' => 'From the lush valleys of Shigar to the cold deserts of Skardu, this signature voyage is curated for those who want to see everything in absolute comfort.',
                'accommodation' => 'Elite Heritage & Boutique Stays',
                'transport' => 'Mercedes Unimog / Land Cruiser Convoy',
                'best_season' => 'May to October',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1581454153094-1d0176d66e74?q=80&w=2070&auto=format&fit=crop',
                'highlights' => ['Shigar Fort Stay', 'Blind Lake Visit', 'Royal Khaplu Palace', 'Katpana Luxury Camp'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'The Grand Arrival', 'desc' => 'Private transfer to Shigar Serena Fort.'],
                    ['day' => 'Day 2', 'title' => 'Shigar Exploration', 'desc' => 'Visit ancient mosques and local heritage sites.'],
                    ['day' => 'Day 3', 'title' => 'The Cold Desert', 'desc' => 'Sunset tea in the dunes of Katpana.'],
                    ['day' => 'Day 4', 'title' => 'Upper Skardu Valley', 'desc' => 'Private boating on Upper Kachura Lake.'],
                    ['day' => 'Day 5', 'title' => 'Khaplu Heritage', 'desc' => 'Checking into the royal Khaplu Palace Serena.'],
                    ['day' => 'Day 6', 'title' => 'Thalle Valley', 'desc' => 'An off-road excursion to a hidden high valley.'],
                    ['day' => 'Day 7', 'title' => 'Manthoka Waterfall', 'desc' => 'Private picnic near the majestic falls.'],
                    ['day' => 'Day 8', 'title' => 'Skardu City VIP', 'desc' => 'Curated shopping and local artisan visits.'],
                    ['day' => 'Day 9', 'title' => 'Farewell Dinner', 'desc' => 'Gala dinner at the Shangrila Resort.'],
                    ['day' => 'Day 10', 'title' => 'Departure', 'desc' => 'Morning airport transfer.']
                ]
            ],
            [
                'title' => 'Skardu Alpine Legacy',
                'city_id' => 3,
                'price' => 410000,
                'duration' => '8 Days',
                'nights' => 7,
                'group_size' => 10,
                'overview' => 'An alpine journey focusing on the high-altitude lakes and royal heritage of Skardu.',
                'narrative' => 'Experience the legacy of the Rajas of Skardu while staying in their restored palaces and exploring the sapphire lakes of the Baltistan region.',
                'accommodation' => 'Serena Royal Palaces',
                'transport' => 'Luxury 4x4 Fleet',
                'best_season' => 'Spring and Summer',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=2070&auto=format&fit=crop',
                'highlights' => ['Upper Kachura Boating', 'Khaplu Palace Tour', 'Amburiq Mosque', 'Blind Lake'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Arrival', 'desc' => 'Pickup from Skardu airport and transfer to hotel.'],
                    ['day' => 'Day 2', 'title' => 'Lakes of Skardu', 'desc' => 'Full day exploring Shangrila and Kachura lakes.'],
                    ['day' => 'Day 3', 'title' => 'The Royal Fort', 'desc' => 'Exploring Shigar Fort and its organic gardens.'],
                    ['day' => 'Day 4', 'title' => 'Journey to Khaplu', 'desc' => 'Drive through the Indus valley to Khaplu Palace.'],
                    ['day' => 'Day 5', 'title' => 'Khaplu Village Walk', 'desc' => 'Guided walk through the ancient village and mosque.'],
                    ['day' => 'Day 6', 'title' => 'Return to Skardu', 'desc' => 'Scenic return drive with stops at Mantokha falls.'],
                    ['day' => 'Day 7', 'title' => 'Katpana Sunset', 'desc' => 'Farewell tea in the cold desert dunes.'],
                    ['day' => 'Day 8', 'title' => 'Departure', 'desc' => 'Morning flight to Islamabad.']
                ]
            ],
            [
                'title' => 'Katpana Luxury Retreat',
                'city_id' => 3,
                'price' => 360000,
                'duration' => '7 Days',
                'nights' => 6,
                'group_size' => 8,
                'overview' => 'A unique desert-meets-mountain retreat in the heart of Skardu.',
                'narrative' => 'Stay in luxury dunes-view suites and experience the surreal beauty of the Katpana desert, surrounded by snow-capped peaks.',
                'accommodation' => 'Luxury Desert Glamping & Serena Resort',
                'transport' => 'Private Prado Luxury',
                'best_season' => 'June to September',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop',
                'highlights' => ['Desert Safari', 'Bonfire under Stars', 'Kharpocho Fort', 'Indus River Boating'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Arrival', 'desc' => 'Check into your luxury desert camp.'],
                    ['day' => 'Day 2', 'title' => 'Dunes Adventure', 'desc' => 'Off-road safari in the Katpana desert.'],
                    ['day' => 'Day 3', 'title' => 'Kharpocho Viewpoint', 'desc' => 'Visit the ancient fort overlooking Skardu city.'],
                    ['day' => 'Day 4', 'title' => 'Indus River Cruise', 'desc' => 'Private boat ride on the mighty Indus river.'],
                    ['day' => 'Day 5', 'title' => 'Shigar Day Trip', 'desc' => 'Visit the fort and the cherry orchards.'],
                    ['day' => 'Day 6', 'title' => 'Desert Gala', 'desc' => 'Farewell dinner with local musicians in the desert.'],
                    ['day' => 'Day 7', 'title' => 'Departure', 'desc' => 'Transfer to airport.']
                ]
            ],

            // ==========================================
            // LAHORE (City ID: 2)
            // ==========================================
            [
                'title' => 'Lahore Heritage Prestige',
                'city_id' => 2,
                'price' => 185000,
                'duration' => '4 Days',
                'nights' => 3,
                'group_size' => 10,
                'overview' => 'Explore the cultural capital of Pakistan through its Mughal monuments and elite heritage sites.',
                'narrative' => 'Lahore is not just a city; it is an emotion. Experience the grandeur of the Mughal Empire with private access to historical sites and fine dining in the heart of the old city.',
                'accommodation' => 'The Pearl Continental / Serena Heritage',
                'transport' => 'Chauffeur-Driven Luxury Sedan',
                'best_season' => 'October to March',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
                'highlights' => ['Lahore Fort', 'Badshahi Mosque', 'Shalimar Gardens', 'Food Street'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'The Mughal Gateway', 'desc' => 'Arrive at Allama Iqbal International Airport where you are met by your private chauffeur. Transfer to your luxury heritage suite at the Pearl Continental. Your first evening in the cultural capital begins with a private "Welcome to Lahore" dinner on a rooftop in the historic district, overlooking the illuminated domes of the Badshahi Mosque.'],
                    ['day' => 'Day 2', 'title' => 'The Grandeur of Empires', 'desc' => 'A full day dedicated to the Mughal legacy. Explore the Lahore Fort, including private access to the Sheesh Mahal (Palace of Mirrors). Later, cross the courtyard to the Badshahi Mosque, one of the largest and most beautiful mosques in the world. Your afternoon concludes with a private high-tea in the Shahi Hamam (Royal Baths).'],
                    ['day' => 'Day 3', 'title' => 'The Living Heart of the Walled City', 'desc' => 'Enter the ancient Walled City through the Delhi Gate. Walk through the vibrant bazaars and visit the breathtaking Wazir Khan Mosque, famous for its intricate tile work. We arrange a private lunch in a restored 19th-century haveli, where you can sample authentic Lahori cuisine while listening to traditional sitar music.'],
                    ['day' => 'Day 4', 'title' => 'The Colonial & Modern Spirit', 'desc' => 'Explore the British-era architecture of the Mall Road and visit the Lahore Museum. Spend your final afternoon at the Shalimar Gardens, a UNESCO World Heritage site and a masterpiece of Mughal garden design. A private transfer takes you back to the airport for your onward journey, leaving with the spirit of Lahore in your heart.']
                ]
            ],
            [
                'title' => 'Mughal Lahore Experience',
                'city_id' => 2,
                'price' => 160000,
                'duration' => '3 Days',
                'nights' => 2,
                'group_size' => 6,
                'overview' => 'A focused journey through the architectural wonders of the Mughal dynasty in Lahore.',
                'narrative' => 'Walk in the footsteps of emperors. This curated experience offers deep insights into Mughal architecture, history, and the royal lifestyles of the past.',
                'accommodation' => 'Luxury Boutique Hotel',
                'transport' => 'Private Executive Transport',
                'best_season' => 'Winter',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=2070&auto=format&fit=crop',
                'highlights' => ['Sheesh Mahal', 'Royal Hamam', 'Jahangir Tomb', 'Anarkali Bazaar'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Empire Arrival', 'desc' => 'Check into your boutique heritage hotel. The evening features a private introductory lecture on Mughal history followed by a royal banquet inspired by the recipes of the Emperor Akbar.'],
                    ['day' => 'Day 2', 'title' => 'The Royal Citadel', 'desc' => 'A comprehensive, private tour of the Lahore Fort and the Badshahi Mosque. We have arranged exclusive access to the hidden tunnels and chambers of the fort not open to the general public. Dinner is served at a private haveli in the old city.'],
                    ['day' => 'Day 3', 'title' => 'The Gardens & The Tomb', 'desc' => 'A final morning exploring the Shalimar Gardens and the majestic Tomb of Emperor Jahangir across the Ravi river. Your executive transport then conveys you to the airport for your departure.']
                ]
            ],
            [
                'title' => 'Lahore Royal Cuisine Journey',
                'city_id' => 2,
                'price' => 210000,
                'duration' => '5 Days',
                'nights' => 4,
                'group_size' => 8,
                'overview' => 'A culinary expedition through the legendary flavors of Lahore.',
                'narrative' => 'From street food to royal banquets, experience why Lahore is the food capital of South Asia. Curated dining at exclusive locations and private cooking sessions included.',
                'accommodation' => 'Luxury Hotel & Heritage Stay',
                'transport' => 'Chauffeur-Driven SUV',
                'best_season' => 'Winter',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
                'highlights' => ['Food Street VIP', 'Private Cooking Class', 'Organic Farm Lunch', 'Heritage Dining'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'The Welcome Feast', 'desc' => 'Arrive and be introduced to the elite modern dining scene of Lahore. Your first dinner is at a contemporary fusion restaurant that reinterprets classic Punjabi flavors for the discerning palate.'],
                    ['day' => 'Day 2', 'title' => 'Legacy of the Walled City', 'desc' => 'A curated "Flavor Trail" through the narrow alleys of the ancient city. Sample legendary street food from stalls that have been serving for generations. Afternoon features a private cooking class in a restored haveli.'],
                    ['day' => 'Day 3', 'title' => 'The Royal Mughal Banquet', 'desc' => 'Experience a multi-course Mughal banquet served in a private heritage setting. Each dish is prepared using traditional methods and spices that once graced the tables of the Emperors. The evening concludes with a private classical music performance.'],
                    ['day' => 'Day 4', 'title' => 'Modern Lahore & Farm Life', 'desc' => 'Visit an organic farm on the outskirts of the city for a fresh, open-air lunch. In the evening, explore the upscale dining district of Gulberg and enjoy a farewell dinner at one of Lahore’s most exclusive private member clubs.'],
                    ['day' => 'Day 5', 'title' => 'Departure', 'desc' => 'A final breakfast of traditional Lahori "Halwa Puri" before your private transfer to the airport.']
                ]
            ],
            [
                'title' => 'Lahore Elite Cultural Escape',
                'city_id' => 2,
                'price' => 260000,
                'duration' => '6 Days',
                'nights' => 5,
                'group_size' => 12,
                'overview' => 'An elite escape focusing on the arts, music, and traditions of Lahore.',
                'narrative' => 'Experience the soul of Lahore through its artists, musicians, and thinkers. Private performances and gallery visits curated for the elite traveler.',
                'accommodation' => 'Serena Luxury Suites',
                'transport' => 'Luxury Fleet',
                'best_season' => 'Spring and Winter',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1527549993586-dff825b37782?q=80&w=2060&auto=format&fit=crop',
                'highlights' => ['Private Sufi Night', 'Art Gallery VIP', 'Textile Museum', 'Horse & Cattle Show'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'The Sufi Evening', 'desc' => 'Upon arrival, check into your luxury suites at the Serena. Your journey begins with a private evening of Sufi music and poetry at a private garden, offering a deep spiritual introduction to the culture of Lahore.'],
                    ['day' => 'Day 2', 'title' => 'The Modern Arts', 'desc' => 'Visit the National College of Arts and enjoy private tours of several exclusive contemporary galleries. We have arranged for you to meet several leading Pakistani artists in their private studios for an intimate look at their creative process.'],
                    ['day' => 'Day 3', 'title' => 'Heritage & Crafts', 'desc' => 'Spend the day in the Walled City, focusing on the traditional crafts of Lahore. Visit private workshops where artisans still practice the ancient arts of tile-making, calligraphy, and wood-carving. Evening dinner at a restored haveli.'],
                    ['day' => 'Day 4', 'title' => 'Museums & Archives', 'desc' => 'A private tour of the Lahore Museum, focusing on its world-renowned collection of Gandhara art and Mughal miniatures. In the afternoon, visit the Punjab Archives to see rare manuscripts and colonial-era records.'],
                    ['day' => 'Day 5', 'title' => 'Polo & High Society', 'desc' => 'Experience the "Sport of Kings" with a private match at the Lahore Polo Club. Later, attend a curated cultural salon featuring talks by local historians and thinkers. Farewell dinner at an elite social club.'],
                    ['day' => 'Day 6', 'title' => 'Departure', 'desc' => 'Final morning for personal reflection or last-minute shopping before your executive transfer to Allama Iqbal International.']
                ]
            ],
            [
                'title' => 'Walled City Luxury Tour',
                'city_id' => 2,
                'price' => 140000,
                'duration' => '3 Days',
                'nights' => 2,
                'group_size' => 4,
                'overview' => 'A boutique tour of the ancient walled city with stays in luxury restored havelis.',
                'narrative' => 'Live in history. This tour takes you inside the heart of the ancient city, staying in beautifully restored private residences that offer a glimpse into the royal past.',
                'accommodation' => 'Restored Luxury Haveli',
                'transport' => 'Private E-Rickshaw & Walking',
                'best_season' => 'Winter',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=2070&auto=format&fit=crop',
                'highlights' => ['Wazir Khan Mosque', 'Delhi Gate', 'Haveli Dining', 'Local Artisans'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'The Haveli Welcome', 'desc' => 'Check into your meticulously restored private haveli. Enjoy evening tea on the rooftop as the sounds of the old city drift up and the sun sets over the domes of the Wazir Khan Mosque. Private dinner in the courtyard.'],
                    ['day' => 'Day 2', 'title' => 'The 12 Gates Journey', 'desc' => 'Explore the hidden alleys and heritage gates of the ancient city. We use private, luxury e-rickshaws to navigate the narrow streets, stopping at artisan workshops and historic shrines. Lunch is a curated tasting of old-city delicacies.'],
                    ['day' => 'Day 3', 'title' => 'Bazaar & Final Reflection', 'desc' => 'A final morning exploring the specialized bazaars for textiles and brassware. Your journey concludes with a private transfer from the heart of the old city to your onward destination.']
                ]
            ],

            // ==========================================
            // ISLAMABAD (City ID: 4)
            // ==========================================
            [
                'title' => 'Islamabad Luxury Capital Retreat',
                'city_id' => 4,
                'price' => 220000,
                'duration' => '5 Days',
                'nights' => 4,
                'group_size' => 10,
                'overview' => 'A premium retreat in the world\'s most beautiful capital city.',
                'narrative' => 'Discover the serenity of Islamabad. From the iconic Faisal Mosque to the lush Margalla Hills, experience the perfect blend of modern luxury and natural beauty.',
                'accommodation' => 'The Serena Islamabad / Marriott Executive',
                'transport' => 'Luxury SUV Convoy',
                'best_season' => 'Year-round',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1622322070381-e2bc007b8b4f?q=80&w=2070&auto=format&fit=crop',
                'highlights' => ['Faisal Mosque', 'Monal Sunset Dinner', 'Margalla Hiking', 'Heritage Museum'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'The Garden City Arrival', 'desc' => 'Arrive in the world’s most beautiful capital and be whisked away to the Serena Islamabad. Your retreat begins with a private welcome reception in the Moorish-style gardens, overlooking the city skyline and the Margalla Hills.'],
                    ['day' => 'Day 2', 'title' => 'Modern Icons & Sacred Spaces', 'desc' => 'A private tour of the iconic Faisal Mosque, a masterpiece of modern Islamic architecture. Later, visit the Pakistan Monument and the Lok Virsa Heritage Museum. Lunch is served at a boutique cafe in the serene Saidpur Village.'],
                    ['day' => 'Day 3', 'title' => 'The Galiyat Highland Escape', 'desc' => 'A scenic day trip to the cool highlands of Bhurban and Murree. We travel in a private luxury convoy, offering stops at panoramic viewpoints. Enjoy a gourmet lunch at the PC Bhurban resort before returning to the capital.'],
                    ['day' => 'Day 4', 'title' => 'Margalla Hills & Fine Dining', 'desc' => 'Spend your morning with a guided nature walk in the Margalla Hills. The afternoon is free for spa treatments or luxury shopping. Your final evening features a gala sunset dinner at Monal, offering breathtaking views of the city lights below.'],
                    ['day' => 'Day 5', 'title' => 'Capital Farewell', 'desc' => 'Enjoy a final breakfast with views of the hills before your private transfer to Islamabad International Airport, concluding your luxury capital retreat.']
                ]
            ],
            [
                'title' => 'Margalla Executive Escape',
                'city_id' => 4,
                'price' => 160000,
                'duration' => '3 Days',
                'nights' => 2,
                'group_size' => 6,
                'overview' => 'A short, high-end escape focusing on the natural beauty of the Margalla Hills.',
                'narrative' => 'Breathe in the fresh mountain air. This executive escape is designed for those who want a quick but luxurious getaway into the green hills surrounding the capital.',
                'accommodation' => 'Luxury Hill-Side Resort',
                'transport' => 'Private Luxury Sedan',
                'best_season' => 'Autumn and Spring',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=2070&auto=format&fit=crop',
                'highlights' => ['Daman-e-Koh', 'Pir Sohawa', 'Margalla Trails', 'Private BBQ'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Hillside Arrival', 'desc' => 'Check-in to a luxury resort with panoramic city views.'],
                    ['day' => 'Day 2', 'title' => 'Trail & Tea', 'desc' => 'A guided trail walk followed by high-tea at Highland Resort.'],
                    ['day' => 'Day 3', 'title' => 'City View', 'desc' => 'Visit Lake View Park and return transfer to airport.']
                ]
            ],
            [
                'title' => 'Islamabad Serenity Experience',
                'city_id' => 4,
                'price' => 240000,
                'duration' => '6 Days',
                'nights' => 5,
                'group_size' => 8,
                'overview' => 'A wellness-focused journey through the greenest city in Pakistan.',
                'narrative' => 'Find your balance. This serenity experience includes private spa sessions, morning yoga in the hills, and stays in the city\'s most peaceful luxury enclaves.',
                'accommodation' => 'Wellness Boutique Hotel',
                'transport' => 'Electric Luxury Fleet',
                'best_season' => 'Spring',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1527549993586-dff825b37782?q=80&w=2060&auto=format&fit=crop',
                'highlights' => ['Private Spa Retreat', 'Rawal Lake Boating', 'Rose & Jasmine Garden', 'Monal Fine Dining'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Wellness Welcome', 'desc' => 'A relaxing spa treatment upon arrival.'],
                    ['day' => 'Day 2', 'title' => 'Lakeside Peace', 'desc' => 'Morning yoga and private boating on Rawal Lake.'],
                    ['day' => 'Day 3', 'title' => 'Garden Walks', 'desc' => 'Exploring the city\'s botanical gardens with a guide.'],
                    ['day' => 'Day 4', 'title' => 'Margalla Heights', 'desc' => 'A scenic drive and picnic in the upper hills.'],
                    ['day' => 'Day 5', 'title' => 'The Modern Capital', 'desc' => 'Exploring Centaurus and elite urban spots.'],
                    ['day' => 'Day 6', 'title' => 'Departure', 'desc' => 'Final wellness session and transfer.']
                ]
            ],
            [
                'title' => 'Capital Heights Luxury Tour',
                'city_id' => 4,
                'price' => 320000,
                'duration' => '7 Days',
                'nights' => 6,
                'group_size' => 12,
                'overview' => 'The ultimate luxury tour of Islamabad and its surrounding hill stations.',
                'narrative' => 'Reach new heights of luxury. This tour takes you from the modern capital to the colonial-era hill stations of Murree and beyond, staying in the finest properties available.',
                'accommodation' => 'Premium Resorts & Palaces',
                'transport' => 'Luxury SUV Fleet',
                'best_season' => 'Summer',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1581454153094-1d0176d66e74?q=80&w=2070&auto=format&fit=crop',
                'highlights' => ['Murree Royal Tour', 'Bhurban Luxury Stay', 'Galiyat Scenic Drive', 'Margalla Sunset'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'Capital Arrival', 'desc' => 'Check-in to the Serena Hotel Islamabad.'],
                    ['day' => 'Day 2', 'title' => 'Journey to Bhurban', 'desc' => 'Drive to the elite PC Bhurban resort.'],
                    ['day' => 'Day 3', 'title' => 'Galiyat Discovery', 'desc' => 'Excursion to Nathia Gali and Ayubia National Park.'],
                    ['day' => 'Day 4', 'title' => 'Colonial Murree', 'desc' => 'Exploring the heritage and malls of the hill station.'],
                    ['day' => 'Day 5', 'title' => 'Return to Capital', 'desc' => 'Scenic return drive with stops at viewpoint.'],
                    ['day' => 'Day 6', 'title' => 'Faisal Mosque & More', 'desc' => 'City landmark tour and farewell dinner.'],
                    ['day' => 'Day 7', 'title' => 'Departure', 'desc' => 'Transfer to Islamabad International.']
                ]
            ],
            [
                'title' => 'Islamabad Elite Discovery',
                'city_id' => 4,
                'price' => 195000,
                'duration' => '4 Days',
                'nights' => 3,
                'group_size' => 4,
                'overview' => 'A bespoke discovery tour of the capital for the discerning traveler.',
                'narrative' => 'Explore the hidden gems of Islamabad. From private art studios to exclusive social clubs, discover the capital like a true local elite.',
                'accommodation' => 'Serena Luxury Suites',
                'transport' => 'Chauffeur-Driven Executive Car',
                'best_season' => 'Spring and Autumn',
                'difficulty' => 'Easy',
                'hero_image' => 'https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=2070&auto=format&fit=crop',
                'highlights' => ['Art Studio Visits', 'Elite Social Clubs', 'Heritage Trails', 'Potohari Cuisine'],
                'itinerary' => [
                    ['day' => 'Day 1', 'title' => 'The Discovery Begins', 'desc' => 'Check-in and evening at a private social club.'],
                    ['day' => 'Day 2', 'title' => 'Arts & Heritage', 'desc' => 'Visiting private art collections and the Folk Heritage Museum.'],
                    ['day' => 'Day 3', 'title' => 'The Potohar Trail', 'desc' => 'Exploring the ancient roots of the region at Saidpur Village.'],
                    ['day' => 'Day 4', 'title' => 'Departure', 'desc' => 'Final city views and transfer.']
                ]
            ]
        ];

        foreach ($tours as $t) {
            $t['country_id'] = $pakistanId;
            $t['slug'] = Str::slug($t['title']) . '-' . rand(1000, 9999);
            $t['booking_button_text'] = 'Book Expedition';
            $t['rating'] = 5.0;
            $t['destination_id'] = 1; // Default destination
            
            // Default includes/excludes if not provided
            $t['includes'] = $t['includes'] ?? ['Luxury accommodation', 'Full board', 'Private transport', 'Guide'];
            $t['excludes'] = $t['excludes'] ?? ['International flights', 'Insurance', 'Personal expenses'];
            $t['luxury_features'] = $t['luxury_features'] ?? ['VIP concierge', 'Private dining', 'Luxury fleet'];
            $t['highlights'] = $t['highlights'] ?? ['Cinematic views', 'Cultural heritage', 'Gourmet cuisine'];

            Tour::create($t);
        }
    }
}

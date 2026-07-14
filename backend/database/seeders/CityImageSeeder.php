<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\City;

class CityImageSeeder extends Seeder
{
    public function run()
    {
        $cityImages = [
            'Hunza Valley' => [
                'https://images.unsplash.com/photo-1520440229334-962aee4d1b9d?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&q=80&w=1200'
            ],
            'Skardu' => [
                'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200'
            ],
            'Lahore' => [
                'https://images.unsplash.com/photo-1572508589584-94d775206336?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1588693951525-666324036665?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1589982841200-a5483f12467b?auto=format&fit=crop&q=80&w=1200'
            ],
            'Islamabad' => [
                'https://images.unsplash.com/photo-1595123550441-d3a529377bc0?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1622322070381-e2bc007b8b4f?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200'
            ],
            'Cox\'s Bazar' => [
                'https://images.unsplash.com/photo-1583920183232-e89c0a6b579a?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200'
            ],
            'Sylhet' => [
                'https://images.unsplash.com/photo-1569344403223-9934bc6603a1?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1590001158193-790133597d9c?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&q=80&w=1200'
            ],
            'Khulna' => [
                'https://images.unsplash.com/photo-1621360841013-c7683c659ec6?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&q=80&w=1200'
            ],
            'Dhaka' => [
                'https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=1200',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200'
            ],
        ];

        foreach ($cityImages as $name => $imgs) {
            $city = City::where('name', $name)->first();
            if ($city) {
                $city->update(['images' => $imgs]);
            }
        }
    }
}

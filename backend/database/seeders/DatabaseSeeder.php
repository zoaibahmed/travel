<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Country;
use App\Models\Destination;
use App\Models\Tour;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            MarketplaceSeeder::class,
        ]);
    }
}

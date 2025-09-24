<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = [
            [
                'user_id' => 2,
                'name' => 'TechVision Ltd.',
                'description' => 'A leading IT company specializing in cloud and AI solutions.',
                'website' => 'https://techvision.com',
                'location' => 'Kabul, Afghanistan',
            ],
        ];

        foreach ($companies as $company) {
            Company::create($company);
        }
    }
}

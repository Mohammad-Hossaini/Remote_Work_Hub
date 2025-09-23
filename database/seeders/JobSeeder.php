<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Find the seeded employer
        $employer = User::where('role', 'employer')->first();

        if ($employer) {
            Job::create([
                'user_id' => $employer->id,
                'title' => 'Remote PHP Developer',
                'description' => 'Looking for a skilled PHP/Laravel developer.',
                'salary' => 1200.00,
            ]);

            Job::create([
                'user_id' => $employer->id,
                'title' => 'React Frontend Developer',
                'description' => 'Build modern frontends with React.',
                'salary' => 1000.00,
            ]);
        }
    }
}

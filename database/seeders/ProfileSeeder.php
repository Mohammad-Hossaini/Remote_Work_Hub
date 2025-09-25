<?php

namespace Database\Seeders;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run(): void {
        $jobSeeker = User::where('role', 'job_seeker')->first();

        if ($jobSeeker) {
            Profile::create([
                'user_id' => $jobSeeker->id,
                'first_name' => 'Ali',
                'last_name' => 'Mohammadi',
                'phone' => '0781598774',
                'description' => 'Java developer with 2 years of experience',
                'resume' => 'resumes/ali.pdf',
                'education' => 'BSc in Computer Science',
                'skills' => 'Java, PHP, Laravel, React',
            ]);
        }
    }
}
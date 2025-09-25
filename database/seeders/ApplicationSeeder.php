<?php

namespace Database\Seeders;

use App\Models\Application;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Application::create([
            'user_id' => 2,
            'job_id'  => 1,
            'cover_letter' => 'I am very interested in this role and believe my skills match perfectly.',
            'resume_path' => 'resumes/testResume.docx',
            'status' => 'pending',
        ]);
    }
}

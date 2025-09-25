<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->id();
            
            // Foreign keys
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // applicant
            $table->foreignId('job_id')->constrained()->onDelete('cascade');   // applied job
            
            // Application details
            $table->text('cover_letter')->nullable(); 
            $table->string('resume_path')->nullable(); // resume file (stored path)
            
            // Status of application
            $table->enum('status', [
                'pending',     // just submitted
                'under_review',// employer reviewing
                'shortlisted', // employer shortlisted
                'accepted',    // hired
                'rejected'     // not selected
            ])->default('pending');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};

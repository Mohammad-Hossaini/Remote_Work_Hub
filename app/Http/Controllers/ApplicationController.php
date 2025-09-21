<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Job;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    // Apply for a job (Job Seeker only)
    public function store(Request $request, $jobId)
    {
        $job = Job::findOrFail($jobId);

        // Prevent duplicate applications
        $existing = Application::where('user_id', $request->user()->id)
            ->where('job_id', $job->id)
            ->first();

        if ($existing) {
            return response()->json(['message' => 'Already applied'], 400);
        }

        $application = Application::create([
            'user_id' => $request->user()->id,
            'job_id' => $job->id,
        ]);

        return response()->json($application, 201);
    }

    // Employer: view applications for their jobs
    public function employerApplications(Request $request)
    {
        $applications = Application::whereHas('job', function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
        })->with(['user', 'job'])->get();

        return response()->json($applications);
    }

    // Job seeker: view their own applications
    public function myApplications(Request $request)
    {
        return response()->json(
            Application::with('job')->where('user_id', $request->user()->id)->get()
        );
    }
}

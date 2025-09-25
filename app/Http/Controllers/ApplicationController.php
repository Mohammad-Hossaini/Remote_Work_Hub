<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ApplicationController extends Controller
{
    // Submit new application
    public function store(Request $request, $jobId)
    {
        $validator = Validator::make($request->all(), [
            'cover_letter' => 'nullable|string|max:2000',
            'resume'       => 'required|mimes:pdf,doc,docx|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Handle resume upload
        $resumePath = null;
        if ($request->hasFile('resume')) {
            $resumePath = $request->file('resume')->store('public/resumes');
        }

        $application = Application::create([
            'user_id'      => Auth::id(),
            'job_id'       => $jobId,
            'cover_letter' => $request->cover_letter,
            'resume_path'  => $resumePath,
            'status'       => 'pending',
        ]);

        return response()->json([
            'message' => 'Application submitted successfully.',
            'application' => $application,
        ], 201);
    }

    // Employer updates status
    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:pending,under_review,shortlisted,accepted,rejected',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $application = Application::findOrFail($id);
        $application->status = $request->status;
        $application->save();

        return response()->json(['message' => 'Application status updated.']);
    }

    // Applicant views their applications
    public function myApplications()
    {
        return response()->json(Auth::user()->applications()->with('job')->get());
    }

    // Employer views applicants for a job
    // public function jobApplications($jobId)
    // {
    //     return response()->json(Application::where('job_id', $jobId)->with('user','job',  )->get());
    // }
    
    // Employer views applicants for a job, including job and user info
    public function jobApplications(Request $request, $jobId)
    {
        // Ensure the authenticated user is the owner of the job
        $job = Job::where('id', $jobId)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        // Get all applications for this job with user and job info
        $applications = Application::where('job_id', $jobId)
            ->with(['user', 'job'])
            ->get();

        return response()->json($applications);
    }
}



// class ApplicationController extends Controller
// {
//     // Apply for a job (Job Seeker only)
//     public function store(Request $request, $jobId)
//     {
//         $job = Job::findOrFail($jobId);

//         // Prevent duplicate applications
//         $existing = Application::where('user_id', $request->user()->id)
//             ->where('job_id', $job->id)
//             ->first();

//         if ($existing) {
//             return response()->json(['message' => 'Already applied'], 400);
//         }

//         $application = Application::create([
//             'user_id' => $request->user()->id,
//             'job_id' => $job->id,
//         ]);

//         return response()->json($application, 201);
//     }

//     // Employer: view applications for their jobs
//     public function employerApplications(Request $request)
//     {
//         $applications = Application::whereHas('job', function ($query) use ($request) {
//             $query->where('user_id', $request->user()->id);
//         })->with(['user', 'job'])->get();

//         return response()->json($applications);
//     }

//     // Job seeker: view their own applications
//     public function myApplications(Request $request)
//     {
//         return response()->json(
//             Application::with('job')->where('user_id', $request->user()->id)->get()
//         );
//     }
// }

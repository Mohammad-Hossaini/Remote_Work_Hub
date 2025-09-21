<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;

class JobController extends Controller
{
    // List all jobs
    public function index()
    {
        return response()->json(Job::with('user')->latest()->get());
    }

    // Create a new job (Employer only)
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'salary' => 'nullable|numeric',
        ]);

        $job = Job::create([
            'user_id' => $request->user()->id,
            'title' => $request->title,
            'description' => $request->description,
            'salary' => $request->salary,
        ]);

        return response()->json($job, 201);
    }

    // Show a single job
    public function show($id)
    {
        $job = Job::with('user')->findOrFail($id);
        return response()->json($job);
    }
    // Update a job (Employer only)
    public function update(Request $request, $id)
    {
        $job = Job::findOrFail($id);

        // Ensure the authenticated user is the owner of the job
        if ($request->user()->id !== $job->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $request->validate([
            'title' => 'sometimes|required|string',
            'description' => 'sometimes|required|string',
            'salary' => 'nullable|numeric',
        ]);

        $job->update($request->only(['title', 'description', 'salary']));

        return response()->json($job);
    }

    // Delete a job (Employer only)
    public function destroy(Request $request, $id)
    {
        $job = Job::findOrFail($id);

        // Ensure the authenticated user is the owner of the job
        if ($request->user()->id !== $job->user_id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $job->delete();

        return response()->json(null, 204);
    }
}
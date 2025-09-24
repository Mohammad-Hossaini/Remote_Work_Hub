<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JobController extends Controller
{
    public function index()
    {
        return response()->json(Job::with('company','user')->latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'company_id' => 'required|exists:companies,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'salary_min' => 'nullable|integer|min:0',
            'salary_max' => 'nullable|integer|min:0|gte:salary_min',
            'job_type' => 'required|in:full-time,part-time,contract,internship,remote',
            'status' => 'required|in:open,closed,draft',
            'deadline' => 'nullable|date|after:today',
        ]);

        $validated['user_id'] = Auth::id();

        $job = Job::create($validated);

        return response()->json($job, 201);
    }

    public function show($id)
    {
        return response()->json(Job::with('company','user')->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $job = Job::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'requirements' => 'nullable|string',
            'location' => 'nullable|string|max:255',
            'salary_min' => 'nullable|integer|min:0',
            'salary_max' => 'nullable|integer|min:0|gte:salary_min',
            'job_type' => 'sometimes|required|in:full-time,part-time,contract,internship,remote',
            'status' => 'sometimes|required|in:open,closed,draft',
            'deadline' => 'nullable|date|after:today',
        ]);

        $job->update($validated);

        return response()->json(['message' => 'Job updated successfully', 'job' => $job]);
    }

    public function destroy($id)
    {
        $job = Job::findOrFail($id);
        $job->delete();

        return response()->json(['message' => 'Job deleted successfully']);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
   /// List all profiles (Admin only maybe later)
    public function index()
    {
        return response()->json(Profile::with('user')->get());
    }

    // Show a single profile
    public function show($id)
    {
        $profile = Profile::with('user')->findOrFail($id);
        return response()->json($profile);
    }

    // Create profile (only for logged-in user who doesn’t already have one)
    public function store(Request $request)
    {
        $request->validate([
            'first_name'   => 'required|string|max:255',
            'last_name'    => 'required|string|max:255',
            'phone'        => 'nullable|string|max:20',
            'description'  => 'nullable|string',
            'resume'       => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'education'    => 'nullable|string|max:255',
            'skills'       => 'nullable|string|max:500',
        ]);

        $user = Auth::user();

        // Prevent duplicate profiles
        if ($user->profile) {
            return response()->json(['message' => 'Profile already exists'], 400);
        }

        // Handle resume upload
        // $resumePath = null;
        // if ($request->hasFile('resume')) {
        //     $resumePath = $request->file('resume')->store('resumes', 'public');
        // }
        if ($request->hasFile('resume')) {
            $file = $request->file('resume');
            $filename = time() . '_' . $file->getClientOriginalName();

            // Save directly in public/resumes
            $file->move(public_path('resumes'), $filename);

            $resumePath = 'resumes/' . $filename; // save relative path in DB
        }


        $profile = Profile::create([
            'user_id'     => $user->id,
            'first_name'  => $request->first_name,
            'last_name'   => $request->last_name,
            'phone'       => $request->phone,
            'description' => $request->description,
            'resume'      => $resumePath,
            'education'   => $request->education,
            'skills'      => $request->skills,
        ]);

        return response()->json($profile, 201);
    }

    // Update profile (only by owner)
    public function update(Request $request, $id)
    {
        $profile = Profile::findOrFail($id);

        // Ensure logged-in user owns this profile
        if (Auth::id() !== $profile->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'first_name'   => 'sometimes|required|string|max:255',
            'last_name'    => 'sometimes|required|string|max:255',
            'phone'        => 'nullable|string|max:20',
            'description'  => 'nullable|string',
            'resume'       => 'nullable|file|mimes:pdf,doc,docx|max:2048',
            'education'    => 'nullable|string|max:255',
            'skills'       => 'nullable|string|max:500',
        ]);

        // Resume upload
        // if ($request->hasFile('resume')) {
        //     $resumePath = $request->file('resume')->store('resumes', 'public');
        //     $profile->resume = $resumePath;
        // }
        if ($request->hasFile('resume')) {
            $file = $request->file('resume');
            $filename = time() . '_' . $file->getClientOriginalName();

            // Save directly in public/resumes
            $file->move(public_path('resumes'), $filename);

            $resumePath = 'resumes/' . $filename; // save relative path in DB
            $profile->resume = $resumePath;
        }


        $profile->update($request->only([
            'first_name', 'last_name', 'phone', 'description', 'education', 'skills' 
        ]));

        return response()->json($profile);
    }

    // Delete profile (owner only)
    public function destroy($id)
    {
        $profile = Profile::findOrFail($id);

        if (Auth::id() !== $profile->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $profile->delete();
        return response()->json(['message' => 'Profile deleted successfully']);
    }
}
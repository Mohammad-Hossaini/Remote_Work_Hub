<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'me']);

    //--------------------------------------------------------------------------------------
    // Profiles
    Route::get('/profiles', [ProfileController::class, 'index'])->middleware('role:admin'); // maybe admin only later
    Route::get('/profiles/{id}', [ProfileController::class, 'show']);
    Route::post('/profiles', [ProfileController::class, 'store'])->middleware('role:job_seeker');
    Route::post('/profiles/{id}', [ProfileController::class, 'update'])->middleware('role:job_seeker');
    Route::delete('/profiles/{id}', [ProfileController::class, 'destroy'])->middleware('role:job_seeker');
    //--------------------------------------------------------------------------------------

    //--------------------------------------------------------------------------------------
    // Company
    Route::get('/companies', [CompanyController::class, 'index']);
    Route::get('/companies/{id}', [CompanyController::class, 'show']);
    Route::post('/companies', [CompanyController::class, 'store'])->middleware('role:employer');
    Route::post('/companies/{id}', [CompanyController::class, 'update'])->middleware('role:employer');
    Route::delete('/companies/{id}', [CompanyController::class, 'destroy'])->middleware('role:employer');
    //---------------------------------------------------------------------------------------
    
    // --------------------------------------------------------------------------------------
    // Jobs
    // Employer only
    Route::middleware('role:employer')->group(function () {
        Route::post('/jobs', [JobController::class, 'store']);         // Post a new job
        Route::put('/jobs/{id}', [JobController::class, 'update']);    // Update job
        Route::delete('/jobs/{id}', [JobController::class, 'destroy']); // Delete job

        // Extra for employer
        Route::get('/employer/jobs', [JobController::class, 'myJobs']); // List jobs posted by the logged-in employer
        Route::patch('/employer/jobs/{id}/status', [JobController::class, 'changeStatus']);
    });
    //---------------------------------------------------------------------------------------
    
    // Applications
    Route::post('/jobs/{id}/apply', [ApplicationController::class, 'store'])->middleware('role:job_seeker');
    Route::get('/my-applications', [ApplicationController::class, 'myApplications'])->middleware('role:job_seeker');
    Route::get('/employer/applications', [ApplicationController::class, 'employerApplications'])->middleware('role:employer');
    
    

    //----------------------------------------------------------------------------------------
    // Applicants
    Route::middleware(['role:job_seeker'])->group(function () {
        Route::post('/jobs/{job}/apply', [ApplicationController::class, 'store']);
        Route::get('/my-applications', [ApplicationController::class, 'myApplications']);
    });

    // Employers
    Route::middleware(['role:employer'])->group(function () {
        Route::get('/jobs/allApplications', [ApplicationController::class, 'allApplications']);
        Route::get('/jobs/{job}/applications', [ApplicationController::class, 'jobApplications']);
        Route::patch('/applications/{id}/status', [ApplicationController::class, 'updateStatus']);
    });
    //-----------------------------------------------------------------------------------------



    // Admin only
    Route::middleware('role:admin')->group(function () {
         Route::get('/admin/allJobs', [JobController::class, 'allJobs']);   // Admin: view all jobs (open, closed, draft)
        Route::get('/admin/users', [AuthController::class, 'allUsers']);
        Route::get('/admin/settings', fn() => response()->json(['settings' => 'site settings here']));
    });
});



// every one can access to these routes
// Public for all logged-in users (job seekers, employers, admin)
    Route::get('/jobs', [JobController::class, 'index']);              // List all jobs (default: only "open")
    Route::get('/jobs/{id}', [JobController::class, 'show']);          // View single job details



//routes for testing purpose
// Route::post('/profiles', [ProfileController::class, 'store']);
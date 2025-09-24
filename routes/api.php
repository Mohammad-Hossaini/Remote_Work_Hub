<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AuthController;
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

    // Profiles
    Route::get('/profiles', [ProfileController::class, 'index'])->middleware('role:admin'); // maybe admin only later
    Route::get('/profiles/{id}', [ProfileController::class, 'show']);
    Route::post('/profiles', [ProfileController::class, 'store'])->middleware('role:job_seeker');
    Route::put('/profiles/{id}', [ProfileController::class, 'update'])->middleware('role:job_seeker');
    Route::delete('/profiles/{id}', [ProfileController::class, 'destroy'])->middleware('role:job_seeker');

    
    // Jobs
    Route::get('/jobs/{id}', [JobController::class, 'show']);
    Route::post('/jobs', [JobController::class, 'store'])->middleware('role:employer');
    
    // Applications
    Route::post('/jobs/{id}/apply', [ApplicationController::class, 'store'])->middleware('role:job_seeker');
    Route::get('/my-applications', [ApplicationController::class, 'myApplications'])->middleware('role:job_seeker');
    Route::get('/employer/applications', [ApplicationController::class, 'employerApplications'])->middleware('role:employer');
    
    
    // Admin only
    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/users', [AuthController::class, 'allUsers']);
        Route::get('/admin/settings', fn() => response()->json(['settings' => 'site settings here']));
    });
});



// every one can access to these routes
Route::get('/jobs', [JobController::class, 'index']);



//routes for testing purpose
// Route::post('/profiles', [ProfileController::class, 'store']);
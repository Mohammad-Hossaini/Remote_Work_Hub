<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobController;
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
    Route::get('/user', [AuthController::class, 'me']);

    // Jobs
    // Route::get('/jobs', [JobController::class, 'index']);
    // Route::post('/jobs', [JobController::class, 'store'])->middleware('role:employer');
    // Route::post('/jobs/{id}/apply', [ApplicationController::class, 'store'])->middleware('role:job_seeker');

    // Jobs
    Route::get('/jobs', [JobController::class, 'index']);
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


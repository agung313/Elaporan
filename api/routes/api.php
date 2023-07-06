<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AbsensiController;

Route::controller(AuthController::class)->prefix('auth')->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::post('/logout', 'logout');
    Route::get('/me', 'me');
});

Route::controller(UserController::class)->prefix('user')->group(function () {
    Route::post('/update/{id}', 'update');
    Route::post('/changePassword', 'changePassword');
    Route::get('/profile', 'profile');
    Route::get('/history', 'history');
});

Route::controller(AbsensiController::class)->prefix('absen')->group(function () {
    Route::get('/', 'index');
    Route::post('/store/{id}', 'store');
});
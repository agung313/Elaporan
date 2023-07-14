<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\DocumentController;

//AUTH
Route::controller(AuthController::class)->prefix('auth')->group(function () {
    Route::post('/login', 'login');
    Route::post('/register', 'register');
    Route::post('/logout', 'logout');
    Route::get('/me', 'me');
    Route::get('/tes', 'tes');
});

//USER
Route::controller(UserController::class)->prefix('user')->group(function () {
    Route::post('/changePassword', 'changePassword');
    Route::get('/profile', 'profile');
    Route::get('/history', 'history');
    Route::post('/update/{id}', 'update');
});

//ABSENSI
Route::controller(AbsensiController::class)->prefix('absen')->group(function () {
    Route::get('/', 'index');
    Route::post('/store', 'store');
    Route::post('/test', 'testDaily');
});

//LAPORAN
Route::controller(LaporanController::class)->prefix('laporan')->group(function () {
    Route::get('/', 'index');
    Route::post('/store', 'store');
    Route::post('/upload', 'upload');
});

//DOCUMENT LAPORAN
Route::controller(DocumentController::class)->prefix('document')->group(function () {
    Route::get('/', 'index');
    Route::post('/store', 'store');
    Route::post('/upload', 'upload');
    Route::post('/approve/{id}', 'approve');
});
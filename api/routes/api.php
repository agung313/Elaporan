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
    Route::post('/foto', 'updateFoto');
    Route::post('/ttd', 'updateTtd');
    Route::get('/profile', 'profile');
    Route::get('/history', 'history');
    Route::post('/update', 'update');
    Route::post('/updateAccount/{id}', 'updateAccount');
    Route::get('/setComplete/{id}', 'setComplete');
});

//ABSENSI
Route::controller(AbsensiController::class)->prefix('absen')->group(function () {
    Route::get('/', 'index');
    Route::get('/detailKehadiran', 'detailKehadiran');
    Route::post('/store', 'store');
    Route::post('/test', 'testDaily');
    Route::get('/cekAbsen', 'cekAbsen');
    Route::get('/countNoAcc', 'countNoAcc');
    Route::post('/acceptIzin/{id}', 'acceptIzin');
    Route::post('/absenAdmin', 'absenAdmin');
    Route::post('/approveAdmin/{id}', 'approveAdmin');
    Route::post('/updateLibur', 'updateLibur'); //update libur by admin
    Route::get('/listLibur', 'listLibur'); //list libur by admin
});

//LAPORAN
Route::controller(LaporanController::class)->prefix('laporan')->group(function () {
    Route::get('/', 'index');
    Route::get('/listKegiatan', 'laporan');
    Route::post('/store', 'store');
    Route::post('/upload', 'upload');
    Route::put('/{id}','update');
    Route::delete('/{id}', 'destroy');
});

//DOCUMENT LAPORAN
Route::controller(DocumentController::class)->prefix('document')->group(function () {
    Route::get('/', 'index');
    Route::get('/laporanDiajukan', 'checkLaporanDiajukan');
    Route::post('/store', 'store');
    Route::post('/upload', 'upload');
    Route::post('/approve/{id}', 'approve');
    Route::delete('/{id}', 'destroy');

});
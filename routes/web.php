<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Auth (Breeze)
|--------------------------------------------------------------------------
*/
require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| Public / Vendor / Admin
|--------------------------------------------------------------------------
*/
require __DIR__.'/public.php';
require __DIR__.'/vendor.php';
require __DIR__.'/admin.php';

/*
|--------------------------------------------------------------------------
| Cuenta / Perfil (Breeze default)
|--------------------------------------------------------------------------
*/
Route::get('/dashboard', function () {
    return \Inertia\Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

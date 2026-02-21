<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Public\AddressController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| 1. Autenticación Social (Google)
|--------------------------------------------------------------------------
*/
Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])
    ->name('google.login');

Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

/*
|--------------------------------------------------------------------------
| 2. Autenticación (Sistema Breeze)
|--------------------------------------------------------------------------
*/
require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| 3. Zona Protegida (Requiere Login)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {

    /**
     * DASHBOARD DISTRIBUIDOR
     * Carga 'Pages/Dashboard.jsx' y ahí rediriges por rol
     */
    Route::get('/dashboard', fn () => Inertia::render('Dashboard'))
        ->name('dashboard');

    // Perfil
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');

    // Direcciones
    Route::prefix('profile/address')->name('profile.address.')->group(function () {
        Route::post('/', [AddressController::class, 'store'])->name('store');
        Route::put('/{address}', [AddressController::class, 'update'])->name('update');
        Route::delete('/{address}', [AddressController::class, 'destroy'])->name('destroy');
        Route::patch('/{address}/default', [AddressController::class, 'default'])->name('default');
    });
});

/*
|--------------------------------------------------------------------------
| 4. Rutas Públicas / Externas
|--------------------------------------------------------------------------
*/
require __DIR__.'/public.php';
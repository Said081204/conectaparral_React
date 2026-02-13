<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\GoogleController; // <--- IMPORTANTE: Añade esta línea
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| 1. Autenticación Social (Google)
|--------------------------------------------------------------------------
*/
Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])->name('google.login');
Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

/*
|--------------------------------------------------------------------------
| 2. Autenticación (Sistema Breeze)
|--------------------------------------------------------------------------
*/
require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| 3. Zona Protegida (EL FILTRO DE SEGURIDAD)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Panel de Control
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Rutas del Perfil de Usuario
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| 4. Módulos Externos y Rutas Públicas
|--------------------------------------------------------------------------
*/
require __DIR__.'/public.php'; // Lo que ven los visitantes
require __DIR__.'/vendor.php'; // Funciones de vendedor
require __DIR__.'/admin.php';  // Funciones de admin
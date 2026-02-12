<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| 1. Autenticación (Sistema Breeze)
|--------------------------------------------------------------------------
*/
require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| 2. Zona Protegida (EL FILTRO DE SEGURIDAD)
|--------------------------------------------------------------------------
| Aquí aplicamos 'auth' (que esté logueado) y 'verified' (que el correo sea real).
*/
Route::middleware(['auth', 'verified'])->group(function () {
    
    // Panel de Control - A donde llega el usuario tras registrarse
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Rutas del Perfil de Usuario
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // NOTA: Si quieres que los Vendedores también verifiquen su correo 
    // antes de vender, sus rutas deberían ir dentro de este grupo.
});

/*
|--------------------------------------------------------------------------
| 3. Módulos Externos y Rutas Públicas
|--------------------------------------------------------------------------
*/
require __DIR__.'/public.php'; // Lo que ven los visitantes
require __DIR__.'/vendor.php'; // Funciones de vendedor
require __DIR__.'/admin.php';  // Funciones de admin
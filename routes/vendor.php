<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Vendor\VendorController;
use Inertia\Inertia;

/**
 * Estas rutas ya vienen con:
 * prefix: /vendor
 * name: vendor.
 * middleware: web, auth, role:vendor
 * desde bootstrap/app.php
 */
Route::get('/dashboard', [VendorController::class, 'index'])->name('home');
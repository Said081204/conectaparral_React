<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Vendor (PWA Vendedor)
|--------------------------------------------------------------------------
*/
Route::prefix('vendor')
    ->middleware(['auth', 'verified', 'role:vendor,admin', 'vendor.approved'])
    ->group(function () {
        Route::get('/', fn () => Inertia::render('Vendor/Dashboard'))
            ->name('vendor.dashboard');

        Route::get('/productos', fn () => Inertia::render('Vendor/Products/Index'))
            ->name('vendor.products');

        Route::get('/pedidos', fn () => Inertia::render('Vendor/Orders/Index'))
            ->name('vendor.orders');

        Route::get('/stripe', fn () => Inertia::render('Vendor/Stripe/Index'))
            ->name('vendor.stripe');
    });

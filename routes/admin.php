<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Admin (PWA Admin)
|--------------------------------------------------------------------------
*/
Route::prefix('admin')
    ->middleware(['auth', 'verified', 'role:admin'])
    ->group(function () {
        Route::get('/', fn () => Inertia::render('Admin/Dashboard'))
            ->name('admin.dashboard');

        Route::get('/vendedores', fn () => Inertia::render('Admin/Vendors/Index'))
            ->name('admin.vendors');

        Route::get('/productos', fn () => Inertia::render('Admin/Products/Index'))
            ->name('admin.products');

        Route::get('/ordenes', fn () => Inertia::render('Admin/Orders/Index'))
            ->name('admin.orders');
    });

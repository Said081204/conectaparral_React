<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public (PWA Pública)
|--------------------------------------------------------------------------
*/
Route::get('/', fn () => Inertia::render('Public/Home'))
    ->name('public.home');

Route::get('/productos', fn () => Inertia::render('Public/Products/Index'))
    ->name('public.products');

Route::get('/producto/{slug}', fn ($slug) => Inertia::render('Public/Products/Show', [
    'slug' => $slug,
]))->name('public.product.show');

Route::get('/carrito', fn () => Inertia::render('Public/Cart/Index'))
    ->name('public.cart');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/checkout', fn () => Inertia::render('Public/Checkout/Index'))
        ->name('public.checkout');
});

<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\SellerRequests\SellerRequestController;
use App\Http\Controllers\Admin\Vendors\VendorController;
use App\Http\Controllers\Admin\Products\ProductModerationController;
use App\Http\Controllers\Admin\Orders\OrderController;
use App\Http\Controllers\Admin\Finance\FinanceController;
use App\Http\Controllers\Admin\Settings\SettingsController;
use App\Http\Controllers\Admin\Settings\CategoriesController;
use App\Http\Controllers\Admin\Settings\BannersController;
use App\Http\Controllers\Admin\Settings\BannedWordsController;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
| Prefijo: /admin
| Nombre: admin.
*/

// 1. Dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])->name('home');

// 2. Solicitudes de Vendedor (Seller Requests)
Route::prefix('solicitudes-vendedor')->name('solicitudes.')->group(function () {
    Route::get('/', [SellerRequestController::class, 'index'])->name('index');
    Route::get('/{id}', [SellerRequestController::class, 'show'])->name('show');
});

// 3. Vendedores (Vendors)
Route::prefix('vendedores')->name('vendedores.')->group(function () {
    Route::get('/', [VendorController::class, 'index'])->name('index');
    Route::get('/{id}', [VendorController::class, 'show'])->name('show');
});

// 4. Productos y Moderación
Route::prefix('productos')->name('productos.')->group(function () {
    Route::get('/', [ProductModerationController::class, 'index'])->name('index');
    Route::get('/{id}', [ProductModerationController::class, 'show'])->name('show');
});

// 5. Pedidos (Orders)
Route::prefix('pedidos')->name('pedidos.')->group(function () {
    Route::get('/', [OrderController::class, 'index'])->name('index');
    Route::get('/{id}', [OrderController::class, 'show'])->name('show');
});

// 6. Finanzas
Route::prefix('finanzas')->name('finanzas.')->group(function () {
    Route::get('/', [FinanceController::class, 'index'])->name('index');
});

// 7. Configuración General y Sub-secciones
Route::prefix('configuracion')->name('configuracion.')->group(function () {
    Route::get('/', [SettingsController::class, 'index'])->name('index');
    
    // Sub-rutas específicas de configuración
    Route::resource('categorias', CategoriesController::class);
    Route::resource('banners', BannersController::class);
    Route::resource('palabras-prohibidas', BannedWordsController::class);
});
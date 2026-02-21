<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade; // Importante para las directivas de roles
use Illuminate\Support\Facades\Auth;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Registra cualquier servicio de la aplicación.
     */
    public function register(): void
    {
        //
    }

    /**
     * Arranca cualquier servicio de la aplicación (Bootstrap).
     */
    public function boot(): void
    {
        // Mantenemos tu configuración de rendimiento de Vite
        Vite::prefetch(concurrency: 3);

        /**
         * DIRECTIVAS PERSONALIZADAS DE BLADE
         * Esto te permitirá usar en tus carpetas de vistas: 
         * @admin ... @endadmin o @vendor ... @endvendor
         */

        // Directiva para el Admin
        Blade::if('admin', function () {
            return Auth::check() && Auth::user()->role === 'admin';
        });

        // Directiva para el Vendedor
        Blade::if('vendor', function () {
            return Auth::check() && Auth::user()->role === 'vendor';
        });

        // Directiva para el Cliente (Customer)
        Blade::if('customer', function () {
            return Auth::check() && Auth::user()->role === 'customer';
        });
    }
}
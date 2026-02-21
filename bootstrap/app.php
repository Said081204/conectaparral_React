<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

// 1. CONFIGURACIÓN BASE:
return Application::configure(basePath: dirname(__DIR__))

    // 2. ENRUTAMIENTO (Routing):
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',

        // --- CONEXIÓN DE RUTAS ADMINISTRATIVAS / VENDOR ---
        then: function () {

            // ADMIN
            Route::middleware(['web', 'auth', 'verified', 'role:admin'])
                ->prefix('admin')
                ->name('admin.')
                ->group(__DIR__.'/../routes/admin.php');

            // VENDOR (SaaS)
            Route::middleware(['web', 'auth', 'verified', 'role:vendor'])
                ->prefix('vendor')
                ->name('vendor.')
                ->group(__DIR__.'/../routes/vendor.php');
        },
    )

    // 3. CAPA DE SEGURIDAD Y DATOS (Middleware):
    ->withMiddleware(function (Middleware $middleware): void {

        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
        ]);

        $middleware->redirectTo(
            guests: '/login',
            users: '/dashboard'
        );

        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
    })

    // 4. MANEJO DE ERRORES:
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })

    // 5. LANZAMIENTO:
    ->create();
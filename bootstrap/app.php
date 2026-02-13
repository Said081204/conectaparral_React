<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

// 1. CONFIGURACIÓN BASE:
return Application::configure(basePath: dirname(__DIR__))

    // 2. ENRUTAMIENTO (Routing):
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )

    // 3. CAPA DE SEGURIDAD Y DATOS (Middleware):
    ->withMiddleware(function (Middleware $middleware): void {
        
        // --- AQUÍ ESTÁ LA SOLUCIÓN ---
        // Esto le dice a Laravel a dónde mandar a la gente por defecto
        $middleware->redirectTo(
            guests: '/login', // Si no están logueados y entran a algo privado, van al login
            users: '/'        // Si ya están logueados, los manda siempre al INICIO (no al dashboard)
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
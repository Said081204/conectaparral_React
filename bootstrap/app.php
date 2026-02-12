<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

// 1. CONFIGURACIÓN BASE:
// Se define la ruta base del proyecto para que Laravel sepa dónde están todas sus carpetas.
return Application::configure(basePath: dirname(__DIR__))

    // 2. ENRUTAMIENTO (Routing):
    // Aquí se registran los archivos que contienen las URLs de tu Marketplace.
    ->withRouting(
        web: __DIR__.'/../routes/web.php',      // Las rutas que ven los usuarios en el navegador.
        commands: __DIR__.'/../routes/console.php', // Comandos personalizados que corren por terminal.
        health: '/up',                          // Una ruta especial para checar si el servidor está "vivo".
    )

    // 3. CAPA DE SEGURIDAD Y DATOS (Middleware):
    // Aquí defines qué "filtros" deben pasar todas las solicitudes web.
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            // Agrega el puente de datos con React (Inertia).
            \App\Http\Middleware\HandleInertiaRequests::class,
            // Mejora la velocidad cargando assets (JS/CSS) de forma anticipada.
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        // En este espacio es donde podrías registrar tus otros middlewares
        // personalizados como el de 'Role' o 'VendorApproved'.
    })

    // 4. MANEJO DE ERRORES (Exceptions):
    // Aquí es donde podrías personalizar qué pasa cuando algo sale mal 
    // (por ejemplo, mostrar una página 404 personalizada).
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })

    // 5. LANZAMIENTO:
    // Una vez configurado todo lo anterior, se "crea" la instancia de la aplicación.
    ->create();
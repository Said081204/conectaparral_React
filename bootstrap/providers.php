<?php

/**
 * Este archivo devuelve una lista de todos los Proveedores de Servicios (Service Providers)
 * que Laravel debe cargar automáticamente cuando se inicia la aplicación.
 */
return [
    // Aquí se registra el AppServiceProvider, que es el archivo donde pusiste 
    // la configuración de rendimiento (Vite::prefetch) y otras lógicas globales.
    App\Providers\AppServiceProvider::class,
];
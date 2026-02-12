<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Registra cualquier servicio de la aplicación.
     * Este método se usa para unir cosas al contenedor de servicios, 
     * pero por ahora está vacío porque no has necesitado registrar herramientas personalizadas.
     */
    public function register(): void
    {
        //
    }

    /**
     * Arranca cualquier servicio de la aplicación (Bootstrap).
     * Este método se ejecuta justo después de que todos los servicios han sido registrados.
     * Es el lugar ideal para configurar comportamientos globales.
     */
    public function boot(): void
    {
        // CONFIGURACIÓN DE RENDIMIENTO:
        // Aquí estás usando Vite (el encargado de compilar tu JS y CSS) para hacer "prefetch".
        // Lo que hace es descargar en segundo plano los recursos de las páginas que el usuario 
        // podría visitar a continuación (con una capacidad de 3 descargas simultáneas).
        // Esto hace que, cuando el usuario haga clic, la siguiente página cargue instantáneamente.
        Vite::prefetch(concurrency: 3);
    }
}
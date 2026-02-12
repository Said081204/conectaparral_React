<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * Define la plantilla raíz (HTML) que se carga en la primera visita.
     * Por defecto es 'app.blade.php'.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determina la versión actual de los assets (JS, CSS).
     * Sirve para que, si subes cambios, el navegador del usuario se refresque automáticamente.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define las "props" (propiedades) que se comparten por defecto con React.
     * Todo lo que pongas aquí estará disponible en CUALQUIER componente de tu frontend.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            // Mantiene las propiedades compartidas por defecto de Inertia
            ...parent::share($request),

            // COMPARTIR DATOS DE AUTENTICACIÓN:
            // Esto permite que en React puedas usar `usePage().props.auth.user`
            // para saber si hay alguien logueado y obtener su información.
            'auth' => [
                'user' => $request->user(),
            ],
            
            // TIP PRO: Aquí podrías agregar mensajes flash (éxito/error) 
            // para que aparezcan automáticamente en tus componentes.
        ];
    }
}
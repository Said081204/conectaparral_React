<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define las "props" compartidas con React.
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),

            // COMPARTIR DATOS DE AUTENTICACIÓN:
            'auth' => [
                'user' => $request->user() ? [
                    'id'    => $request->user()->id,
                    'name'  => $request->user()->name,
                    'email' => $request->user()->email,
                    'role'  => $request->user()->role, // <--- ESTO ES LO QUE NECESITAMOS
                ] : null,
            ],
            
            // MENSAJES FLASH (Opcional pero muy útil para notificaciones)
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'error'   => fn () => $request->session()->get('error'),
            ],
        ];
    }
}
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureVendorApproved
{
    /**
     * Maneja una solicitud entrante.
     * * Este guardia revisa si el usuario tiene permiso para gestionar una tienda.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // 1. Obtiene al usuario que está intentando entrar
        $user = $request->user();
        
        // 2. Si ni siquiera ha iniciado sesión, detiene todo y lanza error 401 (No autorizado)
        if (!$user) abort(401);

        // 3. Busca el perfil de vendedor asociado a ese usuario
        // Nota: Esto asume que tienes una relación 'vendorProfile' en tu modelo User
        $profile = $user->vendorProfile;

        // 4. EL FILTRO CRÍTICO:
        // Si el usuario no tiene perfil de vendedor O su estado no es 'approved' (aprobado)...
        if (!$profile || $profile->status !== 'approved') {
            // ...detiene la solicitud y lanza un error 403 (Prohibido) con un mensaje personalizado.
            abort(403, 'Tu cuenta de vendedor aún no está aprobada.');
        }

        // 5. Si pasó todas las pruebas, deja que la solicitud siga su camino hacia el controlador
        return $next($request);
    }
}
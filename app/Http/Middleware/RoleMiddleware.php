<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Maneja la solicitud entrante y filtra por jerarquía de usuarios.
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // 1. Obtenemos el objeto del usuario que está intentando acceder a la ruta.
        $user = $request->user();

        // 2. Verificamos si el usuario ha iniciado sesión. 
        // Si no hay usuario (null), detenemos la ejecución con un error 401 (No autenticado).
        if (!$user) abort(401);

        // 3. Verificamos si la cuenta del usuario está marcada como activa.
        // Esto permite banear o suspender usuarios (clientes o vendedores) 
        // de manera inmediata sin borrar sus datos.
        if (!$user->is_active) {
            abort(403, 'Cuenta desactivada.');
        }

        // 4. Comprobamos si el rol del usuario coincide con alguno de los permitidos para esta ruta.
        // El operador "...$roles" permite que pasemos varios roles a la vez (ej: admin y vendor).
        // Si el rol del usuario no está en la lista autorizada, lanzamos un error 403 (Prohibido).
        if (!in_array($user->role, $roles, true)) {
            abort(403, 'No autorizado.');
        }

        // 5. Si el usuario está logueado, activo y tiene el rol correcto,
        // permitimos que la solicitud continúe hacia el controlador.
        return $next($request);
    }
}
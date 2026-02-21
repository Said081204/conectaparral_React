<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Maneja la solicitud entrante y filtra por jerarquía de usuarios.
     * Soporta múltiples roles: 'admin', 'vendor', 'customer'.
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // 1. Obtenemos el objeto del usuario que está intentando acceder.
        $user = $request->user();

        // 2. Verificamos si el usuario ha iniciado sesión. 
        if (!$user) {
            return redirect()->route('login');
        }

        /**
         * 3. Verificamos si la cuenta está activa (Lógica selectiva)
         * - Bloqueamos a Admins y Vendedores si is_active es 0.
         * - Dejamos pasar al Customer aunque is_active sea 0 (según lo acordado).
         */
        if (in_array($user->role, ['admin', 'vendor']) && !$user->is_active) {
            // Si el Admin o Vendedor está desactivado, lo mandamos fuera de las áreas protegidas
            abort(403, 'Tu acceso administrativo en Conecta Parral ha sido desactivado. Contacta al soporte.');
        }

        /**
         * 4. Lógica de Jerarquía y Roles
         * Verifica si el rol del usuario está dentro de los permitidos para la ruta.
         */
        if (!in_array($user->role, $roles, true)) {
            abort(403, 'No tienes permisos para acceder a esta sección.');
        }

        // 5. Si todo está en orden, permitimos el paso.
        return $next($request);
    }
}
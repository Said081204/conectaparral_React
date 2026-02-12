<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Muestra la vista de inicio de sesión.
     */
    public function create(): Response
    {
        // Renderiza el componente 'Auth/Login' usando Inertia
        return Inertia::render('Auth/Login', [
            // Revisa si existe la ruta de "olvidé mi contraseña" para mostrar el enlace
            'canResetPassword' => Route::has('password.request'),
            // Pasa mensajes de estado (ej: "Se ha enviado un correo de recuperación")
            'status' => session('status'),
        ]);
    }

    /**
     * Maneja una solicitud de autenticación entrante (cuando el usuario da clic en Login).
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        // Ejecuta la lógica de autenticación definida en LoginRequest (valida correo y clave)
        $request->authenticate();

        // Regenera la ID de la sesión para prevenir ataques de fijación de sesión
        $request->session()->regenerate();

     // POR ESTO: (Redirige a la raíz donde está tu Home.jsx)
        return redirect()->intended('/');
    }

    /**
     * Destruye una sesión autenticada (Cerrar sesión).
     */
    public function destroy(Request $request): RedirectResponse
    {
        // Cierra la sesión del usuario usando el guardián 'web'
        Auth::guard('web')->logout();

        // Invalida la sesión actual del usuario para que no pueda ser reutilizada
        $request->session()->invalidate();

        // Genera un nuevo token CSRF para prevenir ataques de falsificación de solicitud
        $request->session()->regenerateToken();

        // Redirige al usuario a la página de inicio (raíz)
        return redirect('/');
    }
}
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Envía una nueva notificación de verificación de correo electrónico.
     */
    public function store(Request $request): RedirectResponse
    {
        // 1. Verificamos si el usuario ya está verificado
        if ($request->user()->hasVerifiedEmail()) {
            // ADAPTACIÓN: En lugar de 'dashboard', redirigimos a la raíz '/'
            // que es donde carga tu componente Public/Home.jsx
            return redirect()->intended('/');
        }

        // 2. Si no está verificado, enviamos el correo
        $request->user()->sendEmailVerificationNotification();

        // 3. Regresamos a la pantalla de aviso con el mensaje de éxito
        return back()->with('status', 'verification-link-sent');
    }
}
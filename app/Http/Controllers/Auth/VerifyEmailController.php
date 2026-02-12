<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Marca la dirección de correo electrónico del usuario autenticado como verificada.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        // 1. Si el usuario ya estaba verificado, lo mandamos a la página principal.
        if ($request->user()->hasVerifiedEmail()) {
            // Cambiamos route('dashboard') por '/'
            return redirect()->intended('/'.'?verified=1');
        }

        // 2. Marcamos como verificado en la BD.
        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        // 3. Redirección final tras el éxito de verificación.
        // Ahora el usuario caerá en la raíz de ConectaParral para empezar a ver productos.
        return redirect()->intended('/'.'?verified=1');
    }
}
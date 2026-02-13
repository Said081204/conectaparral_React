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
        // 1. Si el usuario ya hizo clic o ya está verificado
        if ($request->user()->hasVerifiedEmail()) {
            // Forzamos el redireccionamiento a '/' ignorando cualquier memoria de 'intended'
            return redirect('/')->with('verified', true);
        }

        // 2. Marcamos como verificado
        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        // 3. Redirección tras éxito: Directo a Home.jsx
        // Usamos redirect('/') en lugar de redirect()->intended()
        return redirect('/')->with('verified', true);
    }
}
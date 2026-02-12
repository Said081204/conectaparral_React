<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Muestra el aviso de verificación de correo electrónico.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        // 1. Revisa si el usuario autenticado YA verificó su correo.
        return $request->user()->hasVerifiedEmail()
                    // ADAPTACIÓN: Si ya está verificado, lo redirigimos a la raíz '/'
                    // en lugar de mandarlo al dashboard.
                    ? redirect()->intended('/')
                    
                    // Si NO está verificado, le mostramos la pantalla de "Por favor revisa tu correo".
                    : Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }
}
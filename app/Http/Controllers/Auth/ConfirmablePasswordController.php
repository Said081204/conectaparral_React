<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ConfirmablePasswordController extends Controller
{
    /**
     * Muestra la vista de confirmación de contraseña.
     */
    public function show(): Response
    {
        // Renderiza el componente de React 'Auth/ConfirmPassword'
        // Es esa pantalla que solo te pide la contraseña para verificar que eres tú.
        return Inertia::render('Auth/ConfirmPassword');
    }

    /**
     * Confirma la contraseña del usuario.
     */
    public function store(Request $request): RedirectResponse
    {
        if (! Auth::guard('web')->validate([
            'email' => $request->user()->email,
            'password' => $request->password,
        ])) {
            throw ValidationException::withMessages([
                'password' => __('auth.password'),
            ]);
        }

        $request->session()->put('auth.password_confirmed_at', time());

        // CAMBIO AQUÍ: 
        // intended('/') intenta llevarte a donde ibas (ej. a pagar o a editar perfil)
        // y si no hay nada guardado, te manda al Home.
        return redirect()->intended('/');
    }
}
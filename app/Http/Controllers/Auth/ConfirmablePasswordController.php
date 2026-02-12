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
        // Intenta validar la contraseña proporcionada contra el email del usuario logueado
        if (! Auth::guard('web')->validate([
            'email' => $request->user()->email,
            'password' => $request->password,
        ])) {
            // Si la contraseña es incorrecta, lanza una excepción de validación
            // con el mensaje de error configurado en los archivos de idioma (auth.password)
            throw ValidationException::withMessages([
                'password' => __('auth.password'),
            ]);
        }

        // Si la contraseña es correcta, guarda en la sesión el momento exacto (timestamp)
        // en el que se confirmó la contraseña. Esto evita que el sistema vuelva a pedirla 
        // durante un tiempo (por defecto 3 horas).
        $request->session()->put('auth.password_confirmed_at', time());

        // Redirige al usuario a la página a la que intentaba ir originalmente
        // o al dashboard si no había una ruta previa guardada.
        return redirect()->intended(route('dashboard', absolute: false));
    }
}
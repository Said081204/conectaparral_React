<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Muestra la vista para solicitar el enlace de restablecimiento de contraseña.
     */
    public function create(): Response
    {
        // Renderiza el componente de React 'Auth/ForgotPassword'
        return Inertia::render('Auth/ForgotPassword', [
            // Pasa el mensaje de 'status' (por si el correo ya se envió) para mostrarlo al usuario
            'status' => session('status'),
        ]);
    }

    /**
     * Maneja la solicitud de envío del enlace de restablecimiento.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Limpiamos el email de espacios accidentales y lo pasamos a minúsculas antes de validar.
        // Esto evita errores si el usuario escribió " Correo@Ejemplo.com "
        $request->merge([
            'email' => strtolower(trim($request->email)),
        ]);

        // Valida que el campo sea un correo electrónico real y obligatorio
        $request->validate([
            'email' => 'required|email',
        ]);

        // Intentamos enviar el enlace de recuperación a través del sistema de Laravel.
        // Password::sendResetLink se encarga de buscar al usuario y generar el token único.
        $status = Password::sendResetLink(
            $request->only('email')
        );

        // Si el sistema confirma que el enlace se envió con éxito:
        if ($status == Password::RESET_LINK_SENT) {
            // Regresa a la página anterior con un mensaje de éxito (traducido automáticamente)
            return back()->with('status', __($status));
        }

        // Si hubo un error (por ejemplo, el correo no existe en la base de datos),
        // lanza una excepción de validación para mostrar el error en el formulario.
        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
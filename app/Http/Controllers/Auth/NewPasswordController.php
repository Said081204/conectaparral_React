<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class NewPasswordController extends Controller
{
    /**
     * Muestra la vista para restablecer la contraseña.
     */
    public function create(Request $request): Response
    {
        // Renderiza el componente de React 'Auth/ResetPassword'
        return Inertia::render('Auth/ResetPassword', [
            // Pasa el email que viene en la URL para que el usuario no tenga que escribirlo de nuevo
            'email' => $request->email,
            // Pasa el token de seguridad único que valida esta solicitud de cambio
            'token' => $request->route('token'),
        ]);
    }

    /**
     * Maneja la solicitud de la nueva contraseña (el guardado).
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Valida que los datos recibidos sean correctos
        $request->validate([
            'token' => 'required', // El token debe estar presente
            'email' => 'required|email', // El email debe ser válido
            // La contraseña debe ser obligatoria, confirmada (repetida igual) y cumplir las reglas de Laravel
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Aquí intentamos restablecer la contraseña usando el sistema de Password de Laravel.
        // Si tiene éxito, se ejecutará la función anónima (el callback) para actualizar al usuario.
        $status = Password::reset(
            // Toma solo los datos necesarios del request
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                // Actualiza los datos del usuario directamente en el modelo
                $user->forceFill([
                    // Encripta la nueva contraseña antes de guardarla (seguridad vital)
                    'password' => Hash::make($request->password),
                    // Cambia el token de "recordarme" para cerrar sesiones viejas por seguridad
                    'remember_token' => Str::random(60),
                ])->save(); // Guarda los cambios en la base de datos

                // Dispara el evento de que la contraseña fue restablecida
                event(new PasswordReset($user));
            }
        );

        // Si el estado devuelto es que la contraseña se restableció correctamente:
        if ($status == Password::PASSWORD_RESET) {
            // Redirige al login con un mensaje de éxito traducido
            return redirect()->route('login')->with('status', __($status));
        }

        // Si hubo un error (ej: el token expiró), lanza una excepción con el mensaje de error
        throw ValidationException::withMessages([
            'email' => [trans($status)],
        ]);
    }
}
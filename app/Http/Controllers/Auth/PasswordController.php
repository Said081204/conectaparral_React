<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Actualiza la contraseña del usuario.
     */
    public function update(Request $request): RedirectResponse
    {
        // Valida los datos que vienen del formulario de configuración de perfil
        $validated = $request->validate([
            // 'current_password' es una regla especial de Laravel que verifica 
            // que la contraseña escrita coincida con la que el usuario tiene actualmente.
            'current_password' => ['required', 'current_password'],
            
            // La nueva contraseña debe ser obligatoria, cumplir las reglas por defecto 
            // (longitud, números, etc.) y debe coincidir con el campo de confirmación.
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        // Si la validación pasa, accede al usuario autenticado y actualiza su contraseña
        $request->user()->update([
            // Se encripta la nueva contraseña usando el algoritmo Hash antes de guardarla.
            'password' => Hash::make($validated['password']),
        ]);

        // Redirige al usuario de vuelta a la página donde estaba (su perfil)
        return back();
    }
}
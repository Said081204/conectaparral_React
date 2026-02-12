<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Muestra el formulario para editar el perfil del usuario.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Actualiza la información del perfil del usuario.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        // 1. Cargamos los datos validados (name, last_name, email, phone)
        $user = $request->user();
        $user->fill($request->validated());

        // 2. SEGURIDAD DE PEDIDOS: Si cambia el correo, invalidamos la verificación.
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
            
            // Opcional: Podrías disparar el evento de notificación de nuevo aquí
            // $user->sendEmailVerificationNotification();
        }

        // 3. Guardamos todos los datos (incluyendo apellidos y teléfono para las guías)
        $user->save();

        // 4. Redirección inteligente:
        // Si el usuario ya no está verificado, Laravel lo mandará a la pantalla 
        // de "Verify Email" automáticamente en la siguiente petición.
        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Elimina la cuenta del usuario de forma definitiva.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
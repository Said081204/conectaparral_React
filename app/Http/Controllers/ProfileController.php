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
     * SECCIÓN: VISUALIZACIÓN DEL PERFIL
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            // Verifica si el usuario debe confirmar su email
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            
            // Envía mensajes de éxito
            'status' => session('status'),
            
            // 📍 DIRECCIONES (Optimizado)
            // Ordenamos primero por 'is_default' (desc) para que la principal salga al inicio
            // y luego por las más recientes (latest).
            'addresses' => $request->user()->addresses()
                ->orderBy('is_default', 'desc')
                ->latest()
                ->get(),
        ]);
    }

    /**
     * SECCIÓN: ACTUALIZACIÓN DE DATOS PERSONALES
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * SECCIÓN: ELIMINACIÓN DE CUENTA
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
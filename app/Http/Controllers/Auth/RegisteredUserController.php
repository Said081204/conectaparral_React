<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules; 
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Muestra la vista de registro.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Maneja una solicitud de registro entrante.
     */
    public function store(Request $request): RedirectResponse
    {
        // 1. VALIDACIÓN: Ahora incluimos la regla 'unique' para el teléfono y mensajes en español.
        $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            // Agregamos 'unique:users' para que no se repita el celular
            'phone' => 'required|string|max:20|unique:users', 
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [
            // Mensajes personalizados para que el usuario entienda el error
            'email.unique' => 'Este correo electrónico ya está registrado.',
            'phone.unique' => 'Este número de teléfono ya está registrado en ConectaParral.',
            'phone.required' => 'El número de teléfono es obligatorio.',
        ]);

        // 2. CREACIÓN: Guardamos al usuario con rol 'customer' y estado activo.
        $user = User::create([
            'name' => $request->name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => 'customer', 
            'is_active' => true,  
        ]);

        // 3. EVENTO Y LOGIN: 
        event(new Registered($user));
        
        Auth::login($user);

        // 4. REDIRECCIÓN:
        return redirect()->route('verification.notice');
    }
}
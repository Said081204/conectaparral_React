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
        // 1. VALIDACIÓN: Aseguramos que lleguen todos los campos necesarios.
        $request->validate([
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'phone' => 'required|string|max:20',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
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
        // Se dispara el evento que envía el correo de verificación automáticamente.
        event(new Registered($user));
        
        // Iniciamos sesión para que el usuario no tenga que loguearse manualmente.
        Auth::login($user);

        // 4. REDIRECCIÓN ADAPTADA:
        // Cambiamos 'dashboard' por '/' para que el usuario aterrice en la tienda.
        // Si el correo no está verificado, el sistema lo redirigirá 
        // automáticamente a la vista de "VerifyEmail" gracias a los filtros de Laravel.
        return redirect('/'); 
    }
}
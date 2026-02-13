<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Exception;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
            
            $user = User::where('email', $googleUser->email)->first();

            if ($user) {
                // Si ya existe, actualizamos google_id Y nos aseguramos de que esté verificado
                $user->update([
                    'google_id' => $googleUser->id,
                    'email_verified_at' => $user->email_verified_at ?? now(),
                ]);
            } else {
                // Si es nuevo, lo creamos ya verificado
                $user = User::create([
                    'name' => $googleUser->name,
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'password' => null, 
                    'role' => 'customer',
                    'is_active' => true,
                    'email_verified_at' => now(),
                ]);
            }

            Auth::login($user);

            return redirect()->intended('/'); 

        } catch (Exception $e) {
            return redirect('/login')->with('error', 'Error al iniciar sesión con Google.');
        }
    }
}
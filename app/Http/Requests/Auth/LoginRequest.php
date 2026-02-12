<?php

namespace App\Http\Requests\Auth;

use Illuminate\Auth\Events\Lockout;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determina si el usuario tiene permiso para realizar esta solicitud.
     * Al estar en 'true', cualquier visitante puede intentar loguearse.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Define las reglas de validación básicas para el formulario.
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email'], // El correo es obligatorio y debe ser válido.
            'password' => ['required', 'string'],      // La contraseña es obligatoria.
        ];
    }

    /**
     * Intenta autenticar las credenciales del usuario.
     */
    public function authenticate(): void
    {
        // 1. Verifica que el usuario no haya fallado demasiadas veces seguidas.
        $this->ensureIsNotRateLimited();

        // 2. Intenta hacer el login con el email, la contraseña y la opción de "recordarme".
        if (! Auth::attempt($this->only('email', 'password'), $this->boolean('remember'))) {
            // Si falla, suma un "hit" al contador de errores para este usuario/IP.
            RateLimiter::hit($this->throttleKey());

            // Lanza un error de validación diciendo que las credenciales no coinciden.
            throw ValidationException::withMessages([
                'email' => trans('auth.failed'),
            ]);
        }

        // 3. Si el login es exitoso, limpia el contador de intentos fallidos.
        RateLimiter::clear($this->throttleKey());
    }

    /**
     * Asegura que no se hayan superado el límite de intentos (anti-hackeos).
     */
    public function ensureIsNotRateLimited(): void
    {
        // Si no ha superado el límite de 5 intentos, lo deja continuar.
        if (! RateLimiter::tooManyAttempts($this->throttleKey(), 5)) {
            return;
        }

        // Si superó los 5 intentos, dispara un evento de "Bloqueo" (Lockout).
        event(new Lockout($this));

        // Calcula cuántos segundos debe esperar el usuario antes de intentar de nuevo.
        $seconds = RateLimiter::availableIn($this->throttleKey());

        // Lanza un error avisando que la cuenta está temporalmente bloqueada por seguridad.
        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Genera una "llave" única para identificar quién está intentando entrar.
     * Combina el email con la dirección IP para que el bloqueo sea específico.
     */
    public function throttleKey(): string
    {
        return Str::transliterate(Str::lower($this->string('email')).'|'.$this->ip());
    }
}
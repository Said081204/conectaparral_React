<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * La contraseña actual utilizada por la fábrica.
     * * Este campo almacena la contraseña encriptada para no tener que 
     * generarla (encriptarla) cada vez que creas un usuario nuevo.
     */
    protected static ?string $password;

    /**
     * Define el estado predeterminado del modelo.
     * * Aquí especificas qué datos "falsos" debe tener un usuario por defecto.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(), // Genera un nombre aleatorio
            'email' => fake()->unique()->safeEmail(), // Genera un email único y seguro
            'email_verified_at' => now(), // Marca el email como verificado hoy mismo
            'password' => static::$password ??= Hash::make('password'), // Usa 'password' por defecto
            'remember_token' => Str::random(10), // Genera un token aleatorio de 10 letras
        ];
    }

    /**
     * Indica que la dirección de correo del modelo no debe estar verificada.
     * * Este método es un "estado" especial para crear usuarios que aún 
     * no han confirmado su cuenta en ConectaParral.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
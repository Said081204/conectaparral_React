<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements MustVerifyEmail, CanResetPasswordContract
{
    /*
    |--------------------------------------------------------------------------
    | Rasgos y Capacidades (Traits)
    |--------------------------------------------------------------------------
    | HasFactory: Permite crear usuarios de prueba rápidamente.
    | Notifiable: Permite enviar correos o notificaciones al usuario.
    | CanResetPassword: Habilitar la funcionalidad de recuperar contraseña.
    |
    */
    use HasFactory, Notifiable, CanResetPassword;

    /*
    |--------------------------------------------------------------------------
    | Atributos Asignables (Fillable)
    |--------------------------------------------------------------------------
    | Define qué campos puede guardar el usuario desde los formularios de la web.
    |
    | Estos campos son los que Laravel permite guardar masivamente (User::create).
    | Es vital incluir last_name, phone, role e is_active para que el registro funcione.
    |
    */
    protected $fillable = [
        'name',
        'last_name', // Apellidos del usuario
        'email',
        'phone',     // Teléfono celular (vital para contacto en el marketplace)
        'password',
        'role',      // Define si es admin, vendor o customer
        'is_active', // Permite activar o desactivar la cuenta
    ];

    /*
    |--------------------------------------------------------------------------
    | Atributos Ocultos (Hidden)
    |--------------------------------------------------------------------------
    | Datos sensibles que nunca deben enviarse en las respuestas de la API.
    |
    | Por seguridad, cuando conviertas un usuario a JSON (para React/Vue), 
    | nunca se enviará la contraseña ni el token de sesión.
    |
    */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /*
    |--------------------------------------------------------------------------
    | Conversión de Tipos (Casts)
    |--------------------------------------------------------------------------
    | Define cómo se tratan los datos al entrar o salir de la base de datos.
    |
    */
    protected function casts(): array
    {
        return [
            // Convierte la fecha de verificación en un objeto de tiempo de Carbon
            'email_verified_at' => 'datetime',
            // Indica que la contraseña siempre debe guardarse encriptada
            'password' => 'hashed',
            // Asegura que is_active siempre sea tratado como verdadero o falso (bool)
            'is_active' => 'boolean',
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Relaciones entre Modelos
    |--------------------------------------------------------------------------
    | Define cómo se conecta el usuario con otras tablas del Marketplace.
    |
    */

    /**
     * Relación uno a uno con el perfil de vendedor.
     * Si el usuario es vendedor, aquí se guarda la info de su tienda.
     */
    public function vendorProfile()
    {
        return $this->hasOne(VendorProfile::class);
    }

    /*
    |--------------------------------------------------------------------------
    | Métodos de Ayuda (Helpers) de Rol
    |--------------------------------------------------------------------------
    | Permiten hacer preguntas rápidas: if($user->isAdmin())...
    |
    */

    /** Verifica si el usuario es administrador */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /** Verifica si el usuario es un vendedor */
    public function isVendor(): bool
    {
        return $this->role === 'vendor';
    }

    /** Verifica si el usuario es un cliente regular */
    public function isCustomer(): bool
    {
        return $this->role === 'customer';
    }
}
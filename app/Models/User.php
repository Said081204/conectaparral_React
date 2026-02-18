<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * IMPORTACIONES PARA PERSONALIZAR CORREOS
 */
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class User extends Authenticatable implements MustVerifyEmail, CanResetPasswordContract
{
    use HasFactory, Notifiable, CanResetPassword;

    protected $fillable = [
        'name',
        'last_name',
        'email',
        'phone',
        'password',
        'role',
        'is_active',
        'google_id',
        'email_verified_at'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | RELACIONES
    |--------------------------------------------------------------------------
    */

    /**
     * Relación con el perfil de vendedor.
     */
    public function vendorProfile()
    {
        return $this->hasOne(VendorProfile::class);
    }

    /**
     * NUEVO: Relación con las direcciones de envío.
     * Esto es lo que permite que el sistema sepa qué cuenta está registrando la dirección.
     */
    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    /*
    |--------------------------------------------------------------------------
    | HELPERS DE ROL
    |--------------------------------------------------------------------------
    */

    public function isAdmin(): bool { return $this->role === 'admin'; }
    public function isVendor(): bool { return $this->role === 'vendor'; }
    public function isCustomer(): bool { return $this->role === 'customer'; }

    /*
    |--------------------------------------------------------------------------
    | PERSONALIZACIÓN DE NOTIFICACIONES (CORREOS)
    |--------------------------------------------------------------------------
    */

    public function sendEmailVerificationNotification()
    {
        $this->notify(new class extends VerifyEmail {
            public function toMail($notifiable)
            {
                return (new MailMessage)
                    ->subject('¡Bienvenido! Confirma tu correo en ConectaParral')
                    ->greeting('¡Hola, qué gusto saludarte!')
                    ->line('Gracias por registrarte en ConectaParral. Para activar tu cuenta y comenzar a explorar, por favor confirma tu dirección de correo electrónico.')
                    ->action('Verificar mi cuenta', $this->verificationUrl($notifiable))
                    ->line('Si no creaste esta cuenta, simplemente ignora este mensaje.')
                    ->salutation('Atentamente, El equipo de ConectaParral');
            }
        });
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new class($token) extends ResetPassword {
            public function toMail($notifiable)
            {
                return (new MailMessage)
                    ->subject('Recuperar Contraseña - ConectaParral')
                    ->greeting('¡Hola!')
                    ->line('Recibimos una solicitud para restablecer la contraseña de tu cuenta.')
                    ->action('Cambiar contraseña', url(route('password.reset', [
                        'token' => $this->token,
                        'email' => $notifiable->getEmailForPasswordReset(),
                    ], false)))
                    ->line('Este enlace expirará en 60 minutos.')
                    ->line('Si no solicitaste este cambio, no es necesario realizar ninguna acción.')
                    ->salutation('Saludos, ConectaParral');
            }
        });
    }
}
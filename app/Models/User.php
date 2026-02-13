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
 * VerifyEmail: La lógica original de verificación.
 * ResetPassword: La lógica original de recuperación de contraseña.
 * MailMessage: Herramienta para construir el diseño del correo (botones, líneas, saludos).
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

    /**
     * Relación con el perfil de vendedor.
     */
    public function vendorProfile()
    {
        return $this->hasOne(VendorProfile::class);
    }

    /**
     * Helpers para verificar roles rápidamente.
     */
    public function isAdmin(): bool { return $this->role === 'admin'; }
    public function isVendor(): bool { return $this->role === 'vendor'; }
    public function isCustomer(): bool { return $this->role === 'customer'; }

    /*
    |--------------------------------------------------------------------------
    | PERSONALIZACIÓN DE NOTIFICACIONES (CORREOS)
    |--------------------------------------------------------------------------
    | Estos métodos sobrescriben los que Laravel trae por defecto. 
    | Nos permiten cambiar el idioma inglés a español y ajustar los textos.
    */

    /**
     * Personalización del correo de Verificación de Email.
     * Se activa automáticamente cuando un usuario se registra.
     */
    public function sendEmailVerificationNotification()
    {
        // Creamos una "clase anónima" que extiende de la original para cambiar solo el mensaje
        $this->notify(new class extends VerifyEmail {
            public function toMail($notifiable)
            {
                return (new MailMessage)
                    ->subject('¡Bienvenido! Confirma tu correo en ConectaParral') // Título del correo
                    ->greeting('¡Hola, qué gusto saludarte!') // Saludo inicial
                    ->line('Gracias por registrarte en ConectaParral. Para activar tu cuenta y comenzar a explorar, por favor confirma tu dirección de correo electrónico.')
                    ->action('Verificar mi cuenta', $this->verificationUrl($notifiable)) // Texto del botón y URL generada
                    ->line('Si no creaste esta cuenta, simplemente ignora este mensaje.')
                    ->salutation('Atentamente, El equipo de ConectaParral'); // Despedida
            }
        });
    }

    /**
     * Personalización del correo de Restablecimiento de Contraseña.
     * Se activa cuando el usuario olvida su clave y pide el enlace de recuperación.
     */
    public function sendPasswordResetNotification($token)
    {
        // Pasamos el $token necesario para que el enlace sea válido y seguro
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
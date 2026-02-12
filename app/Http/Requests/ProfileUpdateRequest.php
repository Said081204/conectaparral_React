<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Define si el usuario está autorizado a realizar esta solicitud.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de validación para la actualización del perfil.
     */
    public function rules(): array
    {
        return [
            // Nombre del usuario
            'name' => ['required', 'string', 'max:255'],

            // APELLIDO: Obligatorio para generar etiquetas de envío correctas.
            'last_name' => ['required', 'string', 'max:255'],

            // EMAIL: Si el usuario lo cambia, el ProfileController lo marcará 
            // como NO verificado automáticamente.
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                // Evita el error de "email ya tomado" al guardar tus propios datos
                Rule::unique(User::class)->ignore($this->user()->id),
            ],

            // TELÉFONO: Indispensable para que la paquetería o el vendedor 
            // contacten al cliente en Parral.
            'phone' => ['required', 'string', 'max:20'],
        ];
    }
}
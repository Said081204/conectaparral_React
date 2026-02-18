<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    // Campos que se pueden llenar masivamente
    protected $fillable = [
        'user_id',
        'alias',
        'name',
        'phone',
        'cp',
        'city',
        'state',
        'colonia',
        'address',
        'between_streets',
        'references',
        'is_default',
    ];

    /**
     * Casts de atributos.
     * Esto asegura que 'is_default' siempre se trate como un booleano (true/false)
     * y no como un número (0/1), lo cual facilita el manejo en React.
     */
    protected $casts = [
        'is_default' => 'boolean',
    ];

    /**
     * Relación inversa: Una dirección pertenece a un usuario.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Opcional: Scope para obtener la dirección principal rápidamente.
     * Uso: $direccionPrincipal = Address::where('user_id', $id)->default()->first();
     */
    public function scopeDefault($query)
    {
        return $query->where('is_default', true);
    }
}
<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    /**
     * Muestra la vista principal de configuración con los ajustes globales.
     * Renderiza: Pages/Admin/Configuracion/Index.jsx
     */
    public function index()
    {
        return Inertia::render('Admin/Configuracion/Index', [
            'activeTab' => 'general',
            'settings' => [
                'site_name' => 'ConectaParral',
                'contact_email' => 'soporte@conectaparral.com',
                'maintenance_mode' => false,
                'commission_rate' => 15, // Porcentaje de comisión global
                'min_payout' => 500, // Pago mínimo a vendedores
            ]
        ]);
    }

    /**
     * Actualiza los ajustes globales de la plataforma.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'required|string|max:100',
            'contact_email' => 'required|email',
            'commission_rate' => 'required|numeric|min:0|max:100',
            'maintenance_mode' => 'required|boolean',
        ]);

        // Aquí guardarías en una tabla 'settings' o en el archivo .env
        // Setting::updateOrCreate(['key' => 'site_name'], ['value' => $validated['site_name']]);

        return back()->with('success', 'Configuración general actualizada correctamente.');
    }
}
<?php

namespace App\Http\Controllers\Admin\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductAlertsController extends Controller
{
    /**
     * Muestra el historial de alertas y reportes de productos.
     * Renderiza: Pages/Admin/Productos/Index.jsx (Pestaña de Alertas)
     */
    public function index()
    {
        return Inertia::render('Admin/Productos/Index', [
            'activeTab' => 'alertas',
            'alertas' => [
                [
                    'id' => 1,
                    'producto' => 'Cuchillo de Caza',
                    'vendedor' => 'Artesanías Parral',
                    'tipo' => 'palabra_prohibida',
                    'mensaje' => 'Contiene términos no permitidos en la descripción.',
                    'severidad' => 'alta',
                    'fecha' => '2024-05-22'
                ],
                [
                    'id' => 2,
                    'producto' => 'Salsa Picante Extra',
                    'vendedor' => 'Sabores Regionales',
                    'tipo' => 'imagen_calidad',
                    'mensaje' => 'La imagen principal está borrosa o es muy pequeña.',
                    'severidad' => 'media',
                    'fecha' => '2024-05-23'
                ]
            ]
        ]);
    }

    /**
     * Crea una nueva alerta manual para un vendedor sobre un producto específico.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'tipo' => 'required|string',
            'mensaje' => 'required|string|max:500',
            'severidad' => 'required|in:baja,media,alta'
        ]);

        // Lógica para guardar la alerta y enviar notificación (Email/DB) al vendedor
        
        return back()->with('success', 'Alerta enviada al vendedor correctamente.');
    }

    /**
     * Marca una alerta como resuelta una vez que el vendedor corrige el producto.
     */
    public function resolve($id)
    {
        // Lógica para marcar como resuelto
        return back()->with('success', 'La incidencia ha sido marcada como resuelta.');
    }
}
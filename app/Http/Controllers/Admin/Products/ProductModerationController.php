<?php

namespace App\Http\Controllers\Admin\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductModerationController extends Controller
{
    /**
     * Lista los productos que requieren revisión.
     * Renderiza: Pages/Admin/Productos/Index.jsx
     */
    public function index()
    {
        return Inertia::render('Admin/Productos/Index', [
            'activeTab' => 'moderacion',
            'productos' => [
                [
                    'id' => 101,
                    'nombre' => 'Botas de Piel Artesanales',
                    'vendedor' => 'Calzado Parral',
                    'precio' => 1450.00,
                    'status' => 'revision_pendiente',
                    'imagen_principal' => 'https://via.placeholder.com/150',
                    'fecha_subida' => '2024-05-24'
                ],
                [
                    'id' => 102,
                    'nombre' => 'Miel Orgánica 1L',
                    'vendedor' => 'Apicultura Regional',
                    'precio' => 220.00,
                    'status' => 'revision_pendiente',
                    'imagen_principal' => 'https://via.placeholder.com/150',
                    'fecha_subida' => '2024-05-25'
                ]
            ]
        ]);
    }

    /**
     * Muestra todo el detalle para aprobar o rechazar.
     * Renderiza: Pages/Admin/Productos/Show.jsx
     */
    public function show($id)
    {
        return Inertia::render('Admin/Productos/Show', [
            'producto' => [
                'id' => $id,
                'nombre' => 'Botas de Piel Artesanales',
                'descripcion' => 'Botas hechas a mano con piel de alta calidad en el centro de Parral.',
                'imagenes' => [
                    ['id' => 1, 'url' => 'https://via.placeholder.com/600x400'],
                    ['id' => 2, 'url' => 'https://via.placeholder.com/600x400'],
                ],
                'stock' => 15,
                'categoria' => 'Calzado',
                'vendedor_info' => [
                    'nombre' => 'Calzado Parral',
                    'reputacion' => 'Excelente'
                ]
            ]
        ]);
    }

    /**
     * Cambia el estado del producto (Aprobado / Rechazado / Cambios Solicitados).
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:aprobado,rechazado,cambios_solicitados',
            'motivo' => 'required_if:status,rechazado,cambios_solicitados|string|max:500'
        ]);

        // Lógica: Product::find($id)->update(['status' => $request->status]);
        
        return redirect()->route('admin.productos.index')
            ->with('success', 'El estado del producto ha sido actualizado.');
    }
}
<?php

namespace App\Http\Controllers\Admin\Orders;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Lista todos los pedidos del marketplace.
     * Renderiza: Pages/Admin/Pedidos/Index.jsx
     */
    public function index()
    {
        return Inertia::render('Admin/Pedidos/Index', [
            'pedidos' => [
                [
                    'id' => 'ORD-1024',
                    'cliente' => 'Juan Pérez',
                    'vendedor' => 'Artesanías Parral',
                    'total' => 1250.00,
                    'estado' => 'pagado', // pagado, enviado, entregado, cancelado
                    'fecha' => '2024-05-20',
                ],
                [
                    'id' => 'ORD-1025',
                    'cliente' => 'María García',
                    'vendedor' => 'Dulces Regionales',
                    'total' => 450.50,
                    'estado' => 'enviado',
                    'fecha' => '2024-05-21',
                ],
            ],
            'stats' => [
                'pendientes_envio' => 5,
                'en_camino' => 3,
                'completados_hoy' => 10
            ]
        ]);
    }

    /**
     * Muestra el detalle de un pedido, artículos e incidencias.
     * Renderiza: Pages/Admin/Pedidos/Show.jsx
     */
    public function show($id)
    {
        return Inertia::render('Admin/Pedidos/Show', [
            'pedido' => [
                'id' => $id,
                'items' => [
                    ['producto' => 'Silla de Madera', 'cantidad' => 1, 'precio' => 1200],
                ],
                'historial' => [
                    ['fecha' => '2024-05-20', 'evento' => 'Pedido Pagado'],
                    ['fecha' => '2024-05-21', 'evento' => 'Guía generada por vendedor'],
                ],
                'guia_rastreo' => 'MX-987654321',
                'metodo_pago' => 'Tarjeta de Crédito'
            ]
        ]);
    }

    /**
     * Actualiza el estado del pedido (ej: forzar cancelación o marcar entrega).
     */
    public function update(Request $request, $id)
    {
        $request->validate(['estado' => 'required|string']);
        
        // Lógica para actualizar estado y notificar al cliente
        
        return back()->with('success', 'Estado del pedido actualizado.');
    }
}
<?php

namespace App\Http\Controllers\Admin\Finance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinanceController extends Controller
{
    /**
     * Muestra el panel financiero con resumen de comisiones y pagos.
     * Renderiza: Pages/Admin/Finanzas/Index.jsx
     */
    public function index()
    {
        return Inertia::render('Admin/Finanzas/Index', [
            // Resumen de alto nivel para TarjetasKPIs
            'resumen' => [
                'total_recaudado' => 45000.00,
                'comisiones_plataforma' => 6750.00,
                'pagos_pendientes_vendedores' => 12400.00,
                'liquidaciones_mes' => 5,
            ],
            
            // Datos para la tabla de liquidaciones
            'liquidaciones' => [
                [
                    'id' => 1,
                    'vendedor' => 'Artesanías Parral',
                    'monto_bruto' => 5000,
                    'comision' => 750,
                    'monto_neto' => 4250,
                    'estado' => 'completado',
                    'fecha' => '2024-05-15'
                ],
                [
                    'id' => 2,
                    'vendedor' => 'Muebles El Reloj',
                    'monto_bruto' => 3000,
                    'comision' => 450,
                    'monto_neto' => 2550,
                    'estado' => 'pendiente',
                    'fecha' => '2024-05-18'
                ],
            ]
        ]);
    }

    /**
     * Procesa un pago manual o registra una transferencia al vendedor.
     */
    public function procesarPago(Request $request, $vendedorId)
    {
        $request->validate([
            'monto' => 'required|numeric|min:1',
            'referencia' => 'required|string',
        ]);

        // Lógica para registrar la transacción en la BD
        
        return back()->with('success', 'El pago ha sido registrado correctamente.');
    }
}
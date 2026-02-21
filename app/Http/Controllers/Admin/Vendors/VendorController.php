<?php

namespace App\Http\Controllers\Admin\Vendors;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorController extends Controller
{
    /**
     * Lista todos los vendedores activos y suspendidos.
     * Renderiza: Pages/Admin/Vendedores/Index.jsx
     */
    public function index()
    {
        return Inertia::render('Admin/Vendedores/Index', [
            'vendedores' => [
                [
                    'id' => 1,
                    'nombre_negocio' => 'Muebles El Reloj',
                    'propietario' => 'Roberto Gómez',
                    'categoria' => 'Hogar',
                    'total_productos' => 24,
                    'ventas_mes' => 15,
                    'status' => 'activo', // activo, suspendido
                    'puntuacion' => 4.8
                ],
                [
                    'id' => 2,
                    'nombre_negocio' => 'Taller de Cantera Parral',
                    'propietario' => 'Elena Torres',
                    'categoria' => 'Artesanías',
                    'total_productos' => 10,
                    'ventas_mes' => 5,
                    'status' => 'activo',
                    'puntuacion' => 4.5
                ]
            ],
            'stats' => [
                'total_vendedores' => 45,
                'nuevos_este_mes' => 3,
                'vendedores_top' => 5
            ]
        ]);
    }

    /**
     * Muestra el perfil completo, historial y métricas de un vendedor.
     * Renderiza: Pages/Admin/Vendedores/Show.jsx
     */
    public function show($id)
    {
        return Inertia::render('Admin/Vendedores/Show', [
            'vendedor' => [
                'id' => $id,
                'nombre_negocio' => 'Muebles El Reloj',
                'rfc' => 'GORB800101H12',
                'email' => 'roberto@mueblesreloj.com',
                'telefono' => '627-123-4567',
                'direccion' => 'Av. Independencia #123, Centro, Parral',
                'fecha_registro' => '2023-10-15',
                'resumen_financiero' => [
                    'saldo_pendiente' => 1500.00,
                    'total_pagado' => 25000.00
                ]
            ]
        ]);
    }

    /**
     * Permite suspender o reactivar la cuenta de un vendedor.
     */
    public function toggleStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required|in:activo,suspendido']);
        
        // Lógica: Vendor::find($id)->update(['status' => $request->status]);
        
        return back()->with('success', 'El estado del vendedor ha sido actualizado.');
    }
}
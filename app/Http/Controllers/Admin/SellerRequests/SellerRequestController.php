<?php

namespace App\Http\Controllers\Admin\SellerRequests;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SellerRequestController extends Controller
{
    /**
     * Muestra la lista de solicitudes de nuevos vendedores.
     * Renderiza: Pages/Admin/SolicitudesVendedor/Index.jsx
     */
    public function index()
    {
        return Inertia::render('Admin/SolicitudesVendedor/Index', [
            // Aquí puedes pasar datos reales desde la BD más adelante
            'filters' => request()->all('search', 'status'),
        ]);
    }

    /**
     * Muestra el detalle de una solicitud en particular para su revisión.
     * Renderiza: Pages/Admin/SolicitudesVendedor/Show.jsx
     */
    public function show($id)
    {
        return Inertia::render('Admin/SolicitudesVendedor/Show', [
            'id' => $id,
            // Ejemplo de datos que recibirá el componente Show.jsx
            'solicitud' => [
                'id' => $id,
                'negocio' => 'Nombre del Negocio Ejemplo',
                'solicitante' => 'Nombre del Usuario',
                'status' => 'pendiente'
            ]
        ]);
    }

    /**
     * Lógica para aprobar o rechazar (puedes implementarla después)
     */
    public function update(Request $request, $id)
    {
        // Aquí irá la lógica de validar, crear el perfil de vendedor y notificar por correo.
    }
}
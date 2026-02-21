<?php

namespace App\Http\Controllers\Admin; // Ajustado a tu estructura de carpetas
namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BannersController extends Controller
{
    /**
     * Muestra la gestión de banners.
     * Renderiza: Pages/Admin/Configuracion/Index.jsx
     */
    public function index()
    {
        return Inertia::render('Admin/Configuracion/Index', [
            'activeTab' => 'banners',
            'banners' => [
                [
                    'id' => 1, 
                    'imagen' => 'https://via.placeholder.com/1200x400', 
                    'titulo' => 'Feria de la Manzana', 
                    'link' => '/eventos',
                    'activo' => true
                ],
                [
                    'id' => 2, 
                    'imagen' => 'https://via.placeholder.com/1200x400', 
                    'titulo' => 'Artesanías Regionales', 
                    'link' => '/categorias/artesania',
                    'activo' => false
                ],
            ]
        ]);
    }

    /**
     * Sube y guarda un nuevo banner.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:100',
            'imagen' => 'required|image|mimes:jpg,jpeg,png|max:2048', // Máximo 2MB
            'link' => 'nullable|url',
        ]);

        // Lógica de guardado de archivo (File Storage) irá aquí
        
        return back()->with('success', 'Banner subido con éxito.');
    }

    /**
     * Activa o desactiva un banner sin eliminarlo.
     */
    public function toggleStatus($id)
    {
        // Lógica para cambiar el booleano 'activo'
        return back()->with('success', 'Estado del banner actualizado.');
    }

    /**
     * Elimina el banner y el archivo físico.
     */
    public function destroy($id)
    {
        return back()->with('success', 'Banner eliminado.');
    }
}
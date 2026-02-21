<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriesController extends Controller
{
    /**
     * Muestra el listado de categorías para su gestión.
     * Renderiza: Pages/Admin/Configuracion/Index.jsx
     */
    public function index()
    {
        return Inertia::render('Admin/Configuracion/Index', [
            'activeTab' => 'categorias',
            'categorias' => [
                ['id' => 1, 'nombre' => 'Artesanías', 'slug' => 'artesanias', 'productos_count' => 15, 'activa' => true],
                ['id' => 2, 'nombre' => 'Madera', 'slug' => 'madera', 'productos_count' => 8, 'activa' => true],
                ['id' => 3, 'nombre' => 'Minería', 'slug' => 'mineria', 'productos_count' => 0, 'activa' => false],
            ]
        ]);
    }

    /**
     * Almacena una nueva categoría.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:50|unique:categories,nombre',
            'descripcion' => 'nullable|string|max:255',
            'icono' => 'nullable|string', // Para guardar el nombre de la clase de Lucide o FontAwesome
        ]);

        // Lógica para crear: Category::create($validated);

        return back()->with('success', 'Categoría creada exitosamente.');
    }

    /**
     * Actualiza una categoría existente.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:50|unique:categories,nombre,' . $id,
            'activa' => 'required|boolean',
        ]);

        // Lógica para actualizar
        
        return back()->with('success', 'Categoría actualizada.');
    }

    /**
     * Elimina una categoría (siempre que no tenga productos asociados).
     */
    public function destroy($id)
    {
        // Lógica: if($cat->productos()->count() > 0) return back()->with('error', '...');
        
        return back()->with('success', 'Categoría eliminada.');
    }
}
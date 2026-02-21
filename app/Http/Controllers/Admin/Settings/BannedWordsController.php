<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BannedWordsController extends Controller
{
    /**
     * Muestra la lista de palabras prohibidas y el formulario de gestión.
     * Renderiza: Pages/Admin/Configuracion/Index.jsx (o una sub-vista específica)
     */
    public function index()
    {
        return Inertia::render('Admin/Configuracion/Index', [
            'activeTab' => 'palabras',
            'bannedWords' => [
                ['id' => 1, 'word' => 'ofensa1', 'category' => 'Lenguaje inapropiado'],
                ['id' => 2, 'word' => 'estafa', 'category' => 'Fraude'],
                ['id' => 3, 'word' => 'fake', 'category' => 'Marketing']
            ]
        ]);
    }

    /**
     * Guarda una nueva palabra en la lista negra.
     */
    public function store(Request $request)
    {
        $request->validate([
            'word' => 'required|string|unique:banned_words,word|max:50',
            'category' => 'required|string'
        ]);

        // Aquí irá la lógica para guardar en la base de datos
        // BannedWord::create($request->all());

        return back()->with('success', 'Palabra añadida correctamente.');
    }

    /**
     * Elimina una palabra de la lista.
     */
    public function destroy($id)
    {
        // BannedWord::findOrFail($id)->delete();
        
        return back()->with('success', 'Palabra eliminada de la lista.');
    }
}
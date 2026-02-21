<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    // Mostrar la lista de usuarios en el Dashboard
    public function index()
    {
        return Inertia::render('Admin/Home', [
            'users' => User::all(['id', 'name', 'email', 'role', 'is_active'])
        ]);
    }

    // Actualizar rol o estado (is_active)
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'role' => 'sometimes|string|in:admin,vendedor,cliente',
            'is_active' => 'sometimes|boolean',
        ]);

        $user->update($data);

        return back()->with('message', 'Usuario actualizado con éxito');
    }

    // Métodos para las otras páginas (por ahora solo retornan la vista)
    public function vendedores() { return Inertia::render('Admin/Vendedores'); }
    public function productos() { return Inertia::render('Admin/Productos'); }
    public function reportes() { return Inertia::render('Admin/Reportes'); }
}
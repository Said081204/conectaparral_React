<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Página principal del panel admin (tabla de usuarios + mensaje).
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            // Solo campos necesarios para la tabla (más ligero)
            'users' => User::query()
                ->select(['id', 'name', 'email', 'role', 'is_active', 'created_at'])
                ->orderByDesc('created_at')
                ->get(),

            'status' => session('message') ?? 'Bienvenido al panel de control de Conecta Parral',
        ]);
    }

    /**
     * Actualiza rol o estado (is_active) de un usuario.
     * IMPORTANTE: roles consistentes con tu middleware y redirector:
     * admin | vendor | customer
     */
    public function update(Request $request, User $user)
    {
        $data = $request->validate([
            'role' => 'nullable|string|in:admin,vendor,customer',
            'is_active' => 'nullable|boolean',
        ]);

        // Evita guardar nulls si no vienen campos
        $data = array_filter($data, fn ($v) => !is_null($v));

        $user->update($data);

        return back()->with('message', "Usuario {$user->name} actualizado con éxito.");
    }
}
<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Address;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    /**
     * Guardar nueva dirección
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'alias'           => 'required|string|max:100',
            'name'            => 'required|string|max:255',
            'phone'           => 'required|string|size:10',
            'cp'              => 'required|string|size:5',
            'address'         => 'required|string|max:255',
            'colonia'         => 'required|string|max:100',
            'city'            => 'required|string|max:100',
            'state'           => 'required|string|max:100',
            'between_streets' => 'nullable|string|max:255',
            'references'      => 'nullable|string|max:500',
            'is_default'      => 'boolean',
        ]);

        if ($request->is_default) {
            Address::where('user_id', Auth::id())->update(['is_default' => false]);
        }

        Auth::user()->addresses()->create($validated);

        return back()->with('message', 'Dirección guardada correctamente');
    }

    /**
     * ACTUALIZAR dirección existente (EDITAR)
     */
    public function update(Request $request, Address $address)
    {
        // Seguridad: Verificar que la dirección pertenezca al usuario
        if ($address->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'alias'           => 'required|string|max:100',
            'name'            => 'required|string|max:255',
            'phone'           => 'required|string|size:10',
            'cp'              => 'required|string|size:5',
            'address'         => 'required|string|max:255',
            'colonia'         => 'required|string|max:100',
            'city'            => 'required|string|max:100',
            'state'           => 'required|string|max:100',
            'between_streets' => 'nullable|string|max:255',
            'references'      => 'nullable|string|max:500',
            'is_default'      => 'boolean',
        ]);

        // Si se marca como principal, quitamos el principal a las demás
        if ($request->is_default) {
            Address::where('user_id', Auth::id())
                ->where('id', '!=', $address->id)
                ->update(['is_default' => false]);
        }

        $address->update($validated);

        return back()->with('message', 'Dirección actualizada con éxito');
    }

    /**
     * ELIMINAR dirección
     */
    public function destroy(Address $address)
    {
        if ($address->user_id !== Auth::id()) {
            abort(403);
        }

        $address->delete();

        return back()->with('message', 'Dirección eliminada correctamente');
    }

    /**
     * HACER PRINCIPAL (Favorito rápido)
     */
    public function default(Address $address)
    {
        if ($address->user_id !== Auth::id()) {
            abort(403);
        }

        // Quitamos principal a todas
        Address::where('user_id', Auth::id())->update(['is_default' => false]);
        
        // Ponemos principal a esta
        $address->update(['is_default' => true]);

        return back();
    }
}
import React from 'react';

export default function FiltrosProductos() {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
      <input 
        type="text" 
        placeholder="Buscar por nombre o vendedor..." 
        className="flex-1 bg-slate-50 border-transparent rounded-2xl text-sm focus:ring-amber-500 focus:bg-white transition-all"
      />
      
      <select className="bg-slate-50 border-transparent rounded-2xl text-sm focus:ring-amber-500 text-slate-600 font-medium">
        <option value="">Todas las Categorías</option>
        <option value="madera">Muebles de Madera</option>
        <option value="dulces">Dulces Regionales</option>
        <option value="mineria">Recuerdos de Minería</option>
      </select>

      <select className="bg-slate-50 border-transparent rounded-2xl text-sm focus:ring-amber-500 text-slate-600 font-medium">
        <option value="">Cualquier Estado</option>
        <option value="activo">Activos</option>
        <option value="pendiente">Pendientes de Revisión</option>
        <option value="agotado">Sin Stock</option>
      </select>
    </div>
  );
}
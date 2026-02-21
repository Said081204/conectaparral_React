import React from 'react';

export default function FiltrosVendedores() {
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <input 
        type="text" 
        placeholder="Buscar vendedor o negocio..." 
        className="flex-1 min-w-[200px] text-sm border-slate-200 rounded-xl focus:ring-amber-500 focus:border-amber-500"
      />
      <select className="text-sm border-slate-200 rounded-xl focus:ring-amber-500 focus:border-amber-500">
        <option>Todas las categorías</option>
        <option>Artesanías</option>
        <option>Alimentos</option>
        <option>Madera</option>
      </select>
      <select className="text-sm border-slate-200 rounded-xl focus:ring-amber-500 focus:border-amber-500">
        <option>Estado: Todos</option>
        <option>Activos</option>
        <option>Suspendidos</option>
      </select>
    </div>
  );
}
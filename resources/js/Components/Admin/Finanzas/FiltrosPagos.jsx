import React from 'react';

export default function FiltrosPagos() {
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      <input 
        type="text" 
        placeholder="Buscar vendedor..." 
        className="flex-1 bg-white border-slate-100 rounded-2xl text-sm px-5 focus:ring-amber-500" 
      />
      <select className="bg-white border-slate-100 rounded-2xl text-xs font-bold text-slate-500 px-5">
        <option>Este mes</option>
        <option>Mes pasado</option>
        <option>Año completo</option>
      </select>
      <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest">Filtrar</button>
    </div>
  );
}
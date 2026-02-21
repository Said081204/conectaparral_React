// Components/Admin/SolicitudesVendedor/FiltrosSolicitudes.jsx
import React from "react";
import SearchBar from "../UI/SearchBar";

export default function FiltrosSolicitudes({ filters, onFilterChange }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-white p-4 rounded-[24px] border border-slate-200/60 shadow-sm">
      <div className="w-full md:w-1/2">
        <SearchBar 
          placeholder="Buscar por negocio o responsable..." 
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
        />
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-auto">
        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-2">Estado:</span>
        <select 
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
          className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl focus:ring-amber-500/10 focus:border-amber-500 outline-none p-2.5 transition-all"
        >
          <option value="todos">Todos</option>
          <option value="pendiente">Pendientes</option>
          <option value="revision">En Revisión</option>
          <option value="rechazado">Rechazados</option>
        </select>
      </div>
    </div>
  );
}
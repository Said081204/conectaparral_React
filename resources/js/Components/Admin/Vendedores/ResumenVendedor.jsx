import React from 'react';

export default function ResumenVendedor({ vendedor }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-4 bg-slate-50 rounded-2xl">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Puntuación</p>
        <p className="text-lg font-black text-amber-500">★ {vendedor.puntuacion}</p>
      </div>
      <div className="p-4 bg-slate-50 rounded-2xl">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Miembro desde</p>
        <p className="text-sm font-bold text-slate-700">{vendedor.fecha_registro}</p>
      </div>
      <div className="p-4 bg-slate-50 rounded-2xl">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Categoría</p>
        <p className="text-sm font-bold text-slate-700">{vendedor.categoria}</p>
      </div>
      <div className="p-4 bg-slate-50 rounded-2xl">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Ubicación</p>
        <p className="text-xs font-bold text-slate-700 truncate">Hidalgo del Parral</p>
      </div>
    </div>
  );
}
import React from 'react';

export default function BannersInicioConfig() {
  return (
    <div className="divide-y divide-slate-100">
      <div className="p-6 flex items-center justify-between bg-slate-50/50">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Banners Activos</span>
        <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-amber-600 transition-colors">
          + Añadir Banner
        </button>
      </div>
      
      {[1, 2].map((i) => (
        <div key={i} className="p-4 flex gap-4 items-center group">
          <div className="h-20 w-40 bg-slate-200 rounded-xl overflow-hidden shadow-inner">
            <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs italic">Imagen {i}</div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900">Promoción Temporada {i}</p>
            <p className="text-[10px] text-slate-400 uppercase">Visible hasta: 31 de Marzo</p>
          </div>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 text-xs">Editar</button>
            <button className="p-2 hover:bg-rose-50 rounded-lg text-rose-500 text-xs">Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}
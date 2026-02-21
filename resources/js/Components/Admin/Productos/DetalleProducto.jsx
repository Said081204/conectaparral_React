import React from 'react';

export default function DetalleProducto({ producto }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">SKU / Identificador</label>
          <p className="text-sm font-mono font-bold text-slate-900">{producto.id || 'PRD-AUTO'}</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Inventario (Stock)</label>
          <p className={`text-sm font-bold ${producto.stock < 5 ? 'text-rose-600' : 'text-slate-900'}`}>
            {producto.stock} unidades disponibles
          </p>
        </div>
      </div>

      <div className="p-4 bg-white rounded-2xl border border-slate-100">
        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Clasificación y Tags</label>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-bold border border-amber-200">
            {producto.categoria}
          </span>
          {producto.tags?.map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium border border-slate-200">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
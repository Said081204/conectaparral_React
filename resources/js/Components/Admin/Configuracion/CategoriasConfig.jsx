import React from 'react';

export default function CategoriasConfig() {
  const categorias = ["Artesanías", "Alimentos", "Textiles", "Viveros"];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {categorias.map((cat, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-white border border-slate-200 pl-4 pr-2 py-2 rounded-2xl shadow-sm hover:border-amber-500 transition-colors">
            <span className="text-xs font-bold text-slate-700">{cat}</span>
            <button className="text-slate-300 hover:text-rose-500 ml-2">×</button>
          </div>
        ))}
        <button className="px-4 py-2 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 hover:border-amber-500 hover:text-amber-600 transition-all">
          + NUEVA CATEGORÍA
        </button>
      </div>
    </div>
  );
}
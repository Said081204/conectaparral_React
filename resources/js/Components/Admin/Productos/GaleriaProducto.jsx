import React from 'react';

export default function GaleriaProducto({ imagenes = [] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {imagenes.length > 0 ? imagenes.map((img, idx) => (
        <div key={idx} className="aspect-square rounded-2xl overflow-hidden border border-slate-200 group relative shadow-sm">
          <img 
            src={img} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
            alt={`Vista ${idx + 1}`}
          />
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-[10px] font-black uppercase tracking-tighter bg-slate-900/50 px-2 py-1 rounded">Vista Previa</span>
          </div>
        </div>
      )) : (
        <div className="col-span-full py-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-center">
           <p className="text-sm text-slate-400">No hay imágenes disponibles para este producto.</p>
        </div>
      )}
    </div>
  );
}
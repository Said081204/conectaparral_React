import React from 'react';

export default function DetalleVendedor({ vendedor }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">RFC / Fiscal</h5>
          <p className="text-sm font-mono font-bold text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">{vendedor.rfc}</p>
        </div>
        <div>
          <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Teléfono Oficial</h5>
          <p className="text-sm font-bold text-slate-700 p-2">{vendedor.telefono}</p>
        </div>
      </div>
      <div>
        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Dirección de Operación</h5>
        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl">{vendedor.direccion}</p>
      </div>
    </div>
  );
}
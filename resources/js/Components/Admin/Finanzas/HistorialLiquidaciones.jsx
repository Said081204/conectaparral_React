import React from 'react';

export default function HistorialLiquidaciones() {
  const historial = [
    { fecha: '15 Feb 2024', monto: '45,200', vendedores: 12 },
    { fecha: '01 Feb 2024', monto: '38,150', vendedores: 10 },
    { fecha: '15 Ene 2024', monto: '52,900', vendedores: 15 },
  ];

  return (
    <div className="space-y-4">
      {historial.map((h, i) => (
        <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all cursor-default">
          <div>
            <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">{h.fecha}</p>
            <p className="text-[10px] text-slate-400 font-bold">{h.vendedores} vendedores liquidados</p>
          </div>
          <p className="text-sm font-black text-slate-900">${h.monto}</p>
        </div>
      ))}
    </div>
  );
}
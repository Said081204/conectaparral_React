import React from 'react';

export default function HistorialPagosVendedor({ pagos = [] }) {
  return (
    <div className="space-y-3">
      {pagos.length > 0 ? pagos.map((pago, idx) => (
        <div key={idx} className="flex justify-between items-center p-3 border border-slate-100 rounded-xl">
          <div>
            <p className="text-xs font-bold text-slate-900">Liquidación #{pago.id}</p>
            <p className="text-[10px] text-slate-400">{pago.fecha}</p>
          </div>
          <span className="text-sm font-black text-emerald-600">+${pago.monto}</span>
        </div>
      )) : (
        <p className="text-xs text-slate-400 italic text-center py-4">No hay pagos registrados aún.</p>
      )}
    </div>
  );
}
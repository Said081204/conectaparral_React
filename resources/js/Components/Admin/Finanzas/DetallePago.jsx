import React from 'react';

export default function DetallePago({ pago }) {
  return (
    <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
      <h4 className="text-xs font-black uppercase text-amber-500 mb-6 tracking-widest">Desglose de Pago</h4>
      <div className="space-y-4">
        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-xs text-slate-400 uppercase font-bold">Venta Total</span>
          <span className="text-xs font-black">${pago?.monto || '0.00'}</span>
        </div>
        <div className="flex justify-between border-b border-white/10 pb-2">
          <span className="text-xs text-slate-400 uppercase font-bold">Comisión CP</span>
          <span className="text-xs font-black text-rose-400">-${pago?.monto * 0.1 || '0.00'}</span>
        </div>
        <div className="flex justify-between pt-2">
          <span className="text-sm font-black uppercase">Neto Vendedor</span>
          <span className="text-lg font-black text-emerald-400">${pago?.monto * 0.9 || '0.00'}</span>
        </div>
      </div>
    </div>
  );
}
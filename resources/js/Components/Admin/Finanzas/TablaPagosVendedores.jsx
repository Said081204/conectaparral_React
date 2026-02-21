import React from 'react';

export default function TablaPagosVendedores({ pagos = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100 uppercase text-[10px] font-black text-slate-400 tracking-tighter">
            <th className="px-6 py-4">Vendedor</th>
            <th className="px-6 py-4">Monto Bruto</th>
            <th className="px-6 py-4">Comisión (10%)</th>
            <th className="px-6 py-4">A Pagar</th>
            <th className="px-6 py-4 text-right">Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {pagos.length > 0 ? pagos.map((p, i) => (
            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 text-sm font-bold text-slate-900">{p.vendedor}</td>
              <td className="px-6 py-4 text-xs text-slate-500 font-medium">${p.bruto}</td>
              <td className="px-6 py-4 text-xs text-rose-500 font-bold">-${p.comision}</td>
              <td className="px-6 py-4 text-sm font-black text-emerald-600">${p.neto}</td>
              <td className="px-6 py-4 text-right">
                <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-[10px] font-bold uppercase">Pendiente</span>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" className="px-6 py-12 text-center text-xs text-slate-400 italic">No hay liquidaciones pendientes.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
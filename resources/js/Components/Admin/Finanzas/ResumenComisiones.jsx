import React from 'react';

export default function ResumenComisiones({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100">
        <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Comisiones Totales</p>
        <h3 className="text-3xl font-black text-slate-900 mt-1">${stats?.total_comisiones || '0.00'}</h3>
        <p className="text-[10px] text-slate-400 mt-2">Basado en el 10% de ventas netas</p>
      </div>
      <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Proyección Mensual</p>
        <div className="flex items-end gap-2 mt-2">
          <h3 className="text-3xl font-black text-amber-400">72%</h3>
          <div className="flex-1 h-1.5 bg-slate-700 rounded-full mb-3 overflow-hidden">
            <div className="bg-amber-500 h-full w-[72%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
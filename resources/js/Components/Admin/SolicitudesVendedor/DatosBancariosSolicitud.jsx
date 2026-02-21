import React from 'react';

export default function DatosBancariosSolicitud({ datos }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Institución Bancaria</label>
          <p className="text-sm font-bold text-slate-900">{datos?.banco || 'No especificado'}</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Titular de la Cuenta</label>
          <p className="text-sm font-bold text-slate-900">{datos?.titular || 'No especificado'}</p>
        </div>
      </div>
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
        <label className="text-[10px] uppercase font-bold text-amber-600 block mb-1">CLABE Interbancaria (18 dígitos)</label>
        <p className="text-lg font-mono font-black text-slate-900 tracking-wider">
          {datos?.clabe || '000000000000000000'}
        </p>
      </div>
    </div>
  );
}
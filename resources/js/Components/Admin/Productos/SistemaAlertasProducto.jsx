import React from 'react';

export default function SistemaAlertasProducto({ alertas = [] }) {
  return (
    <div className="space-y-3">
      {alertas.length > 0 ? alertas.map((alerta, i) => (
        <div key={i} className={`flex items-start gap-3 p-4 rounded-2xl border ${
          alerta.tipo === 'critica' ? 'bg-rose-50 border-rose-100 text-rose-700' : 'bg-amber-50 border-amber-100 text-amber-700'
        }`}>
          <div className="mt-0.5">
            {alerta.tipo === 'critica' ? '🚫' : '⚠️'}
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-tight">{alerta.titulo}</p>
            <p className="text-xs opacity-80 leading-relaxed mt-0.5">{alerta.mensaje}</p>
          </div>
        </div>
      )) : (
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
          <span className="text-emerald-600 text-lg">✓</span>
          <p className="text-xs font-bold text-emerald-700">El producto cumple con todos los estándares actuales.</p>
        </div>
      )}
    </div>
  );
}
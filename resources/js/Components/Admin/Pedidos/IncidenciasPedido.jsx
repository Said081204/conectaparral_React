import React from 'react';

export default function IncidenciasPedido({ historial }) {
    return (
        <div className="mt-6">
            <h4 className="text-sm font-bold text-rose-600 mb-4">Rastreo de Actividad</h4>
            <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
                {historial.map((h, i) => (
                    <div key={i} className="relative pl-6">
                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-slate-300" />
                        <p className="text-[10px] font-bold text-slate-400 uppercase">{h.fecha}</p>
                        <p className="text-sm text-slate-700 font-medium">{h.evento}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
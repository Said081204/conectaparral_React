import React from 'react';
import BotonAccion from "@/Components/Admin/UI/BotonAccion";

export default function ConfiguracionComision() {
  return (
    <div className="p-6 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm">
      <h4 className="text-sm font-black text-slate-900 mb-2">Comisión de Plataforma</h4>
      <p className="text-xs text-slate-500 mb-6">Ajusta el porcentaje que retiene ConectaParral por cada venta.</p>
      
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <input 
            type="number" 
            defaultValue="10" 
            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-6 font-black text-slate-900 focus:ring-amber-500"
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-400">%</span>
        </div>
        <BotonAccion variant="primary" className="h-full px-8 rounded-2xl">Guardar</BotonAccion>
      </div>
    </div>
  );
}
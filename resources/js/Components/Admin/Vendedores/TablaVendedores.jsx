import React from 'react';
import BadgeEstado from "@/Components/Admin/UI/BadgeEstado";
import { Link } from "@inertiajs/react";

export default function TablaVendedores({ vendedores }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400">Negocio</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400">Ventas</th>
            <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-400">Estado</th>
            <th className="px-6 py-4 text-right text-[10px] font-bold uppercase text-slate-400">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {vendedores.map((v) => (
            <tr key={v.id} className="group hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{v.nombre_negocio}</span>
                  <span className="text-[11px] text-slate-500">{v.propietario}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm font-black text-slate-700">{v.ventas_mes}</span>
                <span className="text-[10px] text-slate-400 ml-1 uppercase">pedidos</span>
              </td>
              <td className="px-6 py-4">
                <BadgeEstado estado={v.status} />
              </td>
              <td className="px-6 py-4 text-right">
                <Link href={route('admin.vendedores.show', v.id)} className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-200">
                  Gestionar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
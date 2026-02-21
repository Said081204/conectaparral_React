import React from 'react';
import { Link } from '@inertiajs/react';
import BadgeEstado from "@/Components/Admin/UI/BadgeEstado";

export default function TablaModeracionProductos({ productos = [] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100 uppercase text-[10px] font-black text-slate-400 tracking-widest">
            <th className="px-6 py-4">Ítem</th>
            <th className="px-6 py-4">Vendedor</th>
            <th className="px-6 py-4">Precio</th>
            <th className="px-6 py-4 text-center">Estado</th>
            <th className="px-6 py-4 text-right">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {productos.map((p) => (
            <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img src={p.imagen} className="w-10 h-10 rounded-lg object-cover shadow-sm" alt="" />
                  <span className="font-bold text-slate-900 text-sm">{p.nombre}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-amber-700 font-medium">{p.vendedor}</td>
              <td className="px-6 py-4 font-black text-slate-900 text-sm">${p.precio}</td>
              <td className="px-6 py-4 text-center">
                <BadgeEstado estado={p.estado} />
              </td>
              <td className="px-6 py-4 text-right">
                <Link 
                  href={route('admin.productos.show', p.id)}
                  className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-amber-600 transition-all shadow-sm"
                >
                  Moderar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
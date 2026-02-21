import React from 'react';
import BadgeEstado from "@/Components/Admin/UI/BadgeEstado";
import { Link } from "@inertiajs/react";

export default function TablaPedidos({ pedidos }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50">
                        <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500">ID</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500">Vendedor</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500">Cliente</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500">Total</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase text-slate-500">Estado</th>
                        <th className="px-6 py-4 text-right text-[10px] font-bold uppercase text-slate-500">Acción</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {pedidos.map((pedido) => (
                        <tr key={pedido.id} className="hover:bg-slate-50/50">
                            <td className="px-6 py-4 text-sm font-bold">#{pedido.id}</td>
                            <td className="px-6 py-4">
                                <span className="text-sm font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded">
                                    {pedido.vendedor}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600">{pedido.cliente}</td>
                            <td className="px-6 py-4 text-sm font-black">${pedido.total}</td>
                            <td className="px-6 py-4">
                                <BadgeEstado estado={pedido.estado} />
                            </td>
                            <td className="px-6 py-4 text-right">
                                <Link href={route('admin.pedidos.show', pedido.id)} className="text-blue-600 font-bold text-xs uppercase hover:underline">
                                    Detalles
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
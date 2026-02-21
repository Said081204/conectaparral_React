import React from "react";
import AdminLayout from "@/Components/Admin/Layout/AdminLayout";
import SectionHeader from "@/Components/Admin/UI/SectionHeader";
import TableBase from "@/Components/Admin/UI/TableBase";
import BadgeEstado from "@/Components/Admin/UI/BadgeEstado";
import { Link } from "@inertiajs/react";

export default function Index({ pedidos, stats }) {
  const headers = ["ID", "Vendedor", "Cliente", "Total", "Estado", "Fecha", "Acciones"];

  return (
    <AdminLayout title="Control de Pedidos">
      <SectionHeader 
        title="Flujo de Ventas" 
        subtitle="Monitoreo global de transacciones en ConectaParral"
      />

      {/* BLOQUE DE ESTADÍSTICAS RÁPIDAS (Lo que el admin debe saber) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase">Pendientes de Envío</p>
          <h3 className="text-2xl font-black text-amber-600">{stats.pendientes_envio}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase">En Camino</p>
          <h3 className="text-2xl font-black text-blue-600">{stats.en_camino}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase">Completados Hoy</p>
          <h3 className="text-2xl font-black text-emerald-600">{stats.completados_hoy}</h3>
        </div>
      </div>

      <TableBase headers={headers}>
        {pedidos.map((pedido) => (
          <tr key={pedido.id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-sm font-bold text-slate-900">#{pedido.id}</td>
            
            {/* VENDEDOR: El Admin vigila quién está vendiendo */}
            <td className="px-6 py-4">
              <span className="text-sm font-semibold text-amber-700 bg-amber-50 px-2 py-1 rounded-lg">
                {pedido.vendedor}
              </span>
            </td>

            <td className="px-6 py-4 text-sm text-slate-600">{pedido.cliente}</td>
            <td className="px-6 py-4 text-sm font-bold">${pedido.total}</td>
            <td className="px-6 py-4">
              <BadgeEstado estado={pedido.estado} />
            </td>
            <td className="px-6 py-4 text-sm text-slate-500">{pedido.fecha}</td>
            <td className="px-6 py-4 text-right">
              <Link 
                href={`/admin/pedidos/${pedido.id}`}
                className="text-slate-900 hover:text-amber-600 font-bold text-sm"
              >
                Ver Detalle
              </Link>
            </td>
          </tr>
        ))}
      </TableBase>
    </AdminLayout>
  );
}
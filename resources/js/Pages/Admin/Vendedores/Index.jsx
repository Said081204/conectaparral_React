import React from "react";
import AdminLayout from "@/Components/Admin/Layout/AdminLayout";
import SectionHeader from "@/Components/Admin/UI/SectionHeader";
import TableBase from "@/Components/Admin/UI/TableBase";
import BadgeEstado from "@/Components/Admin/UI/BadgeEstado";
import BotonAccion from "@/Components/Admin/UI/BotonAccion";
import { Link } from "@inertiajs/react";

export default function Index({ vendedores, stats }) {
  const headers = ["Negocio", "Categoría", "Ventas Mes", "Puntuación", "Estado", "Acciones"];

  return (
    <AdminLayout title="Directorio de Vendedores">
      <SectionHeader 
        title="Gestión de Vendedores" 
        subtitle="Monitorea y administra las cuentas comerciales de la plataforma"
      >
        <BotonAccion variant="secondary">Exportar Reporte</BotonAccion>
      </SectionHeader>

      {/* MÉTRICAS RÁPIDAS DE VENDEDORES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Total Vendedores</p>
          <h3 className="text-3xl font-black text-slate-900">{stats.total_vendedores}</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Nuevos (Este Mes)</p>
          <h3 className="text-3xl font-black text-blue-600">+{stats.nuevos_este_mes}</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Vendedores Top</p>
          <h3 className="text-3xl font-black text-amber-500">{stats.vendedores_top}</h3>
        </div>
      </div>

      <TableBase headers={headers}>
        {vendedores.map((v) => (
          <tr key={v.id} className="hover:bg-slate-50/50 transition-colors group">
            <td className="px-6 py-4">
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  {v.nombre_negocio}
                </span>
                <span className="text-xs text-slate-500">{v.propietario}</span>
              </div>
            </td>
            <td className="px-6 py-4 text-sm text-slate-600 font-medium">
              {v.categoria}
            </td>
            <td className="px-6 py-4">
              <span className="text-sm font-black text-slate-900">{v.ventas_mes}</span>
              <span className="text-[10px] text-slate-400 ml-1 uppercase">pedidos</span>
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center text-amber-500 font-bold text-sm">
                ★ {v.puntuacion}
              </div>
            </td>
            <td className="px-6 py-4">
              <BadgeEstado estado={v.status} />
            </td>
            <td className="px-6 py-4 text-right">
              <Link 
                href={route('admin.vendedores.show', v.id)}
                className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-600 transition-all"
              >
                Administrar
              </Link>
            </td>
          </tr>
        ))}
      </TableBase>
    </AdminLayout>
  );
}
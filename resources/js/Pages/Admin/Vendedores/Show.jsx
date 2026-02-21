import React from "react";
import AdminLayout from "@/Components/Admin/Layout/AdminLayout";
import SectionHeader from "@/Components/Admin/UI/SectionHeader";
import Card from "@/Components/Admin/UI/Card";
import BadgeEstado from "@/Components/Admin/UI/BadgeEstado";
import BotonAccion from "@/Components/Admin/UI/BotonAccion";
import { useForm } from "@inertiajs/react";

export default function Show({ vendedor }) {
  const { patch, processing } = useForm({
    status: vendedor.status === 'activo' ? 'suspendido' : 'activo'
  });

  const handleStatusChange = () => {
    if (confirm(`¿Estás seguro de querer cambiar el estado de este vendedor?`)) {
      patch(route('admin.vendedores.toggle-status', vendedor.id));
    }
  };

  return (
    <AdminLayout title={`Perfil: ${vendedor.nombre_negocio}`}>
      <SectionHeader 
        title={vendedor.nombre_negocio} 
        subtitle={`Vendedor desde el ${vendedor.fecha_registro}`}
      >
        <BadgeEstado estado={vendedor.status} />
      </SectionHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA: INFORMACIÓN GENERAL */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Información Comercial">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block">Propietario</label>
                <p className="text-sm font-bold text-slate-900">{vendedor.propietario}</p>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block">RFC / Identificación Fiscal</label>
                <p className="text-sm font-mono font-bold text-slate-700">{vendedor.rfc}</p>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block">Email de Contacto</label>
                <p className="text-sm text-blue-600 underline">{vendedor.email}</p>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 block">Teléfono</label>
                <p className="text-sm text-slate-900">{vendedor.telefono}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] uppercase font-bold text-slate-400 block">Dirección Física</label>
                <p className="text-sm text-slate-600">{vendedor.direccion}</p>
              </div>
            </div>
          </Card>

          <Card title="Rendimiento de Ventas">
            <div className="h-40 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl">
               <p className="text-slate-400 text-sm italic">Gráfico de ventas (Próximamente con Chart.js)</p>
            </div>
          </Card>
        </div>

        {/* COLUMNA DERECHA: FINANZAS Y ACCIONES */}
        <div className="space-y-6">
          <Card title="Estado Financiero">
            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                <label className="text-[10px] uppercase font-bold text-emerald-600 block">Total Generado</label>
                <p className="text-2xl font-black text-emerald-700">${vendedor.resumen_financiero.total_pagado}</p>
              </div>
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                <label className="text-[10px] uppercase font-bold text-amber-600 block">Saldo Pendiente</label>
                <p className="text-2xl font-black text-amber-700">${vendedor.resumen_financiero.saldo_pendiente}</p>
              </div>
            </div>
          </Card>

          <Card title="Zona de Peligro">
            <p className="text-[11px] text-slate-500 mb-4">
              Suspender a un vendedor ocultará todos sus productos del marketplace inmediatamente.
            </p>
            <BotonAccion 
              variant={vendedor.status === 'activo' ? 'danger' : 'primary'}
              className="w-full py-3"
              onClick={handleStatusChange}
              disabled={processing}
            >
              {vendedor.status === 'activo' ? 'Suspender Vendedor' : 'Reactivar Vendedor'}
            </BotonAccion>
          </Card>
        </div>

      </div>
    </AdminLayout>
  );
}
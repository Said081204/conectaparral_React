import React from "react";
import AdminLayout from "@/Components/Admin/Layout/AdminLayout";
import Card from "@/Components/Admin/UI/Card";
import BotonAccion from "@/Components/Admin/UI/BotonAccion";
import TarjetasKPIs from "@/Components/Admin/Dashboard/TarjetasKPIs";

export default function Dashboard() {
  return (
    <AdminLayout 
      title="Centro de Mando" 
      subtitle="Estado global de ConectaParral"
    >
      <div className="space-y-8 pb-10">
        
        {/* 1. KPIs: Lo primero que el Admin debe ver al despertar */}
        <TarjetasKPIs />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 2. ACCIONES PENDIENTES (En lugar de la tabla gigante) */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Tareas de Moderación</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="border-l-4 border-amber-500 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">Tiendas nuevas</p>
                      <h4 className="text-3xl font-black text-slate-900 mt-1">08</h4>
                    </div>
                    <span className="bg-amber-100 text-amber-700 p-2 rounded-xl text-[10px] font-black">PENDIENTES</span>
                  </div>
                  <BotonAccion variant="secondary" className="mt-4 w-full text-[10px] py-3">Validar Documentación</BotonAccion>
               </Card>

               <Card className="border-l-4 border-slate-900 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase">Productos nuevos</p>
                      <h4 className="text-3xl font-black text-slate-900 mt-1">24</h4>
                    </div>
                    <span className="bg-slate-100 text-slate-700 p-2 rounded-xl text-[10px] font-black">EN COLA</span>
                  </div>
                  <BotonAccion variant="secondary" className="mt-4 w-full text-[10px] py-3">Revisar Catálogo</BotonAccion>
               </Card>
            </div>

            {/* Gráfica rápida o aviso de finanzas */}
            <Card title="Corte de Caja" description="Balance acumulado de la semana">
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <p className="text-sm font-bold text-emerald-800 italic">Listo para dispersión de pagos</p>
                    <h5 className="text-lg font-black text-emerald-900">$12,450.00</h5>
                </div>
            </Card>
          </div>

          {/* 3. LOG DE AUDITORÍA (Para saber quién hizo qué) */}
          <Card 
            title="Actividad Reciente" 
            description="Eventos del sistema"
          >
            <div className="space-y-6">
              {[
                { type: 'log', user: 'Admin', desc: 'Cambió comisión a 12%', time: '2 min', color: 'bg-slate-900' },
                { type: 'venta', user: 'Cliente', desc: 'Pedido #890 pagado', time: '15 min', color: 'bg-emerald-500' },
                { type: 'error', user: 'Vendedor', desc: 'Fallo carga de imagen', time: '1h', color: 'bg-rose-500' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className={`h-2 w-2 mt-1.5 rounded-full ${item.color}`} />
                  <div>
                    <p className="text-xs font-black text-slate-900 leading-none">{item.user}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{item.desc}</p>
                    <p className="text-[9px] text-slate-300 uppercase mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </AdminLayout>
  );
}
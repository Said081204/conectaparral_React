import React from "react";
import AdminLayout from "@/Components/Admin/Layout/AdminLayout";
import SectionHeader from "@/Components/Admin/UI/SectionHeader";
import Card from "@/Components/Admin/UI/Card";
import BotonAccion from "@/Components/Admin/UI/BotonAccion";

// --- IMPORTACIONES CORREGIDAS SEGÚN TUS ARCHIVOS REALES ---
import ResumenComisiones from "@/Components/Admin/Finanzas/ResumenComisiones"; 
import TablaPagosVendedores from "@/Components/Admin/Finanzas/TablaPagosVendedores";
import HistorialLiquidaciones from "@/Components/Admin/Finanzas/HistorialLiquidaciones";
import ConfiguracionComision from "@/Components/Admin/Finanzas/ConfiguracionComision";

export default function Index({ stats, pagosPendientes }) {
  return (
    <AdminLayout 
      title="Gestión Financiera" 
      subtitle="Control de ingresos, comisiones y dispersión de pagos"
    >
      <SectionHeader title="Finanzas Globales" subtitle="Corte de caja en tiempo real" />

      {/* 1. KPIs FINANCIEROS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-slate-900 text-white border-none shadow-xl shadow-slate-900/20">
          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Ventas Totales (Bruto)</p>
          <h3 className="text-3xl font-black mt-1">${stats?.ventas_totales || '0.00'}</h3>
          <p className="text-[10px] text-emerald-400 mt-2 font-bold">↑ 12% este mes</p>
        </Card>
        
        <Card className="border-slate-100">
          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Comisiones ConectaParral</p>
          <h3 className="text-3xl font-black text-amber-600 mt-1">${stats?.comisiones || '0.00'}</h3>
          <p className="text-[10px] text-slate-500 mt-2 italic">Utilidad neta acumulada</p>
        </Card>

        <Card className="border-slate-100">
          <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Pendiente por Pagar</p>
          <h3 className="text-3xl font-black text-rose-600 mt-1">${stats?.por_pagar || '0.00'}</h3>
          <p className="text-[10px] text-slate-500 mt-2 font-medium">Saldo por liquidar a socios</p>
        </Card>
      </div>

      {/* 2. RESUMEN Y CONFIGURACIÓN */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <ResumenComisiones stats={stats} />
        </div>
        <div>
          <ConfiguracionComision />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. GRÁFICA / HISTORIAL (Usando tu archivo HistorialLiquidaciones) */}
        <div className="lg:col-span-2">
          <Card title="Historial de Liquidaciones" description="Comparativa de cierres de caja anteriores">
            <HistorialLiquidaciones />
          </Card>
        </div>

        {/* 4. ACCIONES RÁPIDAS */}
        <div className="space-y-6">
          <Card title="Dispersión de Fondos" className="bg-amber-50/30 border-amber-100">
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Hay <strong className="text-slate-900">{pagosPendientes?.length || 0}</strong> pagos listos para ser transferidos.
            </p>
            <BotonAccion variant="primary" className="w-full py-4 shadow-lg shadow-amber-500/20 uppercase text-[10px] font-black tracking-widest">
              Ejecutar Pagos Masivos
            </BotonAccion>
          </Card>

          <Card title="Reportes Fiscales">
            <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all text-[10px] font-black uppercase text-slate-600 tracking-tight">
                   📄 Exportar Excel de Ventas
                </button>
                <button className="w-full text-left p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all text-[10px] font-black uppercase text-slate-600 tracking-tight">
                   📄 PDF Retenciones de IVA
                </button>
            </div>
          </Card>
        </div>
      </div>

      {/* 5. TABLA DE PAGOS A VENDEDORES */}
      <div className="mt-8">
        <Card title="Estado de Liquidación a Vendedores" noPadding className="overflow-hidden border-slate-100">
          <TablaPagosVendedores pagos={pagosPendientes} />
        </Card>
      </div>
    </AdminLayout>
  );
}
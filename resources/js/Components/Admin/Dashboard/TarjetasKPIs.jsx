import React from "react";
import Card from "@/Components/Admin/UI/Card";

export default function TarjetasKPIs({ kpis }) {
  // Fallback por si aún no mandas datos reales desde Laravel
  const data = kpis ?? {
    vendedoresPendientes: 8,
    productosPendientes: 24,
    ventasHoy: 12,
    ingresosMes: 12450,
  };

  const items = [
    {
      label: "Vendedores pendientes",
      value: data.vendedoresPendientes,
      hint: "Revisar solicitudes",
      accent: "bg-[#F59E0B]",
    },
    {
      label: "Productos por aprobar",
      value: data.productosPendientes,
      hint: "Moderación de catálogo",
      accent: "bg-[#1E3A8A]",
    },
    {
      label: "Ventas hoy",
      value: data.ventasHoy,
      hint: "Pedidos confirmados",
      accent: "bg-slate-900",
    },
    {
      label: "Ingresos del mes",
      value: `$${Number(data.ingresosMes).toLocaleString("es-MX")}`,
      hint: "Acumulado mensual",
      accent: "bg-emerald-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {items.map((it) => (
        <Card key={it.label} className="border border-slate-200">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wide">
                {it.label}
              </p>
              <p className="mt-2 text-3xl font-black text-slate-900 tracking-tight">
                {it.value}
              </p>
              <p className="mt-1 text-xs text-slate-500 font-semibold">
                {it.hint}
              </p>
            </div>

            <span className={`h-9 w-2 rounded-full ${it.accent}`} />
          </div>
        </Card>
      ))}
    </section>
  );
}
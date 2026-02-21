import React from "react";
import Card from "@/Components/Admin/UI/Card";
import BotonAccion from "@/Components/Admin/UI/BotonAccion";
import { Link } from "@inertiajs/react";

export default function PendientesPanel({ solicitudes }) {
  const data =
    solicitudes ??
    [
      { id: 1, tienda: "Artesanías El Parral", contacto: "Juan Pérez", zona: "Centro", hace: "Hace 20 min" },
      { id: 2, tienda: "Quesos La Sierra", contacto: "María García", zona: "San José", hace: "Hace 1 hora" },
      { id: 3, tienda: "Miel Pura Parral", contacto: "Roberto Cruz", zona: "Valle", hace: "Hace 3 horas" },
    ];

  return (
    <Card className="border border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Tareas de moderación
          </p>
          <h3 className="mt-1 text-lg font-black text-slate-900">
            Nuevos vendedores por revisar
          </h3>
        </div>

        <Link
          href="/admin/vendedores"
          className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#1E3A8A] text-white text-xs font-black uppercase tracking-wider hover:opacity-95"
        >
          Ver todos
        </Link>
      </div>

      <div className="mt-5 space-y-3">
        {data.map((s) => (
          <div
            key={s.id}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 bg-white"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-[#1E3A8A] text-[#F59E0B] flex items-center justify-center font-black">
                {s.tienda?.[0] ?? "T"}
              </div>

              <div>
                <p className="text-sm font-black text-slate-900 leading-tight">
                  {s.tienda}
                </p>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  {s.contacto} • {s.zona}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between lg:justify-end gap-4">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase">
                {s.hace}
              </p>

              <BotonAccion
                variant="secondary"
                className="text-[10px] px-4 py-2 rounded-lg"
                asChild
              >
                <Link href={`/admin/vendedores/${s.id}`}>
                  Revisar
                </Link>
              </BotonAccion>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
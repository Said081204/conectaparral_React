import React from "react";
import Card from "@/Components/Admin/UI/Card";

export default function ActividadReciente({ actividad }) {
  const data =
    actividad ??
    [
      { id: 1, tipo: "SISTEMA", desc: "Comisión configurada a 12%", usuario: "Admin", tiempo: "Hace 2 min", dot: "bg-slate-900" },
      { id: 2, tipo: "VENTA", desc: "Pedido #890 pagado", usuario: "Cliente", tiempo: "Hace 15 min", dot: "bg-emerald-600" },
      { id: 3, tipo: "ALERTA", desc: "Fallo al subir imagen", usuario: "Vendedor", tiempo: "Hace 1 h", dot: "bg-rose-500" },
    ];

  return (
    <Card className="border border-slate-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
            Auditoría
          </p>
          <h3 className="mt-1 text-lg font-black text-slate-900">
            Actividad reciente
          </h3>
          <p className="mt-1 text-xs text-slate-500 font-semibold">
            Eventos del sistema y acciones del admin
          </p>
        </div>

        <span className="h-8 w-8 rounded-lg bg-[#F59E0B]/20 flex items-center justify-center text-[#1E3A8A] font-black">
          i
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {data.map((e) => (
          <div key={e.id} className="flex gap-3">
            <div className={`mt-1.5 h-2.5 w-2.5 rounded-full ${e.dot}`} />
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-black text-slate-900 truncate">
                  {e.tipo} • {e.usuario}
                </p>
                <p className="text-[10px] font-extrabold text-slate-400 uppercase">
                  {e.tiempo}
                </p>
              </div>
              <p className="text-xs text-slate-600 font-semibold mt-1">
                {e.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
import React from 'react';

const estilos = {
  pendiente: "bg-amber-50 text-amber-700 border-amber-200",
  aprobado: "bg-emerald-50 text-emerald-700 border-emerald-200",
  activo: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rechazado: "bg-rose-50 text-rose-700 border-rose-200",
  suspendido: "bg-slate-100 text-slate-600 border-slate-300",
  enviado: "bg-blue-50 text-blue-700 border-blue-200",
};

export default function BadgeEstado({ estado = "pendiente" }) {
  const key = estado.toLowerCase();
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${estilos[key] || estilos.pendiente}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 animate-pulse" />
      {estado.charAt(0).toUpperCase() + estado.slice(1)}
    </span>
  );
}
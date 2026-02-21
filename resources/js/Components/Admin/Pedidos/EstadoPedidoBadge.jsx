import React from 'react';

export default function EstadoPedidoBadge({ estado, size = "md" }) {
    const config = {
        pendiente: { bg: "bg-amber-100", text: "text-amber-700", label: "Pendiente" },
        pagado: { bg: "bg-blue-100", text: "text-blue-700", label: "Pagado" },
        en_camino: { bg: "bg-indigo-100", text: "text-indigo-700", label: "En Camino" },
        entregado: { bg: "bg-emerald-100", text: "text-emerald-700", label: "Entregado" },
        cancelado: { bg: "bg-rose-100", text: "text-rose-700", label: "Cancelado" },
    };

    const style = config[estado] || config.pendiente;
    const sizeClasses = size === "lg" ? "px-6 py-2 text-sm" : "px-3 py-1 text-[10px]";

    return (
        <span className={`inline-flex items-center font-black uppercase tracking-tighter rounded-full ${style.bg} ${style.text} ${sizeClasses}`}>
            {style.label}
        </span>
    );
}
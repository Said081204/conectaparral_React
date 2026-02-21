import React from "react";

export default function BotonAccion({ children, variant = "primary", className = "", ...props }) {
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
    outline: "bg-transparent border-2 border-amber-500 text-amber-600 hover:bg-amber-50",
    danger: "bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-100",
  };

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
// Components/Admin/UI/Card.jsx
import React from "react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Card({ children, title, description, actions, className = "" }) {
  return (
    <div className={cx(
      "bg-white rounded-[24px] border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden transition-all duration-300",
      className
    )}>
      {/* Header de la Card (Opcional) */}
      {(title || actions) && (
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="min-w-0">
            {title && (
              <h3 className="text-base font-bold text-slate-900 leading-tight truncate">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1 truncate">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Cuerpo de la Card */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
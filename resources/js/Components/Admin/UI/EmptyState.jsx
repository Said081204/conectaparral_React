import React from "react";

export default function EmptyState({ title, description, icon }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="h-20 w-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-200 mb-6 border border-slate-100 shadow-inner">
        {icon || (
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" strokeLinecap="round" />
          </svg>
        )}
      </div>
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="max-w-xs text-sm font-medium text-slate-500 mt-1">{description}</p>
    </div>
  );
}
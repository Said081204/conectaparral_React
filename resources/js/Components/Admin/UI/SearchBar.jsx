import React from "react";

export default function SearchBar({ value, onChange, placeholder = "Buscar..." }) {
  return (
    <div className="relative group w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-500 transition-colors">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full h-11 bg-white border border-slate-200 rounded-2xl pl-11 pr-4 text-sm transition-all outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/50 placeholder:text-slate-400"
      />
    </div>
  );
}
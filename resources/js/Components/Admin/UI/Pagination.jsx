import React from "react";
import { Link } from "@inertiajs/react";

export default function Pagination({ links = [] }) {
    // Si solo hay una página, no mostrar nada
    if (links.length <= 3) return null;

    return (
        <div className="flex items-center justify-center mt-8">
            <nav className="flex items-center gap-1 p-1 bg-white border border-slate-200/60 rounded-2xl shadow-sm">
                {links.map((link, key) => {
                    const isPrevNext = link.label.includes("Anterior") || link.label.includes("Siguiente");
                    
                    return link.url === null ? (
                        <span
                            key={key}
                            className={`px-4 py-2 text-[11px] font-bold text-slate-300 uppercase tracking-widest ${isPrevNext ? 'hidden sm:block' : ''}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ) : (
                        <Link
                            key={key}
                            href={link.url}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center justify-center
                                ${link.active 
                                    ? "bg-amber-500 text-[#0F172A] shadow-md shadow-amber-500/20" 
                                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }
                                ${isPrevNext ? 'bg-slate-50 text-slate-700 mx-1' : ''}
                            `}
                        >
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function ModalBase({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    footer, 
    maxWidth = "max-w-2xl" 
}) {
    // Cerrar con la tecla Esc
    useEffect(() => {
        const handleEsc = (e) => { e.key === "Escape" && onClose(); };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop: Oscurece y desenfoca el fondo */}
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
                onClick={onClose} 
            />

            {/* Contenedor del Modal */}
            <div className={`relative w-full ${maxWidth} bg-white rounded-[32px] shadow-2xl shadow-slate-900/20 overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300`}>
                
                {/* Header */}
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">
                            {title}
                        </h3>
                    </div>
                    <button 
                        onClick={onClose}
                        className="h-10 w-10 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Contenido (Scrollable si es muy largo) */}
                <div className="px-8 py-8 max-h-[70vh] overflow-y-auto">
                    {children}
                </div>

                {/* Footer / Acciones */}
                {footer && (
                    <div className="px-8 py-5 border-t border-slate-100 bg-slate-50/30 flex items-center justify-end gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>,
        document.body
    );
}
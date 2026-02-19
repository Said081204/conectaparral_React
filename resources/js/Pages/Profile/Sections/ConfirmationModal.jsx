import React from 'react';
import { AlertCircle, X } from "lucide-react";

export default function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, loading }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop con Blur profundo */}
            <div 
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500" 
                onClick={onClose} 
            />

            {/* Modal Card */}
            <div className="relative bg-white w-full max-w-[400px] rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-300">
                
                {/* Header con gradiente sutil */}
                <div className="pt-8 pb-4 px-8 flex flex-col items-center text-center">
                    <div className="mb-4 relative">
                        {/* Efecto de pulso suave de fondo */}
                        <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20" />
                        <div className="relative w-16 h-16 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center text-red-600 shadow-inner">
                            <AlertCircle size={32} strokeWidth={2.5} />
                        </div>
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 leading-tight">
                        {title}
                    </h3>
                    
                    <p className="mt-3 text-[15px] font-medium text-slate-500 leading-relaxed px-2">
                        {message}
                    </p>
                </div>

                {/* Botones Flotantes */}
                <div className="p-8 pt-4 flex flex-col gap-3">
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="group relative w-full bg-slate-900 text-white h-14 rounded-2xl font-bold text-sm uppercase tracking-widest overflow-hidden transition-all active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100"
                    >
                        {/* Brillo al pasar el mouse */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        
                        <span className="relative flex items-center justify-center gap-2">
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Eliminando...
                                </>
                            ) : 'Confirmar eliminación'}
                        </span>
                    </button>

                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="w-full bg-white text-slate-500 h-14 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all active:scale-[0.98]"
                    >
                        Tal vez luego
                    </button>
                </div>

                {/* Botón X minimalista */}
                <button 
                    onClick={onClose} 
                    className="absolute top-5 right-5 p-2 text-slate-300 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
}
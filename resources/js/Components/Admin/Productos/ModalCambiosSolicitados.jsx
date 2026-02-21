import React from 'react';
import BotonAccion from "@/Components/Admin/UI/BotonAccion";

export default function ModalCambiosSolicitados({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl">
        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">Solicitar Ajustes</h3>
        <p className="text-sm text-slate-500 mb-6">El producto se pondrá en "Borrador" hasta que el vendedor realice los cambios.</p>
        
        <textarea 
          placeholder="Ej: Las fotos principales están borrosas, favor de reemplazarlas..."
          className="w-full h-32 text-sm border-slate-200 rounded-2xl focus:ring-amber-500 mb-6"
        />

        <div className="flex gap-3">
          <BotonAccion variant="secondary" className="flex-1" onClick={onClose}>Cancelar</BotonAccion>
          <BotonAccion variant="primary" className="flex-1" onClick={onConfirm}>Enviar Solicitud</BotonAccion>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import BotonAccion from "@/Components/Admin/UI/BotonAccion";

export default function ModalRechazoSolicitud({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
        <h3 className="text-xl font-black text-slate-900 mb-2 text-center">Rechazar Solicitud</h3>
        <p className="text-sm text-slate-500 text-center mb-6">
          Esta acción enviará un correo al vendedor informando que su solicitud ha sido denegada permanentemente.
        </p>
        
        <textarea 
          placeholder="Motivo del rechazo (Este mensaje se enviará al usuario)..."
          className="w-full h-32 text-sm border-slate-200 rounded-2xl focus:ring-rose-500 mb-6"
        />

        <div className="flex gap-3">
          <BotonAccion variant="secondary" className="flex-1" onClick={onClose}>
            Cancelar
          </BotonAccion>
          <BotonAccion variant="danger" className="flex-1 bg-rose-600 text-white" onClick={onConfirm}>
            Confirmar Rechazo
          </BotonAccion>
        </div>
      </div>
    </div>
  );
}
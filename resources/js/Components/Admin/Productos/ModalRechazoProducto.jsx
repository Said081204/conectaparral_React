import React from 'react';
import BotonAccion from "@/Components/Admin/UI/BotonAccion";

export default function ModalRechazoProducto({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl border-t-8 border-rose-600">
        <h3 className="text-xl font-black text-slate-900 mb-2">Rechazar Producto</h3>
        <p className="text-sm text-slate-500 mb-6">Esta acción es definitiva. Indica el motivo del incumplimiento de normas.</p>
        
        <select className="w-full mb-4 border-slate-200 rounded-xl text-sm">
          <option>Artículo prohibido en el marketplace</option>
          <option>Información engañosa o fraudulenta</option>
          <option>Infracción de derechos de autor</option>
          <option>Otro motivo...</option>
        </select>

        <div className="flex gap-3">
          <BotonAccion variant="secondary" className="flex-1" onClick={onClose}>Cerrar</BotonAccion>
          <BotonAccion variant="danger" className="flex-1 bg-rose-600 text-white" onClick={onConfirm}>
            Confirmar Rechazo
          </BotonAccion>
        </div>
      </div>
    </div>
  );
}
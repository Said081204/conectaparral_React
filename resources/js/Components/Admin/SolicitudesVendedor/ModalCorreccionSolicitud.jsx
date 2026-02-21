import React from 'react';
import BotonAccion from "@/Components/Admin/UI/BotonAccion";

export default function ModalCorreccionSolicitud({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl border-t-8 border-amber-500">
        <h3 className="text-xl font-black text-slate-900 mb-2">Solicitar Correcciones</h3>
        <p className="text-sm text-slate-500 mb-6">
          Marca los puntos que el vendedor debe corregir para ser aprobado.
        </p>
        
        <div className="space-y-3 mb-6">
          {['RFC no coincide', 'Documentos borrosos', 'CLABE incorrecta', 'Giro comercial no permitido'].map((check) => (
            <label key={check} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100">
              <input type="checkbox" className="rounded text-amber-600 focus:ring-amber-500" />
              <span className="text-sm font-medium text-slate-700">{check}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <BotonAccion variant="secondary" className="flex-1" onClick={onClose}>
            Regresar
          </BotonAccion>
          <BotonAccion variant="primary" className="flex-1" onClick={onConfirm}>
            Enviar Observaciones
          </BotonAccion>
        </div>
      </div>
    </div>
  );
}
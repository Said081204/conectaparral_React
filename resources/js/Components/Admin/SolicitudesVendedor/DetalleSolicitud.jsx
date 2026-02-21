// Components/Admin/SolicitudesVendedor/DetalleSolicitud.jsx
import React from "react";
import Card from "../UI/Card";
import BadgeEstado from "../UI/BadgeEstado";

export default function DetalleSolicitud({ solicitud }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Columna Izquierda: Información General */}
      <div className="lg:col-span-2 space-y-8">
        <Card title="Información del Negocio" description="Datos registrados por el vendedor">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nombre Comercial</label>
              <p className="text-sm font-bold text-slate-900 mt-1">{solicitud.negocio}</p>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo de Productor</label>
              <p className="text-sm font-bold text-slate-900 mt-1">{solicitud.tipo}</p>
            </div>
            <div className="md:col-span-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Descripción del Negocio</label>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{solicitud.descripcion}</p>
            </div>
          </div>
        </Card>

        <Card title="Documentación Legal" description="Archivos adjuntos para validación">
          <div className="space-y-4">
            {solicitud.documentos.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-amber-500 transition-all">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-amber-600 transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeWidth="2" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{doc.nombre}</p>
                    <p className="text-[10px] text-slate-400 uppercase font-black">Archivo PDF • 2.4 MB</p>
                  </div>
                </div>
                <button className="text-xs font-black text-amber-600 hover:text-amber-700 tracking-tighter uppercase">Ver Documento</button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Columna Derecha: Datos de Contacto y Estado */}
      <div className="space-y-8">
        <Card title="Estado de Solicitud">
          <div className="flex flex-col items-center text-center py-4">
            <BadgeEstado estado={solicitud.status} />
            <p className="text-[10px] font-medium text-slate-400 mt-4 uppercase tracking-widest">Registrado el {solicitud.fecha}</p>
          </div>
        </Card>

        <Card title="Datos de Contacto">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Responsable</label>
              <p className="text-sm font-bold text-slate-900">{solicitud.solicitante}</p>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Correo Electrónico</label>
              <p className="text-sm font-bold text-slate-900 break-all">{solicitud.email}</p>
            </div>
            <div>
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Teléfono</label>
              <p className="text-sm font-bold text-slate-900">{solicitud.telefono}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
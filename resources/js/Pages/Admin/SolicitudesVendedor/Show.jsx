// Pages/Admin/SolicitudesVendedor/Show.jsx
import React, { useState } from "react";
import AdminLayout from "@/Components/Admin/Layout/AdminLayout";
import DetalleSolicitud from "@/Components/Admin/SolicitudesVendedor/DetalleSolicitud";
import BotonAccion from "@/Components/Admin/UI/BotonAccion";
import ModalBase from "@/Components/Admin/UI/ModalBase";
import SectionHeader from "@/Components/Admin/UI/SectionHeader";

export default function Show() {
  const [modalRechazo, setModalRechazo] = useState(false);
  
  // Datos simulados (esto llegará desde Laravel)
  const solicitud = {
    id: 1,
    negocio: "Vivero El Manantial",
    solicitante: "Juan Pérez",
    email: "juan.perez@email.com",
    telefono: "627 123 4567",
    tipo: "Productor",
    descripcion: "Somos una empresa familiar dedicada al cultivo de plantas regionales y árboles frutales en la región de Parral desde hace 15 años.",
    status: "pendiente",
    fecha: "15 de Febrero, 2024",
    documentos: [
      { nombre: "Identificación Oficial (INE)" },
      { nombre: "Constancia de Situación Fiscal" },
      { nombre: "Comprobante de Domicilio" }
    ]
  };

  return (
    <AdminLayout title="Detalle de Solicitud" subtitle={`Revisando a: ${solicitud.negocio}`}>
      <div className="pb-10">
        
        <SectionHeader 
          title={solicitud.negocio}
          description="Revisa cuidadosamente la documentación antes de aprobar al vendedor."
          actions={
            <div className="flex gap-3">
              <BotonAccion variant="danger" onClick={() => setModalRechazo(true)}>
                Rechazar
              </BotonAccion>
              <BotonAccion variant="primary" className="bg-emerald-600 hover:bg-emerald-700">
                Aprobar Vendedor
              </BotonAccion>
            </div>
          }
        />

        <DetalleSolicitud solicitud={solicitud} />

        {/* Modal de Rechazo usando ModalBase */}
        <ModalBase 
          isOpen={modalRechazo} 
          onClose={() => setModalRechazo(false)}
          title="Rechazar Solicitud"
          footer={
            <>
              <BotonAccion variant="secondary" onClick={() => setModalRechazo(false)}>Cancelar</BotonAccion>
              <BotonAccion variant="danger">Confirmar Rechazo</BotonAccion>
            </>
          }
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600 font-medium">
              Por favor, indica el motivo del rechazo. El vendedor recibirá una notificación por correo.
            </p>
            <textarea 
              placeholder="Ej: La identificación oficial está borrosa o vencida..."
              className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all"
            />
          </div>
        </ModalBase>

      </div>
    </AdminLayout>
  );
}
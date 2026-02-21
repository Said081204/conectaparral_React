import React from "react";
import AdminLayout from "@/Components/Admin/Layout/AdminLayout";
import SectionHeader from "@/Components/Admin/UI/SectionHeader";
import Card from "@/Components/Admin/UI/Card";
import BotonAccion from "@/Components/Admin/UI/BotonAccion";
import { useForm } from "@inertiajs/react";

// Importamos los componentes de tu carpeta Pedidos
import DetallePedido from "@/Components/Admin/Pedidos/DetallePedido";
import EstadoPedidoBadge from "@/Components/Admin/Pedidos/EstadoPedidoBadge";
import IncidenciasPedido from "@/Components/Admin/Pedidos/IncidenciasPedido";

export default function Show({ pedido }) {
  const { patch, processing } = useForm({
    estado: pedido.estado,
  });

  const actualizarEstado = (nuevoEstado) => {
    patch(route('admin.pedidos.update', pedido.id), {
      estado: nuevoEstado,
    });
  };

  return (
    <AdminLayout title={`Pedido ${pedido.id}`}>
      <SectionHeader 
        title={`Gestión de Pedido ${pedido.id}`} 
        subtitle="Control de logística y cumplimiento del vendedor"
      >
        <BotonAccion variant="secondary" onClick={() => window.print()}>
          Imprimir Recibo
        </BotonAccion>
      </SectionHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        
        {/* COLUMNA IZQUIERDA: CONTENIDO DEL PEDIDO (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Componente: DetallePedido.jsx */}
          <Card title="Artículos y Cantidades">
            <DetallePedido items={pedido.items} />
          </Card>

          {/* Componente: IncidenciasPedido.jsx (Línea de tiempo) */}
          <Card title="Historial de Rastreo e Incidencias">
            <IncidenciasPedido historial={pedido.historial} />
          </Card>

        </div>

        {/* COLUMNA DERECHA: CONTROL Y LOGÍSTICA (1/3) */}
        <div className="space-y-6">
          
          {/* ESTADO ACTUAL */}
          <Card title="Estado de la Orden">
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <EstadoPedidoBadge estado={pedido.estado} size="lg" />
              <p className="text-[10px] text-slate-400 mt-3 uppercase font-bold tracking-widest">
                Última actualización: {pedido.historial[pedido.historial.length - 1].fecha}
              </p>
            </div>
          </Card>

          {/* PARTICIPANTES CLAVE */}
          <Card title="Participantes">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block">Vendedor Responsable</label>
                  <span className="text-sm font-bold text-amber-700">{pedido.vendedor}</span>
                </div>
                <BotonAccion variant="secondary" className="h-7 px-2 text-[10px]">Perfil</BotonAccion>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <label className="text-[10px] uppercase font-bold text-slate-400 block">Cliente</label>
                <span className="text-sm font-medium text-slate-900">{pedido.cliente}</span>
              </div>
            </div>
          </Card>

          {/* DATOS DE ENVÍO */}
          <Card title="Información de Entrega">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400">Método de Pago</label>
                <p className="text-sm font-semibold text-slate-700">{pedido.metodo_pago}</p>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400">Guía de Rastreo</label>
                <div className="flex items-center gap-2 mt-1">
                  <code className="flex-1 text-xs bg-slate-900 text-slate-200 p-2 rounded-lg font-mono">
                    {pedido.guia_rastreo || "Pendiente de asignar"}
                  </code>
                </div>
              </div>
            </div>
          </Card>

          {/* PANEL DE ACCIONES CRÍTICAS */}
          <Card title="Acciones de Control">
            <div className="grid grid-cols-1 gap-2">
              <BotonAccion 
                variant="primary" 
                disabled={processing || pedido.estado === 'entregado'}
                onClick={() => actualizarEstado('entregado')}
              >
                Forzar Entrega
              </BotonAccion>
              
              <BotonAccion 
                variant="danger" 
                className="bg-rose-600 hover:bg-rose-700 text-white"
                disabled={processing || pedido.estado === 'cancelado'}
                onClick={() => actualizarEstado('cancelado')}
              >
                Cancelar y Reembolsar
              </BotonAccion>
            </div>
            <p className="text-[9px] text-center text-slate-400 mt-4 leading-tight">
              Al realizar una acción forzada, se notificará automáticamente tanto al vendedor como al comprador.
            </p>
          </Card>

        </div>
      </div>
    </AdminLayout>
  );
}
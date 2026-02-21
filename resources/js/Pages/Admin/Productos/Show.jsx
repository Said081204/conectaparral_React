import React from "react";
import AdminLayout from "@/Components/Admin/Layout/AdminLayout";
import SectionHeader from "@/Components/Admin/UI/SectionHeader";
import Card from "@/Components/Admin/UI/Card";
import BotonAccion from "@/Components/Admin/UI/BotonAccion";
import BadgeEstado from "@/Components/Admin/UI/BadgeEstado";
import { useForm } from "@inertiajs/react";

export default function Show({ producto }) {
  const { patch, processing } = useForm({
    estado: ''
  });

  const cambiarEstado = (nuevoEstado) => {
    if(confirm(`¿Deseas cambiar el estado a ${nuevoEstado}?`)) {
      patch(route('admin.productos.update', producto.id), { estado: nuevoEstado });
    }
  };

  return (
    <AdminLayout title={`Revisando: ${producto.nombre}`}>
      <SectionHeader title="Detalle del Producto" subtitle="Valida la información antes de publicar">
        <BadgeEstado estado={producto.estado} size="lg" />
      </SectionHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* GALERÍA Y DESCRIPCIÓN */}
        <div className="lg:col-span-2 space-y-6">
          <Card title="Imágenes del Producto">
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {producto.imagenes.map((img, i) => (
                  <img key={i} src={img} className="rounded-2xl border border-slate-100 aspect-square object-cover" />
                ))}
             </div>
          </Card>

          <Card title="Descripción Completa">
            <p className="text-slate-600 leading-relaxed text-sm">
              {producto.descripcion}
            </p>
            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
               <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Especificaciones</label>
                  <ul className="text-xs text-slate-700 mt-2 list-disc pl-4 space-y-1">
                    {producto.especificaciones.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
               </div>
            </div>
          </Card>
        </div>

        {/* PANEL DE CONTROL */}
        <div className="space-y-6">
          <Card title="Información de Venta">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Precio al público</span>
                <span className="text-xl font-black text-slate-900">${producto.precio}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-500">Comisión (10%)</span>
                <span className="text-sm font-bold text-rose-500">-${producto.precio * 0.1}</span>
              </div>
              <div className="pt-4 border-t border-dashed flex justify-between items-center">
                <span className="text-sm font-bold text-slate-900">Ganancia Vendedor</span>
                <span className="text-lg font-black text-emerald-600">${producto.precio * 0.9}</span>
              </div>
            </div>
          </Card>

          <Card title="Vendedor">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
                 {producto.vendedor[0]}
               </div>
               <div>
                 <p className="text-sm font-bold text-slate-900">{producto.vendedor}</p>
                 <Link href="#" className="text-[10px] text-blue-600 font-bold uppercase hover:underline">Ver tienda</Link>
               </div>
            </div>
          </Card>

          <Card title="Acciones de Moderación">
            <div className="grid grid-cols-1 gap-3">
              <BotonAccion 
                variant="primary" 
                className="w-full py-3"
                onClick={() => cambiarEstado('activo')}
                disabled={processing || producto.estado === 'activo'}
              >
                Aprobar Producto
              </BotonAccion>
              
              <BotonAccion 
                variant="secondary" 
                className="w-full py-3 border-rose-200 text-rose-600 hover:bg-rose-50"
                onClick={() => cambiarEstado('rechazado')}
                disabled={processing || producto.estado === 'rechazado'}
              >
                Rechazar / Solicitar Cambios
              </BotonAccion>
            </div>
          </Card>
        </div>

      </div>
    </AdminLayout>
  );
}
import React from "react";
import AdminLayout from "@/Components/Admin/Layout/AdminLayout";
import SectionHeader from "@/Components/Admin/UI/SectionHeader";
import Card from "@/Components/Admin/UI/Card";

// Importamos tus componentes existentes (según tus capturas)
import BannersInicioConfig from "@/Components/Admin/Configuracion/BannersInicioConfig";
import CategoriasConfig from "@/Components/Admin/Configuracion/CategoriasConfig";

export default function Index() {
  return (
    <AdminLayout 
      title="Configuración del Sitio" 
      subtitle="Personaliza la apariencia y estructura de ConectaParral"
    >
      <SectionHeader 
        title="Gestión de Contenido" 
        subtitle="Control de elementos visuales y organización del catálogo" 
      />

      <div className="space-y-10">
        
        {/* SECCIÓN DE BANNERS - Usando tu componente */}
        <section>
          <div className="mb-4">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Carrusel de Inicio</h3>
            <p className="text-xs text-slate-500">Gestiona las imágenes promocionales de la pantalla principal</p>
          </div>
          <Card noPadding className="overflow-hidden border-slate-100 shadow-sm">
            <BannersInicioConfig />
          </Card>
        </section>

        {/* SECCIÓN DE CATEGORÍAS - Usando tu componente */}
        <section>
          <div className="mb-4">
            <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Árbol de Categorías</h3>
            <p className="text-xs text-slate-500">Organiza cómo los clientes encuentran los productos</p>
          </div>
          <Card className="border-slate-100 shadow-sm">
            <CategoriasConfig />
          </Card>
        </section>

        {/* AJUSTES DE CONTACTO RÁPIDO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Soporte Técnico" description="Configuración de WhatsApp de ayuda">
             <div className="mt-4">
               <label className="text-[10px] font-bold text-slate-400 uppercase">Número de Atención</label>
               <input 
                type="text" 
                placeholder="+52 627..." 
                className="w-full mt-1 bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold focus:ring-amber-500"
               />
             </div>
          </Card>
          
          <Card title="Redes Sociales" description="Enlaces oficiales en el pie de página">
             <div className="space-y-3 mt-4">
               <input type="text" placeholder="Facebook URL" className="w-full bg-slate-50 border-none rounded-xl py-2 px-4 text-xs" />
               <input type="text" placeholder="Instagram URL" className="w-full bg-slate-50 border-none rounded-xl py-2 px-4 text-xs" />
             </div>
          </Card>
        </section>

      </div>
    </AdminLayout>
  );
}
import React from "react";
import AdminLayout from "@/Components/Admin/Layout/AdminLayout";
import SectionHeader from "@/Components/Admin/UI/SectionHeader";
// IMPORTANTE: Revisa que la ruta a los componentes sea la correcta
import FiltrosProductos from "@/Components/Admin/Productos/FiltrosProductos";
import TablaModeracionProductos from "@/Components/Admin/Productos/TablaModeracionProductos";

export default function Index({ productos, stats }) {
  return (
    <AdminLayout title="Catálogo de Productos">
      <SectionHeader 
        title="Productos" 
        subtitle="Gestiona y modera el inventario de la plataforma" 
      />
      
      {/* 1. Filtros */}
      <FiltrosProductos />

      {/* 2. Tabla con diseño de lujo */}
      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
        <TablaModeracionProductos productos={productos} />
      </div>
    </AdminLayout>
  );
}
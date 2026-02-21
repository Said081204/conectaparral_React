// Pages/Admin/SolicitudesVendedor/Index.jsx
import React, { useState } from "react";
import AdminLayout from "@/Components/Admin/Layout/AdminLayout";
import SectionHeader from "@/Components/Admin/UI/SectionHeader";
import FiltrosSolicitudes from "@/Components/Admin/SolicitudesVendedor/FiltrosSolicitudes";
import TablaSolicitudes from "@/Components/Admin/SolicitudesVendedor/TablaSolicitudes";
import Pagination from "@/Components/Admin/UI/Pagination";
import EmptyState from "@/Components/Admin/UI/EmptyState";

export default function Index() {
  // Simulación de datos (Cuando conectes Laravel, esto vendrá de props)
  const [filters, setFilters] = useState({ search: "", status: "todos" });
  
  const solicitudesData = [
    { id: 1, negocio: "Vivero El Manantial", solicitante: "Juan Pérez", tipo: "Productor", fecha: "15 Feb 2024", status: "pendiente" },
    { id: 2, negocio: "Artesanías Parral", solicitante: "María García", tipo: "Artesano", fecha: "14 Feb 2024", status: "revision" },
    { id: 3, negocio: "Quesos La Sierra", solicitante: "Roberto Cruz", tipo: "Productor", fecha: "12 Feb 2024", status: "rechazado" },
    { id: 4, negocio: "Miel Pura Parral", solicitante: "Ana López", tipo: "Productor", fecha: "10 Feb 2024", status: "pendiente" },
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <AdminLayout 
      title="Solicitudes de Vendedores" 
      subtitle="Gestión y validación de nuevos aliados comerciales"
    >
      <div className="pb-10">
        {/* Cabecera de la sección */}
        <SectionHeader 
          title="Bandeja de Entrada" 
          description="Valida los documentos y datos de los productores locales antes de darles acceso al marketplace."
        />

        {/* Barra de filtros */}
        <FiltrosSolicitudes 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />

        {/* Contenido principal */}
        {solicitudesData.length > 0 ? (
          <>
            <TablaSolicitudes solicitudes={solicitudesData} />
            
            {/* Simulación de links de paginación de Laravel/Inertia */}
            <Pagination links={[
                { url: null, label: "&laquo; Anterior", active: false },
                { url: "#", label: "1", active: true },
                { url: "#", label: "2", active: false },
                { url: "#", label: "Siguiente &raquo;", active: false },
            ]} />
          </>
        ) : (
          <EmptyState 
            title="No hay solicitudes pendientes" 
            description="Cuando un nuevo vendedor se registre, aparecerá aquí para tu revisión." 
          />
        )}
      </div>
    </AdminLayout>
  );
}
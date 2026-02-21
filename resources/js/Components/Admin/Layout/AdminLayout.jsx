import React, { useEffect, useMemo, useState } from "react";
import { usePage, Head } from "@inertiajs/react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminFooter from "./AdminFooter";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminLayout({
  title = "Panel de Gestión",
  subtitle = "",
  children,
}) {
  const { url } = usePage();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Cada vez que la URL cambia (navegación), cerramos el menú móvil automáticamente
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [url]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* SEO y Título de Pestaña */}
      <Head title={title} />

      {/* SIDEBAR: Pasamos la URL actual para que se iluminen los botones */}
      <AdminSidebar
        currentUrl={url}
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* COLUMNA PRINCIPAL: Ajuste dinámico de margen según el estado del sidebar */}
      <div
        className={cx(
          "min-h-screen flex flex-col transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        )}
      >
        {/* HEADER: Barra superior con buscador y perfil */}
        <AdminHeader
          title={title}
          subtitle={subtitle}
          onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          onToggleSidebar={() => setSidebarCollapsed((v) => !v)}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Miga de Pan (Breadcrumbs) automática sutil */}
          <nav className="flex mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <ol className="flex items-center gap-2">
              <li>Admin</li>
              <li>/</li>
              <li className="text-amber-600">
                {url.split('/')[2]?.replace('-', ' ') || 'Dashboard'}
              </li>
            </ol>
          </nav>

          {/* IMPORTANTE: Hemos quitado el div con borde que tenías antes. 
              Ahora el contenido respira libremente porque tus componentes 
              (Card.jsx, TableBase.jsx) ya traen sus propios bordes y sombras.
          */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </main>

        {/* FOOTER: Información de versión y sistema activo */}
        <AdminFooter />
      </div>
    </div>
  );
}
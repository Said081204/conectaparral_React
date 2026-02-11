import React from "react";
import PublicLayout from "@/Layouts/PublicLayout";

// Componentes adaptados
import Portada from "@/Components/Public/Portada";
import Categorias from "@/Components/Public/Categorias";
import Productos from "@/Components/Public/Productos";

export default function Home({ auth }) {
  // Nota: Si usas Laravel + Inertia, 'auth' suele venir automáticamente 
  // con la información del usuario logueado.

  return (
    <PublicLayout user={auth?.user}>
      
      {/* 1. PORTADA / HERO SECTION 
          Carrusel con diseño de bordes rectos y sombras suaves
      */}
      <Portada />

      {/* 2. CONTENIDO PRINCIPAL 
          Usamos un contenedor con padding para separar las secciones
      */}
      <main className="space-y-4 sm:space-y-8 pb-20">
        
        {/* SECCIÓN DE CATEGORÍAS 
            Ideal para navegación rápida por iconos o tarjetas
        */}
        <Categorias />

        {/* SECCIÓN DE PRODUCTOS 
            Aquí vive toda la lógica de filtros, orden y vista (Grid/List) 
            que adaptamos anteriormente.
        */}
        <Productos />

      </main>

    </PublicLayout>
  );
}
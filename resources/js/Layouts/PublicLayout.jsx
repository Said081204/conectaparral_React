import React from "react";
import Header from "@/Components/Public/Layout/Header"; // Asegúrate de que la ruta sea correcta
import Footer from "@/Components/Public/Layout/Footer"; // Asegúrate de que la ruta sea correcta

export default function PublicLayout({ children, user }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* 1. HEADER DINÁMICO
          Sustituimos el header básico por el que tiene buscador y carrito
      */}
      <Header user={user} />

      {/* 2. CONTENIDO PRINCIPAL
          Añadimos un padding top (pt) para que el contenido no quede 
          oculto bajo el Header que es 'fixed'
      */}
      <main className="flex-1 pt-[76px] md:pt-[105px]">
        {children}
      </main>

      {/* 3. FOOTER COMPLETO
          Sustituimos el footer sencillo de una línea por el 
          que tiene 5 columnas, redes sociales y métodos de pago
      */}
      <Footer />

    </div>
  );
}
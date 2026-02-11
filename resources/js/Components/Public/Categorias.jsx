import React from "react";
import { 
  Shirt, Palette, Gift, Sparkles, Home, 
  Smartphone, Dog, UtensilsCrossed, ChevronRight 
} from "lucide-react";

const categorias = [
  { nombre: "Ropa", icono: <Shirt strokeWidth={1.5} /> },
  { nombre: "Artesanías", icono: <Palette strokeWidth={1.5} /> },
  { nombre: "Regalos", icono: <Gift strokeWidth={1.5} /> },
  { nombre: "Belleza", icono: <Sparkles strokeWidth={1.5} /> },
  { nombre: "Hogar", icono: <Home strokeWidth={1.5} /> },
  { nombre: "Tecnología", icono: <Smartphone strokeWidth={1.5} /> },
  { nombre: "Mascotas", icono: <Dog strokeWidth={1.5} /> },
  { nombre: "Alimentos", icono: <UtensilsCrossed strokeWidth={1.5} /> }
];

export default function Categorias() {
  return (
    <section className="py-16 bg-white border-b border-[#E5E7EB] font-['Nunito']">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* ENCABEZADO PROFESIONAL */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1F2937] tracking-tight">
              Compra por categoría
            </h2>
            {/* Usamos tu Color Primario para el acento */}
            <div className="h-1 w-12 bg-[#1E3A8A] mt-2 rounded-full"></div>
          </div>
          <button className="hidden sm:flex items-center gap-1 text-sm font-bold text-[#6B7280] hover:text-[#1E3A8A] transition-colors">
            Explorar todo <ChevronRight size={16} />
          </button>
        </div>

        {/* CONTENEDOR ADAPTABLE */}
        <div className="
          flex overflow-x-auto gap-8 pb-10 px-2 
          scrollbar-hide snap-x snap-mandatory
          md:grid md:grid-cols-4 lg:grid-cols-8 md:overflow-x-visible md:gap-4
        ">
          {categorias.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 min-w-[120px] md:min-w-0 snap-center group cursor-pointer"
            >
              {/* RUEDAS GRANDES ADAPTABLES
                  - Color base: Blanco con borde suave
                  - Hover: Fondo azul primario y sombra naranja (acent)
              */}
              <div className="
                relative flex items-center justify-center rounded-full
                w-[115px] h-[115px] 
                sm:w-[13vw] sm:h-[13vw] 
                lg:w-[9vw] lg:h-[9vw]
                max-w-[150px] max-h-[150px]
                bg-white text-[#1E3A8A]
                border-2 border-[#E5E7EB]
                transition-all duration-400 ease-out
                group-hover:bg-[#1E3A8A] group-hover:text-white 
                group-hover:border-[#1E3A8A]
                group-hover:shadow-[0_15px_30px_rgba(30,58,138,0.2)]
                group-active:scale-90
              ">
                <div className="scale-[1.3] md:scale-[1.6]">
                  {cat.icono}
                </div>

                {/* Detalle sutil en el borde al hacer hover con tu color Accent */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#F59E0B]/30 scale-110 transition-transform duration-500" />
              </div>

              {/* TEXTO CON TU FUENTE Y COLORES */}
              <span className="text-sm md:text-base font-bold text-[#6B7280] text-center tracking-tight transition-colors group-hover:text-[#1F2937]">
                {cat.nombre}
              </span>
            </div>
          ))}
        </div>

        {/* VER TODAS (MÓVIL) CON TU COLOR ACCENT */}
        <button className="sm:hidden w-full text-center text-xs font-black text-[#F59E0B] uppercase tracking-[0.2em] pt-4">
          Ver todas las categorías
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
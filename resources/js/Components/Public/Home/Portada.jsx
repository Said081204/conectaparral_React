import React, { useState, useEffect } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  ShoppingCart, 
  ArrowRight, 
  Store, 
  Sparkles, 
  Hammer, 
  Home, 
  Award 
} from "lucide-react";

const slides = [
  {
    tag: "CALIDAD PREMIUM",
    titulo: "SABORES DE",
    subtitulo: "TRADICIÓN",
    desc: "La mejor selección de dulces regionales y cajeta artesanal. Recetas centenarias que viajan directo a tu mesa con el sabor auténtico de Parral.",
    img: "https://images.unsplash.com/photo-1590534247854-e97d5e3feef6?q=80&w=2400",
    btnText: "Comprar Dulces",
    btnIcon: <ShoppingCart size={18} />,
    productos: [
      { name: "Cajeta Clásica", price: "$120", img: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=400" },
      { name: "Dulce de Nuez", price: "$180", img: "https://images.unsplash.com/photo-1582208993220-2cde1cb44746?q=80&w=400" }
    ]
  },
  {
    tag: "JOYERÍA FINA",
    titulo: "DESTREZA EN",
    subtitulo: "PLATA PURA",
    desc: "Diseños exclusivos en plata ley .925. Elegancia contemporánea con el sello de los mejores plateros del norte de México.",
    img: "https://images.unsplash.com/photo-1513519247388-193ad51c50be?q=80&w=2400",
    btnText: "Ver Joyería",
    btnIcon: <Sparkles size={18} />,
    productos: [
      { name: "Pulsera Minimal", price: "$450", img: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=400" },
      { name: "Anillo Artesanal", price: "$320", img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=400" }
    ]
  },
  {
    tag: "MAESTROS ARTESANOS",
    titulo: "ARTE EN",
    subtitulo: "CUERO Y MADERA",
    desc: "Talento local plasmado en piezas únicas de piel y tallados a mano. Durabilidad y orgullo chihuahuense en cada detalle.",
    img: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=2400",
    btnText: "Explorar Artesanía",
    btnIcon: <Hammer size={18} />,
    productos: [
      { name: "Cinturón Piel", price: "$650", img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=400" },
      { name: "Silla Tallada", price: "$2,400", img: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?q=80&w=400" }
    ]
  },
  {
    tag: "HOGAR Y ESTILO",
    titulo: "ESPACIOS CON",
    subtitulo: "ALMA NORTEÑA",
    desc: "Decoración rústica y moderna para transformar tu hogar con piezas que tienen carácter, historia y tradición regional.",
    img: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=2400",
    btnText: "Ver Decoración",
    btnIcon: <Home size={18} />,
    productos: [
      { name: "Lámpara Rústica", price: "$890", img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=400" },
      { name: "Cojín Bordado", price: "$350", img: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=400" }
    ]
  },
  {
    tag: "CONECTA PARRAL",
    titulo: "HAZ CRECER",
    subtitulo: "TU NEGOCIO",
    desc: "Súmate a la vitrina digital más grande de la región. Vende a todo México con nuestra infraestructura y soporte profesional.",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2400",
    btnText: "Vende en ConectaParral",
    btnIcon: <Store size={18} />,
    isMerchantSlide: true,
    productos: [
      { name: "Registro Gratis", price: "Hoy", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400" },
      { name: "Panel de Ventas", price: "Pro", img: "https://images.unsplash.com/photo-1556740734-7f9585471c6c?q=80&w=400" }
    ]
  }
];

export default function Portada() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % slides.length);
  const prev = () => setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        @keyframes shine {
          100% { transform: translateX(100%); }
        }
        .animate-shine { animation: shine 2s ease-in-out infinite; }
      `}</style>

      <section className="relative w-full h-[90vh] bg-black overflow-hidden font-['Nunito']">
        
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              i === index ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0 pointer-events-none"
            }`}
          >
            <img 
              src={s.img} 
              alt="" 
              className={`w-full h-full object-cover opacity-40 transition-transform duration-[8000ms] linear ${i === index ? 'scale-110' : 'scale-100'}`} 
            />
            
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent lg:from-black/80" />
            
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-12 items-center">
                
                <div className="text-center lg:text-left z-20">
                  <span className="inline-block bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.3em] uppercase mb-6">
                    {s.tag}
                  </span>
                  
                  <h1 className="text-white text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-8 italic">
                    {s.titulo} <br />
                    <span className="text-[#F59E0B] not-italic">{s.subtitulo}</span>
                  </h1>

                  <p className="text-gray-300 text-lg sm:text-xl max-w-xl mb-12 mx-auto lg:mx-0 leading-relaxed font-medium">
                    {s.desc}
                  </p>
                  
                  <div className="flex justify-center lg:justify-start">
                    {s.isMerchantSlide ? (
                      /* BOTÓN AZUL ESPECIAL VENDEDOR */
                      <button className="relative group overflow-hidden px-12 py-5 rounded-full bg-[#1E3A8A] border-2 border-white/20 text-white shadow-[0_0_20px_rgba(30,58,138,0.4)] transition-all hover:scale-105 hover:border-white/50 active:scale-95">
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                        <span className="relative flex items-center gap-3 font-black text-xs tracking-[0.2em] uppercase">
                          {s.btnIcon} {s.btnText}
                        </span>
                      </button>
                    ) : (
                      /* BOTÓN AZUL ESTÁNDAR */
                      <button className="px-12 py-5 font-black text-xs tracking-[0.2em] uppercase rounded-full bg-[#1E3A8A] text-white hover:bg-[#F59E0B] transition-all flex items-center gap-3 shadow-2xl hover:shadow-[#F59E0B]/40 hover:-translate-y-1 active:scale-95">
                        {s.btnIcon} {s.btnText}
                      </button>
                    )}
                  </div>
                </div>

                <div className="hidden lg:flex justify-end gap-6 relative h-[550px] items-center z-20">
                  {s.productos.map((prod, idx) => (
                    <div 
                      key={idx} 
                      className={`
                        relative group backdrop-blur-xl bg-white/5 border border-white/10 p-5 rounded-[3rem] w-64
                        transition-all duration-700 hover:bg-white/10 hover:border-white/30 hover:-translate-y-6
                        ${idx === 1 ? 'mt-32' : ''}
                      `}
                    >
                      <div className="absolute -top-3 -right-3 w-12 h-12 bg-[#F59E0B] rounded-full flex items-center justify-center text-white shadow-xl z-30">
                        <Award size={22} />
                      </div>
                      <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-6 bg-gray-900/40">
                        <img src={prod.img} alt={prod.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </div>
                      <h4 className="font-bold text-white text-sm uppercase tracking-tight mb-2 opacity-90">{prod.name}</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-[#F59E0B] font-black text-2xl tracking-tighter">{prod.price}</span>
                        <button className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#F59E0B] transition-colors shadow-lg">
                          <ArrowRight size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        ))}

        {/* NAVEGACIÓN */}
        <div className="absolute bottom-10 left-0 w-full px-6 lg:px-20 z-40 flex items-center justify-between">
          <div className="flex gap-3 bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/10">
            {slides.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${index === i ? "w-14 bg-[#F59E0B]" : "w-3 bg-white/30 hover:bg-white/60"}`} 
              />
            ))}
          </div>

          <div className="flex gap-4">
            <button onClick={prev} className="w-16 h-16 rounded-full backdrop-blur-xl bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-[#F59E0B] transition-all group shadow-2xl">
              <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={next} className="w-16 h-16 rounded-full backdrop-blur-xl bg-black/40 border border-white/20 flex items-center justify-center text-white hover:bg-[#F59E0B] transition-all group shadow-2xl">
              <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </section>
    </>
  );
}
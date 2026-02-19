import React, { useState, useEffect, useMemo } from "react";
import { 
  SlidersHorizontal, 
  ChevronDown, 
  LayoutGrid, 
  List, 
  DollarSign, 
  ShoppingCart, 
  Heart,
  X
} from "lucide-react";

const PRODUCTOS_DATA = [
  { id: 1, nombre: "Collar de Plata Artesanal", categoria: "Joyería", precio: 850.00, imagen_url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800" },
  { id: 2, nombre: "Sombrero de Paja Tradicional", categoria: "Ropa", precio: 420.00, imagen_url: "https://images.unsplash.com/photo-1533827432537-70133748f5c8?q=80&w=800" },
  { id: 3, nombre: "Bolso de Cuero Curtido", categoria: "Accesorios", precio: 1250.00, imagen_url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800" },
  { id: 4, nombre: "Bufanda de Lana Orgánica", categoria: "Ropa", precio: 350.00, imagen_url: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800" },
  { id: 7, nombre: "Aceite de Oliva Extra Virgen", categoria: "Orgánicos", precio: 240.00, imagen_url: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=800" },
  { id: 8, nombre: "Miel de Abeja Multiflora", categoria: "Orgánicos", precio: 120.00, imagen_url: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=800" },
  { id: 9, nombre: "Café de Altura Tostado", categoria: "Alimentos", precio: 210.00, imagen_url: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800" },
  { id: 10, nombre: "Vino Tinto Artesanal", categoria: "Alimentos", precio: 580.00, imagen_url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800" },
  { id: 11, nombre: "Vaso de Barro Bruñido", categoria: "Artesanías", precio: 320.00, imagen_url: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800" },
  { id: 13, nombre: "Vela Aromática de Soja", categoria: "Hogar", precio: 150.00, imagen_url: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800" },
  { id: 14, nombre: "Maceta de Cerámica Minimal", categoria: "Hogar", precio: 280.00, imagen_url: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800" },
  { id: 15, nombre: "Lámpara de Bambú", categoria: "Hogar", precio: 920.00, imagen_url: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=800" },
];

export default function GaleriaProductos() {
  const [viewMode, setViewMode] = useState("grid");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [favoritos, setFavoritos] = useState([]);
  
  const [categoria, setCategoria] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [onlyFavs, setOnlyFavs] = useState(false); // Nueva opción recomendada
  const [sortBy, setSortBy] = useState("best");

  useEffect(() => {
    const saved = localStorage.getItem("mis_favoritos");
    if (saved) setFavoritos(JSON.parse(saved));
  }, []);

  const toggleFavorito = (id) => {
    const newFavs = favoritos.includes(id) 
      ? favoritos.filter(f => f !== id) 
      : [...favoritos, id];
    setFavoritos(newFavs);
    localStorage.setItem("mis_favoritos", JSON.stringify(newFavs));
  };

  const categorias = useMemo(() => ["", ...new Set(PRODUCTOS_DATA.map(p => p.categoria))].sort(), []);

  const productosFiltrados = useMemo(() => {
    let result = PRODUCTOS_DATA.filter(p => {
      const matchCat = categoria === "" || p.categoria === categoria;
      const matchMin = precioMin === "" || p.precio >= parseFloat(precioMin);
      const matchMax = precioMax === "" || p.precio <= parseFloat(precioMax);
      const matchFav = !onlyFavs || favoritos.includes(p.id);
      return matchCat && matchMin && matchMax && matchFav;
    });

    switch (sortBy) {
      case "az": result.sort((a, b) => a.nombre.localeCompare(b.nombre)); break;
      case "za": result.sort((a, b) => b.nombre.localeCompare(a.nombre)); break;
      case "price_asc": result.sort((a, b) => a.precio - b.precio); break;
      case "price_desc": result.sort((a, b) => b.precio - a.precio); break;
      default: break;
    }
    return result;
  }, [categoria, precioMin, precioMax, sortBy, onlyFavs, favoritos]);

  const closeAll = () => { setIsDrawerOpen(false); setIsSheetOpen(false); };
  const resetFilters = () => { setCategoria(""); setPrecioMin(""); setPrecioMax(""); setOnlyFavs(false); };

  return (
    <section className="py-12 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Productos destacados</h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Selección de lo mejor en artesanías y productos regionales.</p>
        </div>

        {/* HERRAMIENTAS MÓVILES */}
        <div className="sm:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md flex items-center gap-2 py-3 mb-2 border-b border-gray-100">
          <button onClick={() => setIsDrawerOpen(true)} className="flex items-center gap-2 h-10 px-4 border border-gray-200 font-bold text-[13px] text-gray-900 bg-white rounded-md">
            <SlidersHorizontal size={18} /> Filtro
          </button>
          <button onClick={() => setIsSheetOpen(true)} className="flex items-center gap-2 h-10 px-4 border border-gray-200 font-bold text-[13px] text-gray-900 bg-white rounded-md">
            Ordenar por <ChevronDown size={18} />
          </button>
          <div className="ml-auto flex border border-gray-200 overflow-hidden rounded-md">
            <button onClick={() => setViewMode("grid")} className={`w-11 h-10 flex items-center justify-center ${viewMode === 'grid' ? 'bg-slate-900 text-white' : 'bg-white text-gray-400'}`}>
              <LayoutGrid size={18} />
            </button>
            <button onClick={() => setViewMode("list")} className={`w-11 h-10 flex items-center justify-center ${viewMode === 'list' ? 'bg-slate-900 text-white' : 'bg-white text-gray-400'}`}>
              <List size={18} />
            </button>
          </div>
        </div>

        {/* GRID DE PRODUCTOS */}
        <div className={`grid gap-4 sm:gap-8 ${viewMode === "list" ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-4"}`}>
          {productosFiltrados.map((p) => (
            <div key={p.id} className={`group bg-white border border-gray-100 shadow-sm relative transition-all duration-300 flex ${viewMode === "list" ? "flex-row p-3 gap-3" : "flex-col p-3 sm:p-4"}`}>
              <div className={`relative overflow-hidden bg-gray-50 flex-shrink-0 rounded-lg ${viewMode === "list" ? "w-[120px] h-[110px]" : "h-44 sm:h-64"}`}>
                <img src={p.imagen_url} alt={p.nombre} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                <button onClick={() => toggleFavorito(p.id)} className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center z-20 active:scale-90 transition-transform">
                  <Heart size={20} className={favoritos.includes(p.id) ? "fill-red-500 text-red-500" : "text-gray-400"} />
                </button>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px] flex items-center justify-center opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-10 pointer-events-none group-hover:pointer-events-auto">
                  <button className="bg-white px-6 py-2.5 rounded-full text-[11px] sm:text-xs font-bold text-gray-800 shadow-xl">
                    Ver detalles
                  </button>
                </div>
              </div>

              <div className="flex flex-col flex-grow pt-3 sm:pt-4">
                <span className="text-[10px] font-bold text-amber-600 tracking-widest uppercase">{p.categoria}</span>
                <h3 className="font-bold text-sm sm:text-lg leading-tight mt-1 text-gray-900 line-clamp-1">{p.nombre}</h3>
                <div className="mt-auto flex justify-between items-center pt-4">
                  <span className="inline-flex items-baseline text-gray-900">
                    <DollarSign size={16} className="mr-[-1px] stroke-[2.5px] self-center" />
                    <span className="text-xl sm:text-2xl font-black tracking-tight">{p.precio.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</span>
                    <span className="text-[9px] font-bold text-gray-400 ml-1 uppercase">MXN</span>
                  </span>
                  <button className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition hover:bg-slate-800">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- OVERLAYS MÓVILES --- */}
      
      { (isDrawerOpen || isSheetOpen) && <div className="fixed inset-0 bg-black/40 z-[60] sm:hidden" onClick={closeAll} /> }

      {/* FILTROS (IZQUIERDA A DERECHA) */}
      <div className={`fixed inset-y-0 left-0 w-[85%] bg-white z-[70] transform transition-transform duration-300 ease-in-out sm:hidden ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-between items-center border-b">
            <h3 className="font-bold text-lg">Filtros</h3>
            <button onClick={closeAll} className="p-2 border border-gray-200 rounded-md"><X size={20} /></button>
          </div>

          <div className="p-5 flex-grow overflow-y-auto space-y-8">
            {/* Categorías */}
            <div>
              <p className="text-sm font-bold mb-4 flex items-center justify-between">Seleccionar una categoría <ChevronDown size={14}/></p>
              <div className="space-y-4">
                {["Todas", ...categorias.filter(c => c !== "")].map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input type="radio" name="cat" checked={(cat === "Todas" && categoria === "") || categoria === cat} onChange={() => setCategoria(cat === "Todas" ? "" : cat)} className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-full checked:border-orange-600 transition-all" />
                      <div className={`absolute w-2.5 h-2.5 rounded-full bg-orange-600 scale-0 transition-transform ${((cat === "Todas" && categoria === "") || categoria === cat) ? "scale-100" : ""}`} />
                    </div>
                    <span className={`text-[15px] ${((cat === "Todas" && categoria === "") || categoria === cat) ? "text-gray-900 font-bold" : "text-gray-600"}`}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* PRECIO (COMO EN TU IMAGEN) */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm font-bold mb-4 flex items-center justify-between">Precio <ChevronDown size={14}/></p>
              <div className="flex items-center gap-3">
                <div className="flex-1 border border-gray-200 rounded-sm p-3 flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase font-bold">Mín</span>
                    <input 
                      type="number" 
                      value={precioMin} 
                      onChange={(e) => setPrecioMin(e.target.value)} 
                      className="outline-none text-sm w-full pt-1" 
                      placeholder="0"
                    />
                </div>
                <div className="flex-1 border border-gray-200 rounded-sm p-3 flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase font-bold">Máx</span>
                    <input 
                      type="number" 
                      value={precioMax} 
                      onChange={(e) => setPrecioMax(e.target.value)} 
                      className="outline-none text-sm w-full pt-1" 
                      placeholder="9999"
                    />
                </div>
              </div>
            </div>

            {/* OPCIÓN EXTRA: FAVORITOS */}
            <div className="pt-4 border-t border-gray-100">
               <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-bold">Solo mis favoritos</span>
                  <input 
                    type="checkbox" 
                    checked={onlyFavs} 
                    onChange={(e) => setOnlyFavs(e.target.checked)}
                    className="w-5 h-5 accent-orange-600"
                  />
               </label>
            </div>
          </div>

          <div className="p-4 border-t grid grid-cols-2 gap-3">
            <button onClick={resetFilters} className="py-3.5 border rounded-md font-bold text-gray-500 hover:bg-gray-50">Limpiar</button>
            <button onClick={closeAll} className="py-3.5 bg-orange-600 text-white rounded-md font-bold shadow-lg shadow-orange-100">Ver resultados</button>
          </div>
        </div>
      </div>

      {/* ORDENAR POR */}
      <div className={`fixed inset-x-0 bottom-0 bg-white z-[70] transform transition-transform duration-300 ease-in-out sm:hidden rounded-t-[32px] ${isSheetOpen ? "translate-y-0" : "translate-y-full"}`}>
        <div className="p-6 pb-10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg">Ordenar por</h3>
            <button onClick={closeAll} className="p-2 border border-gray-100 rounded-md"><X size={20} /></button>
          </div>
          <div className="space-y-1">
            {[
              { id: 'best', label: 'Más vendidos' },
              { id: 'az', label: 'Alfabéticamente, A-Z' },
              { id: 'za', label: 'Alfabéticamente, Z-A' },
              { id: 'price_asc', label: 'Precio, menor a mayor' },
              { id: 'price_desc', label: 'Precio, mayor a menor' }
            ].map((opt) => (
              <button key={opt.id} onClick={() => { setSortBy(opt.id); setTimeout(closeAll, 200); }} className="w-full flex items-center justify-between py-4 border-b border-gray-50 group">
                <span className={`text-[15px] ${sortBy === opt.id ? 'text-orange-600 font-bold' : 'text-gray-700 font-medium'}`}>{opt.label}</span>
                <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all ${sortBy === opt.id ? 'border-orange-600 bg-orange-600' : 'border-gray-300'}`}>
                  {sortBy === opt.id && <div className="w-2 h-1 border-l-2 border-b-2 border-white -rotate-45 mb-0.5" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
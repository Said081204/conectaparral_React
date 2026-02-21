import { useMemo, useState, useEffect, useRef } from "react";
import { usePage } from "@inertiajs/react";
import { Bell, Search } from "lucide-react"; 

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminHeader({
  onOpenMobileSidebar,
  onToggleSidebar,
  sidebarCollapsed = false,
}) {
  const { props, url } = usePage(); // Extraemos 'url' para saber la ruta actual
  const user = props?.auth?.user;
  const searchInputRef = useRef(null);
  const [search, setSearch] = useState("");

  // Lógica inteligente para el título
  const dynamicTitle = useMemo(() => {
    // 1. Si la URL es dashboard o la raíz de admin, forzamos VISTA GENERAL
    if (url === "/admin/dashboard" || url === "/admin") {
      return "VISTA GENERAL";
    }

    // 2. Si no, extraemos el nombre de la página de la URL
    const pathSegments = url.split('/').filter(Boolean);
    // Tomamos el último segmento (ej: "solicitudes-vendedor")
    const lastSegment = pathSegments[pathSegments.length - 1] || "";
    
    // Lo limpiamos: quitamos guiones y ponemos en mayúsculas
    return lastSegment
      .replace(/-/g, ' ')
      .toUpperCase();
  }, [url]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const initials = useMemo(() => {
    const n = (user?.name || "Said").trim();
    return (n[0] || "S").toUpperCase();
  }, [user?.name]);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-white/[0.08] bg-[#0f172a] backdrop-blur-md shadow-2xl">
      <div className="mx-auto px-6 lg:px-10">
        <div className="flex h-20 items-center justify-between gap-10">
          
          {/* IZQUIERDA: Botón y Título Adaptable */}
          <div className="flex items-center gap-6">
            <button
              onClick={onToggleSidebar}
              className="hidden lg:flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-amber-500 hover:border-amber-500/50 transition-all group"
            >
              <svg 
                className={cx("h-5 w-5 transition-transform duration-500", sidebarCollapsed ? "" : "rotate-180")} 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
              >
                <path d="M13 5l7 7-7 7M5 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex flex-col">
              <h1 className="text-xl font-black text-white tracking-[0.15em] uppercase leading-none">
                {dynamicTitle}
              </h1>
              <div className="h-1 w-12 bg-amber-500 rounded-full mt-2 shadow-[0_0_10px_rgba(245,158,11,0.4)]"></div>
            </div>
          </div>

          {/* CENTRO: Buscador */}
          <div className="hidden md:flex flex-1 max-w-2xl justify-center">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-500 group-focus-within:text-amber-500 transition-colors" strokeWidth={2.5} />
              </div>
              <input
                ref={searchInputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Buscar en el sistema..."
                className="w-full h-12 bg-slate-950/40 border border-white/10 rounded-2xl pl-14 pr-16 text-sm font-semibold transition-all outline-none
                           focus:bg-slate-950/60 focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 placeholder:text-slate-600 text-white shadow-inner"
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-flex items-center h-6 rounded-md border border-white/10 bg-white/5 px-2 font-sans text-[10px] font-bold text-slate-500 uppercase">
                  CTRL K
                </kbd>
              </div>
            </div>
          </div>

          {/* DERECHA: Perfil */}
          <div className="flex items-center gap-6">
            <button className="group relative h-11 w-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-amber-500 hover:bg-white/10 transition-all shadow-lg">
              <Bell className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-amber-500 ring-4 ring-[#0f172a] animate-pulse"></span>
            </button>

            <div className="h-8 w-[1px] bg-white/10 mx-1" />

            <div className="flex items-center gap-4 pl-4 py-1.5 pr-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group">
              <div className="hidden sm:block text-right leading-tight">
                <p className="text-xs font-black text-white group-hover:text-amber-500 transition-colors uppercase tracking-tight">
                  {user?.name || "Said"}
                </p>
                <p className="text-[9px] font-bold text-amber-500/60 tracking-[0.2em] mt-1 uppercase">
                  Administrador
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-amber-500 text-[#0f172a] flex items-center justify-center text-sm font-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                {initials}
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
import { useMemo } from "react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AdminFooter({ className = "" }) {
  const year = new Date().getFullYear();

  return (
    <footer className={cx("w-full border-t border-white/[0.05] bg-[#0f172a] py-10", className)}>
      <div className="px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          {/* SECCIÓN MARCA: Logo Interactivo + Nombre en CamelCase */}
          <div className="flex items-center gap-6 group">
            <div className="relative">
              {/* Aura de luz sutil detrás del icono */}
              <div className="absolute -inset-2 bg-amber-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <img 
                src="/img/favicon-16.png" 
                alt="Favicon CP" 
                className="relative h-10 w-10 object-contain filter brightness-110 contrast-110 drop-shadow-[0_0_12px_rgba(245,158,11,0.3)] transition-all duration-700 ease-in-out group-hover:rotate-[360deg] group-hover:scale-110"
              />
            </div>

            <div className="flex flex-col border-l-2 border-amber-500/20 pl-6 transition-colors group-hover:border-amber-500/50">
              <span className="text-xl font-bold tracking-tight text-white leading-tight">
                Conecta<span className="text-amber-500">Parral</span>
              </span>
              {/* Texto actualizado: Más acorde a un Admin Panel */}
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mt-1 transition-colors group-hover:text-slate-400">
                Consola de Gestión
              </span>
            </div>
          </div>

          {/* SECCIÓN INFO: Ubicación Estilizada y Copyright */}
          <div className="flex flex-col md:items-end gap-3">
            <div className="flex items-center gap-3 bg-slate-950/50 border border-white/5 px-5 py-2 rounded-2xl shadow-inner group/loc cursor-default">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </div>
              <p className="text-[11px] font-bold text-slate-300 uppercase tracking-[0.1em]">
                Hecho en <span className="text-white group-hover/loc:text-amber-500 transition-colors">Parral, Chihuahua</span>
              </p>
            </div>
            
            <div className="flex items-center gap-4 pr-2">
              <div className="h-px w-8 bg-white/10"></div>
              <p className="text-[10px] font-medium text-slate-600 uppercase tracking-widest">
                © {year} Todos los derechos reservados
              </p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
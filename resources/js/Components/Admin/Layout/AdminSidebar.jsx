import { Link, usePage } from "@inertiajs/react";

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavItem({ href, label, icon, active, collapsed }) {
  return (
    <Link
      href={href}
      className={cx(
        "group relative flex items-center transition-all duration-200",
        collapsed ? "justify-center px-2 py-3" : "gap-3 px-4 py-2.5 mx-3 rounded-xl",
        active
          ? "bg-amber-500/10 text-amber-500" 
          : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
      )}
    >
      {active && !collapsed && (
        <div className="absolute left-0 w-1 h-6 bg-amber-500 rounded-r-full" />
      )}

      <span className={cx(
        "transition-transform duration-200 shrink-0",
        active ? "text-amber-500" : "text-slate-500 group-hover:text-slate-300"
      )}>
        {icon}
      </span>

      {!collapsed && (
        <span className={cx(
          "truncate text-sm tracking-wide transition-all",
          active ? "font-bold" : "font-medium"
        )}>
          {label}
        </span>
      )}
    </Link>
  );
}

function Icon({ name, className = "h-5 w-5" }) {
  const common = cx(className, "stroke-[2px]"); 
  switch (name) {
    case "dashboard": return <svg className={common} viewBox="0 0 24 24" fill="currentColor"><path d="M4 13h7V4H4v9Zm9 7h7V11h-7v9ZM4 20h7v-5H4v5Zm9-11h7V4h-7v5Z"/></svg>;
    case "requests": return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10M7 12h10M7 17h6"/></svg>;
    case "vendors": return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>;
    case "products": return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/></svg>;
    case "orders": return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
    case "finance": return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
    case "settings": return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>;
    case "store": return <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    default: return null;
  }
}

export default function AdminSidebar({
  currentUrl = "",
  collapsed = false,
  mobileOpen = false,
  onCloseMobile,
}) {
  const { props } = usePage();
  const user = props?.auth?.user;

  const nav = [
    { href: "/admin/dashboard", label: "Dashboard", key: "dashboard" },
    { href: "/admin/solicitudes-vendedor", label: "Solicitudes", key: "requests" },
    { href: "/admin/vendedores", label: "Vendedores", key: "vendors" },
    { href: "/admin/productos", label: "Productos", key: "products" },
    { href: "/admin/pedidos", label: "Pedidos", key: "orders" },
    { href: "/admin/finanzas", label: "Finanzas", key: "finance" },
    { href: "/admin/configuracion", label: "Configuración", key: "settings" },
  ];

  const isActive = (href) => currentUrl === href || currentUrl.startsWith(href + "/");

  return (
    <>
      <div className={cx("fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden transition-opacity", mobileOpen ? "opacity-100" : "pointer-events-none opacity-0")} onClick={onCloseMobile} />

      <aside className={cx(
        "fixed inset-y-0 left-0 z-50 bg-[#0F172A] border-r border-white/5 transition-all duration-300",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        collapsed ? "w-20" : "w-64" 
      )}>
        <div className="flex h-full flex-col">
          
          {/* Logo Brand con Favicon Dinámico */}
          <div className={cx("h-20 flex items-center transition-all", collapsed ? "justify-center" : "px-6")}>
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <img 
                src="/img/favicon-16.png" 
                alt="Favicon" 
                className="h-8 w-8 shrink-0 object-contain filter brightness-110 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]"
              />
              {!collapsed && (
                <span className="text-white font-bold text-lg tracking-tight">
                  Conecta<span className="text-amber-500">Parral</span>
                </span>
              )}
            </Link>
          </div>

          {/* Navegación Principal */}
          <nav className="flex-1 py-4 space-y-1">
            {nav.map((item) => (
              <NavItem
                key={item.key}
                href={item.href}
                label={item.label}
                collapsed={collapsed}
                active={isActive(item.href)}
                icon={<Icon name={item.key} />}
              />
            ))}
          </nav>

          {/* Botón Ver Tienda Refinado */}
          <div className="px-4 mb-6">
            <Link 
              href="/" 
              className={cx(
                "flex items-center transition-all duration-300 group",
                collapsed 
                  ? "justify-center h-12 w-12 mx-auto rounded-xl bg-amber-500 text-[#0F172A] shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-105" 
                  : "gap-3 px-5 py-3.5 rounded-xl bg-amber-500 text-[#0F172A] hover:bg-amber-400 shadow-[0_8px_20px_-6px_rgba(245,158,11,0.4)] hover:-translate-y-0.5"
              )}
            >
              <Icon name="store" className={cx("transition-transform group-hover:scale-110", collapsed ? "h-6 w-6" : "h-5 w-5")} />
              {!collapsed && (
                <span className="font-black text-[13px] uppercase tracking-wider">
                  Ver Tienda
                </span>
              )}
            </Link>
          </div>

          {/* Perfil de Usuario */}
          <div className="p-4 bg-white/[0.02] border-t border-white/5">
            <div className={cx("flex items-center gap-3 px-2 py-2 rounded-xl transition-colors", !collapsed && "hover:bg-white/5")}>
              <div className="h-10 w-10 shrink-0 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-amber-500 text-xs uppercase shadow-inner">
                {(user?.name?.[0] || "A")}
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-slate-200">{user?.name || "Admin"}</div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    <span className="text-[11px] text-slate-500 font-bold uppercase tracking-tighter">En línea</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
import React, { useState, useEffect, useRef } from 'react';
import { Link, router } from '@inertiajs/react';

export default function Header({ user = null }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.get('/products', { search: searchQuery });
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <header id="mainHeader" className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm antialiased" style={{ fontFamily: 'Arial, sans-serif' }}>
      
      {/* ================= NAV PRINCIPAL (DESKTOP & MOBILE) ================= */}
      <nav className="w-full flex items-center justify-between h-[76px] md:h-[90px] gap-4 px-[3%] md:px-[5%]">
        
        {/* LOGO */}
        <Link href="/" className="flex-shrink-0 cursor-pointer active:scale-95 transition-transform">
          <img src="/img/cppp.png" alt="ConectaParral" className="h-[45px] md:h-[60px] lg:h-[70px] w-auto object-contain" />
        </Link>

        {/* BUSCADOR DESKTOP */}
        <form onSubmit={handleSearch} className="hidden md:flex w-full justify-center px-4 mx-auto">
          <div className="relative w-full max-w-[1000px]">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full bg-[#f0f2f2] border-none rounded-full py-3 pl-12 pr-14 text-[16px] focus:bg-white focus:ring-2 focus:ring-[#F59E0B] outline-none transition-all"
            />
            <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#1E3A8A] text-white w-12 h-[42px] flex items-center justify-center rounded-full hover:bg-blue-800 transition shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" />
              </svg>
            </button>
          </div>
        </form>

        {/* ACCIONES DERECHA */}
        <div className="flex items-center gap-2 md:gap-4 lg:gap-8 flex-shrink-0">
          
          <button onClick={toggleSearch} className="md:hidden p-2 text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" />
            </svg>
          </button>

          {/* CUENTA DESKTOP */}
          <Link href={user ? "/profile" : "/login"} className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition text-left">
            <img src="/icons/usuario.svg" alt="User" className="w-6 h-6 md:w-7 md:h-7" />
            <div className="hidden lg:flex flex-col -space-y-1">
              <span className="text-[12px] text-gray-500 font-bold">Hola, {user ? user.name.split(' ')[0] : 'Identifícate'}</span>
              <span className="text-[15px] font-bold text-gray-900 leading-tight">Mi Cuenta</span>
            </div>
          </Link>

          {/* PEDIDOS DESKTOP (IMPORTANTE: SE MANTIENE) */}
          <Link href="/orders" className="hidden md:flex items-center gap-2 px-4 py-2 border-l border-gray-100 hover:bg-gray-50 transition text-left">
            <img src="/icons/pedidos.svg" alt="Pedidos" className="w-6 h-6 md:w-7 md:h-7" />
            <div className="hidden lg:flex flex-col leading-tight">
              <span className="text-[12px] text-gray-500">Devoluciones</span>
              <span className="text-[15px] font-bold text-gray-900 leading-tight">y Pedidos</span>
            </div>
          </Link>

          {/* CARRITO */}
          <Link href="/cart" className="relative p-2 hover:bg-gray-50 rounded-full transition">
            <img src="/icons/carrito.svg" alt="Carrito" className="w-7 h-7 md:w-8 md:h-8" />
            <span className="absolute -top-1 -right-1 bg-[#1E3A8A] text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">2</span>
          </Link>

          <button onClick={toggleSidebar} className="flex md:hidden p-2 rounded-lg hover:bg-gray-100 transition active:scale-90">
            <img src="/icons/menu.svg" alt="Menú" className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* ================= SIDEBAR MÓVIL ================= */}
      <div className={`fixed inset-y-0 right-0 w-[310px] bg-white z-[110] shadow-2xl transform transition-transform duration-500 md:hidden flex flex-col ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Banner Superior Premium */}
        <div className="px-6 pt-14 pb-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="flex justify-between items-start relative z-10">
            <div className="flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#1E3A8A] flex items-center justify-center shadow-lg shadow-blue-200">
                <img src="/icons/usuario.svg" className="w-8 h-8 brightness-0 invert" alt="User" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 leading-tight">
                  {user ? `¡Hola, ${user.name.split(' ')[0]}!` : '¡Bienvenido!'}
                </h2>
                <p className="text-[11px] text-[#1E3A8A] font-bold uppercase tracking-widest mt-1">
                  {user ? 'Cuenta de cliente' : 'A ConectaParral'}
                </p>
              </div>
            </div>
            <button onClick={toggleSidebar} className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-100 text-gray-400 text-2xl active:scale-90 transition">&times;</button>
          </div>
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-50 rounded-full opacity-50" />
        </div>

        {/* Opciones del Menú */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <nav className="space-y-1">
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-4">Menú</p>
            <SidebarItem href="/" text="Inicio" icon="home" onClick={toggleSidebar} />
            <SidebarItem href="/orders" text="Mis Pedidos" icon="package" onClick={toggleSidebar} />
            <SidebarItem href="/cart" text="Mi Carrito" icon="shopping-cart" onClick={toggleSidebar} badge="2" />
            
            <div className="h-px bg-gray-50 my-6 mx-4" />
            
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-4">Usuario</p>

            {!user ? (
              <>
                <SidebarItem href="/login" text="Entrar" icon="login" onClick={toggleSidebar} />
                <SidebarItem href="/register" text="Registrarme" icon="register" onClick={toggleSidebar} />
              </>
            ) : (
              <>
                <SidebarItem href="/profile" text="Mi Perfil" icon="user" onClick={toggleSidebar} />
                <button 
                  onClick={() => { router.post('/logout'); toggleSidebar(); }}
                  className="w-full flex items-center gap-4 px-4 py-4 text-red-500 font-bold text-[15px] hover:bg-red-50 rounded-2xl transition-all"
                >
                  <div className="w-6 flex justify-center text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <span>Cerrar Sesión</span>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>

      {isSidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black/60 backdrop-blur-[3px] z-[105] md:hidden transition-all duration-500" />
      )}
    </header>
  );
}

function SidebarItem({ href, text, onClick, badge = null, icon }) {
  const icons = {
    "home": <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    "package": <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
    "shopping-cart": <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />,
    "user": <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    "login": <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />,
    "register": <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  };

  return (
    <Link href={href} onClick={onClick} className="flex items-center justify-between px-4 py-4 rounded-2xl transition-all active:scale-[0.96] group hover:bg-blue-50 text-gray-700 font-bold">
      <div className="flex items-center gap-4">
        <div className="w-6 flex justify-center text-[#1E3A8A] opacity-70 group-hover:opacity-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>{icons[icon]}</svg>
        </div>
        <span className="text-[15px] tracking-tight">{text}</span>
      </div>
      {badge && <span className="text-[10px] font-black px-2 py-0.5 rounded-lg bg-[#1E3A8A] text-white">{badge}</span>}
    </Link>
  );
}
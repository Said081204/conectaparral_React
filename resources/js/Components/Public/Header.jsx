import React, { useState } from 'react';
import { Link } from '@inertiajs/react'; // Importante para navegación rápida

export default function Header({ user = null }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <header id="mainHeader" className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 shadow-sm antialiased">
      {/* ================= NAV PRINCIPAL ================= */}
      <nav id="headerContainer" className="w-full flex items-center justify-between h-[76px] md:h-[90px] gap-4 px-[3%] md:px-[5%]">

        {/* LOGO */}
        <Link href="/" id="logoBtn" className="flex-shrink-0 cursor-pointer active:scale-95 transition-transform">
          <img 
            src="/img/cppp.png" 
            alt="ConectaParral" 
            className="h-[45px] md:h-[60px] lg:h-[70px] w-auto object-contain" 
          />
        </Link>

        {/* ================= BUSCADOR (md+) ================= */}
        <div className="hidden md:flex w-full justify-center px-4 mx-auto">
          <div className="relative w-full max-w-[1000px]">
            <input 
              type="text" 
              placeholder="Buscar productos..."
              className="w-full bg-[#f0f2f2] border-none rounded-full py-3 pl-12 pr-14 text-[16px] focus:bg-white focus:ring-2 focus:ring-[#F59E0B] outline-none transition-all"
            />

            {/* LUPA IZQUIERDA */}
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
              </svg>
            </span>

            {/* BOTÓN BUSCAR */}
            <button 
              type="button"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#1E3A8A] text-white w-12 h-[42px] flex items-center justify-center rounded-full hover:bg-blue-800 transition shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
              </svg>
            </button>
          </div>
        </div>

        {/* ================= ACCIONES DERECHA ================= */}
        <div className="flex items-center gap-2 md:gap-4 lg:gap-8 flex-shrink-0">

          {/* LUPA MÓVIL */}
          <button onClick={toggleSearch} className="md:hidden p-2 text-gray-700 active:scale-125 transition">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </button>

          {/* ================= USUARIO ================= */}
          {!user ? (
            <Link href="/login" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 active:scale-95 transition text-left">
              <img src="/icons/usuario.svg" alt="Iniciar sesión" className="w-6 h-6 md:w-7 md:h-7" />
              <div className="hidden lg:flex flex-col -space-y-1">
                <span className="text-[12px] text-gray-500">Hola</span>
                <span className="text-[15px] font-bold text-gray-900">Inicia sesión</span>
              </div>
            </Link>
          ) : (
            <Link href="/profile" className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 active:scale-95 transition text-left">
              <img src="/icons/usuario.svg" alt="Mi cuenta" className="w-6 h-6 md:w-7 md:h-7" />
              <div className="hidden lg:flex flex-col -space-y-1">
                <span className="text-[12px] text-gray-500">Hola, {user.name}</span>
                <span className="text-[15px] font-bold text-gray-900">Mi Cuenta</span>
              </div>
            </Link>
          )}

          {/* ================= PEDIDOS ================= */}
          <Link href="/orders" className="hidden md:flex items-center gap-2 px-4 py-2 border-l border-gray-100 hover:bg-gray-50 active:scale-95 transition text-left">
            <img src="/icons/pedidos.svg" alt="Pedidos" className="w-6 h-6 md:w-7 md:h-7" />
            <div className="hidden lg:flex flex-col leading-tight">
              <span className="text-[12px] text-gray-500">Devoluciones</span>
              <span className="text-[15px] font-bold text-gray-900">y Pedidos</span>
            </div>
          </Link>

          {/* ================= CARRITO ================= */}
          <Link href="/cart" className="relative p-2 hover:bg-gray-50 rounded-full active:scale-90 transition">
            <img src="/icons/carrito.svg" alt="Carrito" className="w-7 h-7 md:w-8 md:h-8" />
            <span className="absolute -top-1 -right-1 bg-[#1E3A8A] text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
              2
            </span>
          </Link>

          {/* ================= MENÚ HAMBURGUESA ================= */}
          <button onClick={toggleSidebar} className="flex md:hidden p-2 rounded-lg hover:bg-gray-100 active:scale-90 transition">
            <img src="/icons/menu.svg" alt="Menú" className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* ================= SIDEBAR MÓVIL ================= */}
      <div className={`fixed inset-y-0 right-0 w-[280px] bg-white z-[110] shadow-2xl transform transition-transform duration-300 md:hidden flex flex-col ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 border-b flex justify-between items-center bg-gray-50">
          <span className="font-bold text-xl text-[#1E3A8A]">Menú</span>
          <button onClick={toggleSidebar} className="text-3xl text-gray-400">&times;</button>
        </div>

        <div className="p-4 flex flex-col">
          <Link href="/" onClick={toggleSidebar} className="py-3 px-2 hover:bg-amber-50 rounded-lg">Inicio</Link>
          
          {!user ? (
            <>
              <Link href="/login" onClick={toggleSidebar} className="py-3 px-2 hover:bg-amber-50 rounded-lg">Iniciar sesión</Link>
              <Link href="/register" onClick={toggleSidebar} className="py-3 px-2 hover:bg-amber-50 rounded-lg">Registrarme</Link>
            </>
          ) : (
            <>
              <span className="py-3 px-2 text-gray-400 text-sm italic">Hola, {user.name}</span>
              <Link href="/profile" onClick={toggleSidebar} className="py-3 px-2 hover:bg-amber-50 rounded-lg font-bold text-[#1E3A8A]">Mi Cuenta</Link>
              <Link 
                href="/logout" 
                method="post" 
                as="button" 
                className="w-full text-left py-3 px-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                Cerrar sesión
              </Link>
            </>
          )}

          <Link href="/orders" onClick={toggleSidebar} className="py-3 px-2 hover:bg-amber-50 rounded-lg">Pedidos</Link>
          <Link href="/cart" onClick={toggleSidebar} className="py-3 px-2 hover:bg-amber-50 rounded-lg">Carrito</Link>
        </div>
      </div>

      {/* OVERLAY FONDO OSCURO */}
      {isSidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105] md:hidden transition-opacity duration-300" />
      )}
    </header>
  );
}
import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
  MapPin, 
  Mail, 
  ShieldCheck,
  ChevronUp,
  LogOut,
  User
} from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const { auth } = usePage().props;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F172A] text-[#F8FAFC] py-12 border-t border-[#1E293B] font-['Arial',_sans-serif] relative">
      
      {/* BOTÓN VOLVER ARRIBA */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button 
          onClick={scrollToTop}
          className="bg-[#F59E0B] p-2.5 rounded-full shadow-lg hover:bg-white hover:text-[#1E3A8A] transition-all text-white border-2 border-[#0F172A] z-10"
          title="Subir al inicio"
        >
          <ChevronUp size={18} />
        </button>
      </div>

      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">

          {/* COLUMNA 1: IDENTIDAD Y CONTACTO DIRECTO */}
          <div className="flex flex-col lg:col-span-1">
            <Link href="/">
              <img 
                src="/img/cppp.png" 
                alt="ConectaParral" 
                className="h-10 w-auto object-contain mb-5 brightness-125" 
              />
            </Link>
            <p className="text-[13px] leading-snug mb-6 text-[#94A3B8] font-medium">
              Impulsando el comercio de nuestra ciudad. Lo mejor de Parral en un solo lugar.
            </p>

            {/* APARTADO DE CONTACTO */}
            <div className="space-y-4">
              <h3 className="font-bold text-white text-[12px] uppercase tracking-widest border-b border-white/10 pb-1 w-fit">
                Contacto
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#CBD5E1] text-[13px]">
                  <MapPin size={16} className="text-[#F59E0B] shrink-0" />
                  <span>Parral, Chihuahua.</span>
                </div>
                <a 
                  href="mailto:soporte@conectaparral.com" 
                  className="flex items-center gap-3 text-[#CBD5E1] hover:text-[#F59E0B] transition-colors text-[13px] truncate"
                >
                  <Mail size={16} className="text-[#F59E0B] shrink-0" />
                  <span>soporte@conectaparral.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* COLUMNA 2: MI CUENTA */}
          <div>
            <h3 className="font-bold text-white text-[12px] uppercase mb-5 tracking-widest border-b border-white/10 pb-1">
              Mi Cuenta
            </h3>
            <ul className="space-y-3 text-[13px] text-[#CBD5E1]">
              {!auth.user ? (
                <>
                  <li><Link href="/login" className="hover:text-[#F59E0B] transition-colors">Ingresar</Link></li>
                  <li><Link href="/register" className="hover:text-[#F59E0B] transition-colors">Crear Cuenta</Link></li>
                </>
              ) : (
                <>
                  <li><Link href="/profile" className="hover:text-[#F59E0B] transition-colors flex items-center gap-2"><User size={14}/> Mi Perfil</Link></li>
                  <li><Link href="/orders" className="hover:text-[#F59E0B] transition-colors">Mis Pedidos</Link></li>
                  <li>
                    <Link 
                      href={route('logout')} 
                      method="post" 
                      as="button" 
                      className="hover:text-red-400 transition-colors flex items-center gap-2 w-full text-left"
                    >
                      <LogOut size={14}/> Cerrar Sesión
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* COLUMNA 3: AYUDA */}
          <div>
            <h3 className="font-bold text-white text-[12px] uppercase mb-5 tracking-widest border-b border-white/10 pb-1">
              Soporte
            </h3>
            <ul className="space-y-3 text-[13px] text-[#CBD5E1]">
              <li>
                <Link href="/vender" className="text-[#F59E0B] font-bold hover:text-white transition-colors">
                  ¡Quiero Vender!
                </Link>
              </li>
              <li><Link href="/ayuda" className="hover:text-[#F59E0B] transition-colors">Centro de Ayuda</Link></li>
              <li><Link href="/faq" className="hover:text-[#F59E0B] transition-colors">Preguntas Frecuentes</Link></li>
            </ul>
          </div>

          {/* COLUMNA 4: LEGAL */}
          <div>
            <h3 className="font-bold text-white text-[12px] uppercase mb-5 tracking-widest border-b border-white/10 pb-1">
              Legal
            </h3>
            <ul className="space-y-3 text-[13px] text-[#CBD5E1]">
              <li><Link href="/terminos" className="hover:text-[#F59E0B] transition-colors leading-tight block">Términos y Condiciones</Link></li>
              <li><Link href="/privacidad" className="hover:text-[#F59E0B] transition-colors leading-tight block">Aviso de Privacidad</Link></li>
              <li><Link href="/envios" className="hover:text-[#F59E0B] transition-colors leading-tight block">Políticas de Envío</Link></li>
              <li><Link href="/devoluciones" className="hover:text-[#F59E0B] transition-colors leading-tight block">Devoluciones</Link></li>
            </ul>
          </div>

          {/* COLUMNA 5: PAGOS */}
          <div className="flex flex-col">
            <h3 className="font-bold text-white text-[12px] uppercase mb-5 tracking-widest border-b border-white/10 pb-1">
              Pagos
            </h3>
            <div className="flex flex-wrap gap-3 items-center mb-5">
              <img src="/img/pagos/visa.svg" className="h-5 w-auto object-contain" alt="Visa" />
              <img src="/img/pagos/mastercard.svg" className="h-7 w-auto object-contain" alt="Mastercard" />
              <img src="/img/pagos/amex.svg" className="h-6 w-auto object-contain" alt="Amex" />
              <img src="/img/pagos/oxxo.svg" className="h-6 w-auto object-contain" alt="OXXO" />
              <img src="/img/pagos/spei.svg" className="h-6 w-auto object-contain" alt="SPEI" />
            </div>
            
            <div className="border-t border-white/5 pt-4">
              <span className="text-[10px] uppercase text-[#64748B] font-bold block mb-2 tracking-tighter">Procesamiento seguro:</span>
              <img 
                src="/img/pagos/stripe.svg" 
                className="h-10 w-auto object-contain self-start" 
                alt="Stripe" 
              />
              <p className="text-[11px] flex items-center gap-1.5 text-green-400 font-bold mt-3 italic">
                <ShieldCheck size={14} /> Pagos protegidos SSL
              </p>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center">
          <p className="text-[11px] tracking-[0.2em] font-medium text-white/30 uppercase">
            © {year} CONECTAPARRAL — TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </div>
    </footer>
  );
}
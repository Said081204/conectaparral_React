import React from 'react';
import { 
  Facebook, 
  Instagram, 
  MapPin, 
  Mail, 
  ShieldCheck 
} from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-gray-700 py-14 border-t border-gray-200">
      <div className="container mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* LOGO + DESCRIPCIÓN */}
          <div className="lg:col-span-1">
            <img 
              src="/img/cppp.png" 
              alt="ConectaParral" 
              className="h-12 w-auto object-contain mb-6" 
            />

            <p className="text-gray-600 text-sm leading-relaxed">
              La plataforma oficial para impulsar el comercio de nuestra ciudad.
              Encuentra lo mejor de Parral en un solo lugar.
            </p>

            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-[#1877F2] transition-colors">
                <Facebook size={20} fill="currentColor" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#E4405F] transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* MI CUENTA */}
          <div>
            <h3 className="font-bold text-gray-900 text-sm uppercase mb-6 tracking-wider">
              Mi Cuenta
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Ingresar</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Crear Cuenta</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Mis Pedidos</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">Favoritos</a></li>
            </ul>
          </div>

          {/* OPORTUNIDADES */}
          <div>
            <h3 className="font-bold text-gray-900 text-sm uppercase mb-6 tracking-wider">
              Oportunidades
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-orange-600 font-bold hover:text-orange-700 transition-colors">¡Quiero Vender!</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 font-medium transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="font-bold text-gray-900 text-sm uppercase mb-6 tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><a href="#" className="hover:text-orange-500 font-medium transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-orange-500 font-medium transition-colors">Aviso de Privacidad</a></li>
              <li><a href="#" className="hover:text-orange-500 font-medium transition-colors">Políticas de Envío</a></li>
              <li><a href="#" className="hover:text-orange-500 font-medium transition-colors">Políticas de Devolución</a></li>
            </ul>
          </div>

          {/* CONTACTO + MÉTODOS DE PAGO */}
          <div>
            <h3 className="font-bold text-gray-900 text-sm uppercase mb-6 tracking-wider">
              Contacto
            </h3>

            <div className="space-y-4 text-sm text-gray-600">
              <p className="flex items-start">
                <MapPin size={18} className="mt-1 mr-3 text-orange-500 flex-shrink-0" />
                Parral, Chihuahua, México.
              </p>

              <a 
                href="mailto:soporte@conectaparral.com?subject=Soporte%20ConectaParral"
                className="flex items-center text-gray-600 hover:text-orange-500 font-medium transition-colors"
              >
                <Mail size={18} className="mr-3 text-orange-500 flex-shrink-0" />
                soporte@conectaparral.com
              </a>

              {/* MÉTODOS DE PAGO */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-[10px] font-bold tracking-widest uppercase text-gray-900 mb-3">
                  Aceptamos
                </h4>

                {/* MÉTODOS DE PAGO CORREGIDOS */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                {/* Eliminamos 'grayscale' y 'hover:grayscale-0' de todas las imágenes */}
                <img src="/img/pagos/visa.svg" className="h-6 opacity-90 hover:opacity-100 transition" alt="Visa" />
                <img src="/img/pagos/mastercard.svg" className="h-6 opacity-90 hover:opacity-100 transition" alt="Mastercard" />
                <img src="/img/pagos/amex.svg" className="h-6 opacity-90 hover:opacity-100 transition" alt="Amex" />
                <img src="/img/pagos/oxxo.svg" className="h-6 opacity-90 hover:opacity-100 transition" alt="OXXO" />
                <img src="/img/pagos/spei.svg" className="h-6 opacity-90 hover:opacity-100 transition" alt="SPEI" />
                </div>

                <div className="flex items-center gap-2 border-t border-gray-100 pt-3">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                    Procesado por
                  </span>
                  <img src="/img/pagos/stripe.svg" className="h-5 opacity-90" alt="Stripe" />
                </div>

                <p className="mt-2 text-[9px] font-semibold italic leading-tight text-gray-400 flex items-center gap-1">
                  <ShieldCheck size={10} className="text-green-500" />
                  Pagos protegidos con cifrado SSL y estándares PCI-DSS.
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-200 pt-8 mt-12 text-center">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
            © {year} ConectaParral — Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
}
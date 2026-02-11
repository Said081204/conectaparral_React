import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col antialiased text-gray-900 bg-gray-50 font-['Nunito']">
            
            {/* HEADER CON LOGO */}
            <header className="bg-white border-b border-gray-200">
                <div className="mx-auto w-full max-w-[1600px] px-6 h-[96px] flex items-center justify-center">
                    <Link href="/">
                        <img
                            src="/img/cppp.png" // Asegúrate de que la ruta coincida con public/img/cppp.png
                            alt="ConectaParral"
                            className="h-12 md:h-14 2xl:h-16 w-auto object-contain select-none"
                            draggable="false"
                        />
                    </Link>
                </div>
            </header>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-1 px-6 pt-8 md:pt-10 lg:pt-12 pb-12">
                <div className="mx-auto w-full max-w-[1600px]">
                    
                    {/* CARD CENTRADA */}
                    <div className="mx-auto w-full max-w-[520px] 2xl:max-w-[640px]">
                        
                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.15)]">
                            
                            {/* FRANJA DE MARCA (DEGRADADO) */}
                            <div className="h-[6px] bg-gradient-to-r from-[#1E3A8A]/90 via-blue-600/70 to-amber-400/85"></div>

                            {/* CONTENIDO DEL FORM (Aquí cae el Login o Register) */}
                            <div className="p-8 2xl:p-12">
                                {children}
                            </div>

                        </div>

                        {/* FOOTER LEGAL */}
                        <footer className="mt-8 text-center text-xs 2xl:text-sm text-gray-500 font-['Nunito']">
                            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                                <Link href="/terminos" className="hover:underline">Condiciones de uso</Link>
                                <Link href="/privacidad" className="hover:underline">Privacidad</Link>
                                <Link href="/ayuda" className="hover:underline">Ayuda</Link>
                            </div>
                            <div className="mt-2">
                                © {new Date().getFullYear()} ConectaParral
                            </div>
                        </footer>

                    </div>
                </div>
            </main>
        </div>
    );
}
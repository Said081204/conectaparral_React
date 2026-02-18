import React, { useState, useEffect } from "react";
import { Head, Link } from '@inertiajs/react';
import Header from "@/Components/Public/Header";
import Footer from "@/Components/Public/Footer";
import { 
    User, Lock, MapPin, ShoppingBag, LogOut, ChevronRight, 
    FileText, ShieldAlert, Info, Truck, RotateCcw, Home 
} from "lucide-react";

// Parciales existentes
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteUserForm from './Partials/DeleteUserForm';

// Nuevos Parciales
import MyOrders from './Partials/MyOrders';
import AddressManager from './Partials/AddressManager';

export default function Edit({ auth, mustVerifyEmail, status, addresses = [] }) {
    // Estado inicial: intentamos leer de la URL, si no, por defecto 'pedidos'
    const [activeSection, setActiveSection] = useState('pedidos');
    const [showForm, setShowForm] = useState(false);

    // Lógica para detectar el cambio de sección mediante parámetros URL (?tab=...)
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        
        const validTabs = ['pedidos', 'direcciones', 'perfil', 'password', 'legal'];
        if (tab && validTabs.includes(tab)) {
            setActiveSection(tab);
        }
    }, []);

    const mainStyle = { 
        fontFamily: "'Nunito', sans-serif",
        WebkitFontSmoothing: 'antialiased',
        color: '#1F2937'
    };

    const changeSection = (section) => {
        setActiveSection(section);
        setShowForm(false);
        // Opcional: Limpia la URL para evitar comportamientos extraños al recargar
        window.history.replaceState({}, '', window.location.pathname);
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB]" style={mainStyle}>
            <Head title="Mi Cuenta | ConectaParral" />
            <Header user={auth.user} />

            <div className="h-20 md:h-28 lg:h-32"></div>

            <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-24">
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
                    
                    {/* SIDEBAR */}
                    <aside className="w-full lg:w-80 shrink-0">
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm overflow-hidden sticky top-24">
                            <div className="p-6 bg-[#1E3A8A] text-white">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 bg-[#F59E0B] rounded-xl flex items-center justify-center text-[#1E3A8A] text-xl font-extrabold shadow-inner shrink-0">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest text-[#F59E0B]">Panel de Usuario</p>
                                        <p className="font-extrabold truncate text-lg leading-tight">{auth.user.name}</p>
                                    </div>
                                </div>
                            </div>

                            <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible p-3 gap-1 no-scrollbar bg-white">
                                <Link 
                                    href="/" 
                                    className="flex items-center gap-4 px-5 py-4 text-xs font-black uppercase tracking-[1px] text-[#1E3A8A] hover:bg-blue-50 rounded-xl transition-all border-b border-[#F3F4F6] mb-2 group"
                                >
                                    <Home size={18} className="group-hover:scale-110 transition-transform text-[#F59E0B]" strokeWidth={2.5} />
                                    Ir a la Tienda
                                </Link>

                                <div className="hidden lg:block"><SectionTitle label="Actividad" /></div>
                                <SidebarLink label="Mis Pedidos" icon={<ShoppingBag size={20}/>} active={activeSection === 'pedidos'} onClick={() => changeSection('pedidos')} />
                                <SidebarLink label="Direcciones" icon={<MapPin size={20}/>} active={activeSection === 'direcciones'} onClick={() => changeSection('direcciones')} />
                                
                                <div className="hidden lg:block h-2"></div>
                                <div className="hidden lg:block"><SectionTitle label="Configuración" /></div>
                                <SidebarLink label="Perfil" icon={<User size={20}/>} active={activeSection === 'perfil'} onClick={() => changeSection('perfil')} />
                                <SidebarLink label="Seguridad" icon={<Lock size={20}/>} active={activeSection === 'password'} onClick={() => changeSection('password')} />
                                
                                <div className="hidden lg:block h-2"></div>
                                <div className="hidden lg:block"><SectionTitle label="Información" /></div>
                                <SidebarLink label="Legal" icon={<FileText size={20}/>} active={activeSection === 'legal'} onClick={() => changeSection('legal')} />
                                
                                <Link 
                                    href={route('logout')} 
                                    method="post" 
                                    as="button" 
                                    className="flex lg:w-full items-center gap-4 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all mt-4 lg:border-t lg:border-[#E5E7EB] text-left"
                                >
                                    <LogOut size={18} strokeWidth={2.5} />
                                    <span className="uppercase tracking-wide">Cerrar Sesión</span>
                                </Link>
                            </nav>
                        </div>
                    </aside>

                    {/* CONTENIDO PRINCIPAL */}
                    <div className="flex-1 w-full">
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm p-6 lg:p-12 min-h-[600px]">
                            
                            {activeSection === 'pedidos' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <MyOrders />
                                </div>
                            )}

                            {activeSection === 'direcciones' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <AddressManager 
                                        showForm={showForm} 
                                        setShowForm={setShowForm} 
                                        addresses={addresses} 
                                    />
                                </div>
                            )}

                            {activeSection === 'perfil' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <h2 className="text-2xl lg:text-3xl font-black text-[#1E3A8A] mb-8 border-b-2 border-[#E5E7EB] pb-4 uppercase">Información del Perfil</h2>
                                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                                </div>
                            )}
                            
                            {activeSection === 'password' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
                                    <h2 className="text-2xl lg:text-3xl font-black text-[#1E3A8A] mb-8 border-b-2 border-[#E5E7EB] pb-4 uppercase">Seguridad de la Cuenta</h2>
                                    <UpdatePasswordForm />
                                    <div className="pt-10 border-t-2 border-red-50">
                                        <h3 className="text-red-600 font-extrabold text-lg uppercase mb-4 flex items-center gap-2">
                                            <ShieldAlert size={22} /> Zona de Peligro
                                        </h3>
                                        <div className="p-6 bg-red-50/50 border border-red-100 rounded-2xl">
                                            <DeleteUserForm />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'legal' && (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
                                    <h2 className="text-2xl lg:text-3xl font-black text-[#1E3A8A] mb-8 border-b-2 border-[#E5E7EB] pb-4 uppercase">Centro Legal</h2>
                                    <PolicyItem title="Aviso de Privacidad" icon={<FileText size={22} />} />
                                    <PolicyItem title="Términos y Condiciones" icon={<Info size={22} />} />
                                    <PolicyItem title="Políticas de Envío" icon={<Truck size={22} />} />
                                    <PolicyItem title="Garantía y Devoluciones" icon={<RotateCcw size={22} />} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />

            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
                .input-style { 
                    width: 100%; height: 48px; padding-left: 1rem; padding-right: 1rem; border-radius: 0.5rem; 
                    border-width: 2px; border-color: #E5E7EB; outline: 2px solid transparent; outline-offset: 2px; 
                    transition: all 150ms; font-size: 1rem; font-weight: 700; color: black; margin-top: 0.25rem;
                }
                .input-style:focus { border-color: #1E3A8A; box-shadow: 0 0 0 4px #eff6ff; }
                textarea.input-style { height: auto; min-height: 120px; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slide-in-from-bottom { from { transform: translateY(1rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .animate-in { animation-fill-mode: both; }
                .fade-in { animation-name: fade-in; }
                .slide-in-from-bottom-4 { animation-name: slide-in-from-bottom; }
            `}} />
        </div>
    );
}

// --- SUB-COMPONENTES AUXILIARES ---

function PolicyItem({ title, icon }) {
    return (
        <div className="p-6 border-2 border-[#E5E7EB] rounded-2xl flex justify-between items-center hover:border-[#F59E0B] hover:bg-amber-50/30 cursor-pointer transition-all group">
            <div className="flex items-center gap-5">
                <span className="text-[#1E3A8A] group-hover:scale-110 transition-transform">{icon}</span>
                <span className="text-base font-extrabold text-[#1F2937] group-hover:text-[#1E3A8A] tracking-tight uppercase tracking-widest text-xs">{title}</span>
            </div>
            <ChevronRight size={22} strokeWidth={3} className="text-[#E5E7EB] group-hover:text-[#F59E0B]" />
        </div>
    );
}

function SidebarLink({ label, icon, active, onClick }) {
    return (
        <button onClick={onClick} className={`flex items-center gap-4 px-5 py-4 text-sm font-extrabold uppercase rounded-xl transition-all shrink-0 ${active ? "bg-amber-50 text-[#1E3A8A] border-2 border-[#F59E0B] shadow-sm" : "text-[#6B7280] border-2 border-transparent hover:bg-gray-50 hover:text-[#1E3A8A]"}`}>
            <span className={active ? "text-[#F59E0B]" : "text-[#1E3A8A]"}>{icon}</span>
            {label}
        </button>
    );
}

function SectionTitle({ label }) {
    return <p className="px-5 text-[11px] font-black text-[#1E3A8A] uppercase tracking-[2px] mb-3 mt-6 border-l-4 border-[#F59E0B] ml-2 leading-none">{label}</p>;
}
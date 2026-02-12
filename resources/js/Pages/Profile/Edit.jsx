import React, { useState } from "react";
import { Head, Link, useForm } from '@inertiajs/react';
import Header from "@/Components/Public/Header";
import Footer from "@/Components/Public/Footer";
import InputError from '@/Components/InputError';
import { 
    User, Lock, MapPin, ShoppingBag, LogOut, ChevronRight, 
    FileText, ShieldAlert, PackageOpen, Info, Truck, RotateCcw, Plus, Home 
} from "lucide-react";

// Parciales
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteUserForm from './Partials/DeleteUserForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    const [activeSection, setActiveSection] = useState('pedidos');
    const [showForm, setShowForm] = useState(false);

    // Lógica para el formulario de direcciones usando Inertia useForm
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        address: '',
        cp: '',
        phone: '',
        state: 'Chihuahua',
        city: '',
        references: '',
    });

    const mainStyle = { 
        fontFamily: "'Nunito', sans-serif",
        WebkitFontSmoothing: 'antialiased',
        color: '#1F2937'
    };

    const changeSection = (section) => {
        setActiveSection(section);
        setShowForm(false);
    };

    const submitAddress = (e) => {
        e.preventDefault();
        post(route('profile.address.store'), {
            onSuccess: () => {
                reset();
                setShowForm(false);
            },
        });
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
                                
                                {/* BOTÓN IR AL INICIO - INTEGRADO EN EL RECUADRO */}
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
                                <SidebarLink label="Legal" icon={<FileText size={20}/>} active={activeSection === 'legal'} onClick={() => changeSection('legal')} />
                                
                                <Link 
                                    href={route('logout')} 
                                    method="post" 
                                    as="button" 
                                    className="flex lg:w-full items-center gap-4 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all mt-4 lg:border-t lg:border-[#E5E7EB]"
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
                            
                            {/* SECCIÓN: MIS PEDIDOS (ADAPTADA) */}
                            {activeSection === 'pedidos' && (
                                <div className="animate-in fade-in duration-500">
                                    <h2 className="text-2xl lg:text-3xl font-black text-[#1E3A8A] mb-8 border-b-2 border-[#E5E7EB] pb-4 uppercase">Mis Pedidos</h2>
                                    <div className="flex flex-col items-center justify-center py-16 lg:py-24 text-center">
                                        <div className="mb-8">
                                            {/* Caja más grande y sin el círculo gris */}
                                            <PackageOpen size={120} className="text-[#E5E7EB]" strokeWidth={1} />
                                        </div>
                                        <h3 className="text-xl lg:text-2xl font-bold text-[#1F2937] mb-2">Parece que aún no has comprado</h3>
                                        <p className="text-[#6B7280] text-base mb-10 max-w-sm font-medium">Tus compras aparecerán aquí para que puedas gestionar tus envíos.</p>
                                        <Link href="/" className="bg-[#1E3A8A] text-white px-10 py-4 rounded-xl font-extrabold text-sm uppercase tracking-widest hover:bg-[#162d6e] transition-all shadow-lg shadow-blue-900/10">
                                            Explorar productos
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* SECCIÓN: DIRECCIONES */}
                            {activeSection === 'direcciones' && (
                                <div className="animate-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex justify-between items-center mb-10 border-b-2 border-[#E5E7EB] pb-6">
                                        <div>
                                            <h2 className="text-2xl lg:text-3xl font-black text-[#1E3A8A] uppercase tracking-tighter">
                                                {showForm ? 'Nueva Dirección' : 'Mis Direcciones'}
                                            </h2>
                                            <p className="text-sm font-bold text-gray-500 mt-1">Gestiona tus lugares de entrega frecuentes.</p>
                                        </div>
                                        {showForm && (
                                            <button onClick={() => setShowForm(false)} className="flex items-center gap-2 text-xs font-black text-[#F59E0B] uppercase tracking-widest hover:text-[#1E3A8A] transition-colors">
                                                <RotateCcw size={16} /> Volver al listado
                                            </button>
                                        )}
                                    </div>

                                    {!showForm ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <button 
                                                onClick={() => setShowForm(true)}
                                                className="group border-2 border-dashed border-[#E5E7EB] rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:border-[#F59E0B] hover:bg-amber-50/50 transition-all min-h-[250px]"
                                            >
                                                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#F59E0B] transition-colors shadow-sm">
                                                    <Plus size={32} className="text-[#6B7280] group-hover:text-[#1E3A8A]" strokeWidth={3} />
                                                </div>
                                                <span className="text-lg font-black text-[#6B7280] group-hover:text-[#1E3A8A] uppercase tracking-tight">Agregar nueva dirección</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <form onSubmit={submitAddress} className="max-w-3xl space-y-6 animate-in fade-in duration-300">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                                <div className="md:col-span-2">
                                                    <label className="block text-[11px] font-black text-black uppercase tracking-widest mb-1">Nombre Completo del Destinatario</label>
                                                    <input type="text" className="input-style" placeholder="Ej. Juan Pérez" value={data.name} onChange={e => setData('name', e.target.value)} />
                                                    <InputError message={errors.name} className="mt-1 font-bold" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-[11px] font-black text-black uppercase tracking-widest mb-1">Calle y Número</label>
                                                    <input type="text" className="input-style" placeholder="Nombre de calle, número exterior e interior" value={data.address} onChange={e => setData('address', e.target.value)} />
                                                    <InputError message={errors.address} className="mt-1 font-bold" />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-black text-black uppercase tracking-widest mb-1">Código Postal</label>
                                                    <input type="text" className="input-style" placeholder="33800" value={data.cp} onChange={e => setData('cp', e.target.value)} />
                                                    <InputError message={errors.cp} className="mt-1 font-bold" />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-black text-black uppercase tracking-widest mb-1">Teléfono de Contacto</label>
                                                    <input type="tel" className="input-style" placeholder="627 123 4567" value={data.phone} onChange={e => setData('phone', e.target.value)} />
                                                    <InputError message={errors.phone} className="mt-1 font-bold" />
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-black text-black uppercase tracking-widest mb-1">Estado</label>
                                                    <select className="input-style bg-white appearance-none cursor-pointer" value={data.state} onChange={e => setData('state', e.target.value)}>
                                                        <option value="Chihuahua">Chihuahua</option>
                                                        <option value="Durango">Durango</option>
                                                        <option value="Coahuila">Coahuila</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-[11px] font-black text-black uppercase tracking-widest mb-1">Ciudad / Localidad</label>
                                                    <input type="text" className="input-style" placeholder="Hidalgo del Parral" value={data.city} onChange={e => setData('city', e.target.value)} />
                                                    <InputError message={errors.city} className="mt-1 font-bold" />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label className="block text-[11px] font-black text-black uppercase tracking-widest mb-1">Referencias Adicionales</label>
                                                    <textarea className="input-style h-32 resize-none pt-4" placeholder="Descripción de la fachada, entre qué calles se ubica..." value={data.references} onChange={e => setData('references', e.target.value)}></textarea>
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-100">
                                                <button type="submit" disabled={processing} className="w-full sm:w-auto bg-[#1E3A8A] text-white px-12 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-md hover:bg-[#162d6b] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">
                                                    {processing ? 'Guardando...' : 'Guardar Dirección'}
                                                </button>
                                                <button type="button" onClick={() => setShowForm(false)} className="w-full sm:w-auto bg-white text-gray-500 border-2 border-gray-200 px-12 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all">
                                                    Cancelar
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            )}

                            {/* SECCIONES PERFIL, SEGURIDAD, LEGAL (SIN CAMBIOS) */}
                            {activeSection === 'perfil' && (
                                <div className="animate-in fade-in duration-500">
                                    <h2 className="text-2xl lg:text-3xl font-black text-[#1E3A8A] mb-8 border-b-2 border-[#E5E7EB] pb-4 uppercase">Información del Perfil</h2>
                                    <UpdateProfileInformationForm mustVerifyEmail={mustVerifyEmail} status={status} />
                                </div>
                            )}
                            
                            {activeSection === 'password' && (
                                <div className="animate-in fade-in duration-500 space-y-12">
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
                                <div className="animate-in fade-in duration-500 space-y-4">
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
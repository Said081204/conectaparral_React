import { useState } from 'react';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    // ESTADO: Controla la visibilidad de la contraseña y su confirmación al mismo tiempo.
    const [showPasswords, setShowPasswords] = useState(false);

    // FORMULARIO: Definimos todos los campos necesarios para registrar un nuevo usuario.
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', 
        last_name: '',
        email: '',
        phone: '', 
        password: '',
        password_confirmation: '',
    });

    // ENVÍO: Envía los datos a la ruta de registro de Laravel.
    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            // Si hay un error, limpia las contraseñas para que el usuario las reescriba.
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    // ESTILO: Fuente consistente.
    const fontStyle = { fontFamily: 'Arial, Helvetica, sans-serif' };

    // COMPONENTE VISUAL: Icono dinámico para el botón de mostrar/ocultar clave.
    const EyeIcon = ({ open }) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            ) : (
                <>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.399 8.049 7.21 4.5 12 4.5c4.79 0 8.601 3.549 9.963 7.178.07.207.07.431 0 .639C20.601 15.951 16.79 19.5 12 19.5c-4.79 0-8.601-3.549-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </>
            )}
        </svg>
    );

    return (
        <GuestLayout>
            <Head title="Crear cuenta" />

           {/* ENCABEZADO: Título y branding oficial con colores divididos */}
            <div className="text-center mb-8" style={fontStyle}>
                <h1 className="text-2xl font-bold tracking-tight text-[#1F2937]">
                    Crear cuenta
                </h1>
                <p className="mt-1 text-sm text-[#6B7280]">
                    Regístrate para comprar en{' '}
                    <span className="font-bold">
                        <span className="text-[#1E3A8A]">Conecta</span>
                        <span className="text-amber-400">Parral</span>
                    </span>.
                </p>
            </div>

            {/* ALERTA GLOBAL: Se muestra solo si el servidor devuelve algún error de validación */}
            {Object.keys(errors).length > 0 && (
                <div className="mb-6 p-3 rounded bg-red-50 border border-red-200 text-sm text-red-700" style={fontStyle}>
                    Por favor, verifica los campos marcados en rojo.
                </div>
            )}

            <form onSubmit={submit} className="space-y-4" style={fontStyle}>
                
                {/* GRID: En celular se ve una columna, en tablets/PC se ven dos columnas (sm:grid-cols-2) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* NOMBRE */}
                    <div>
                        <label className="block text-sm font-bold text-[#1F2937] mb-1">Nombre</label>
                        <input type="text" value={data.name} className={`w-full h-11 px-3 rounded border ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A] outline-none text-sm transition-all`} placeholder="Nombre" onChange={(e) => setData('name', e.target.value)} required />
                        <InputError message={errors.name} className="mt-1" />
                    </div>
                    {/* APELLIDOS */}
                    <div>
                        <label className="block text-sm font-bold text-[#1F2937] mb-1">Apellidos</label>
                        <input type="text" value={data.last_name} className={`w-full h-11 px-3 rounded border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A] outline-none text-sm transition-all`} placeholder="Apellidos" onChange={(e) => setData('last_name', e.target.value)} required />
                        <InputError message={errors.last_name} className="mt-1" />
                    </div>
                </div>

                {/* CORREO ELECTRÓNICO */}
                <div>
                    <label className="block text-sm font-bold text-[#1F2937] mb-1">Correo electrónico</label>
                    <input type="email" value={data.email} className={`w-full h-11 px-3 rounded border ${errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A] outline-none text-sm transition-all`} placeholder="ejemplo@correo.com" onChange={(e) => setData('email', e.target.value)} required />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                {/* TELÉFONO */}
                <div>
                    <label className="block text-sm font-bold text-[#1F2937] mb-1">Teléfono celular</label>
                    <input type="tel" value={data.phone} className={`w-full h-11 px-3 rounded border ${errors.phone ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A] outline-none text-sm transition-all`} placeholder="627 123 4567" onChange={(e) => setData('phone', e.target.value)} required />
                    <InputError message={errors.phone} className="mt-1" />
                </div>

                {/* GRID PARA CONTRASEÑAS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* CONTRASEÑA */}
                    <div>
                        <label className="block text-sm font-bold text-[#1F2937] mb-1">Contraseña</label>
                        <div className="relative">
                            <input type={showPasswords ? 'text' : 'password'} value={data.password} className={`w-full h-11 pl-3 pr-10 rounded border ${errors.password ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A] outline-none text-sm transition-all`} placeholder="Contraseña" onChange={(e) => setData('password', e.target.value)} required />
                            <button type="button" onClick={() => setShowPasswords(!showPasswords)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1E3A8A] transition-colors"><EyeIcon open={showPasswords} /></button>
                        </div>
                        {/* Recordatorio visual de longitud mínima */}
                        <p className="mt-1 text-[11px] text-gray-500 ml-1">
                            <span className="text-[#1E3A8A] font-bold">mínimo 8 caracteres</span>.
                        </p>
                    </div>
                    {/* CONFIRMAR CONTRASEÑA */}
                    <div>
                        <label className="block text-sm font-bold text-[#1F2937] mb-1">Confirmar</label>
                        <div className="relative">
                            <input type={showPasswords ? 'text' : 'password'} value={data.password_confirmation} className="w-full h-11 pl-3 pr-10 rounded border border-gray-300 shadow-sm focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A] outline-none text-sm transition-all" placeholder="Repetir" onChange={(e) => setData('password_confirmation', e.target.value)} required />
                            <button type="button" onClick={() => setShowPasswords(!showPasswords)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1E3A8A] transition-colors"><EyeIcon open={showPasswords} /></button>
                        </div>
                    </div>
                </div>
                {/* Muestra el error de contraseña (si no coinciden o es muy corta) */}
                <InputError message={errors.password} className="-mt-2" />

                {/* BOTONES PRINCIPALES */}
                <div className="space-y-3 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full h-12 rounded bg-[#1E3A8A] text-white font-bold text-sm hover:bg-[#162a63] transition-all shadow-md active:scale-[0.98] disabled:opacity-50 uppercase tracking-wider"
                    >
                        {processing ? 'PROCESANDO...' : 'CREAR CUENTA'}
                    </button>

                    <Link
                        href={route('login')}
                        className="w-full h-12 rounded border border-gray-300 bg-white text-sm font-bold text-[#1F2937] flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm hover:shadow-md uppercase tracking-wider"
                    >
                        YA TENGO CUENTA
                    </Link>
                </div>

                {/* DIVISOR "O" */}
                <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-4 text-xs font-bold text-[#6B7280] uppercase tracking-widest">O</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* GOOGLE REGISTRO - Convertido a Enlace funcional */}
                <a
                    href={route('google.login')}
                    className="w-full h-12 rounded border border-gray-300 bg-white text-sm font-bold text-[#1F2937] flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
                    style={{ textDecoration: 'none' }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    REGISTRARSE CON GOOGLE
                </a>

                {/* TEXTO LEGAL */}
                <div className="pt-6 border-t border-gray-100 mt-6 text-center">
                    <p className="text-[11px] text-[#6B7280] leading-relaxed px-8">
                        Al continuar, declaras que aceptas nuestras 
                        <Link href="/terminos" className="mx-1 text-[#1E3A8A] font-bold hover:underline underline-offset-2">Condiciones de Uso</Link>
                        y nuestro 
                        <Link href="/privacidad" className="mx-1 text-[#1E3A8A] font-bold hover:underline underline-offset-2">Aviso de Privacidad</Link>
                        de ConectaParral.
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
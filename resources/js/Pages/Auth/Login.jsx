import { useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    // ESTADO LOCAL: Controla si la contraseña se ve (texto) o no (puntos).
    const [showPassword, setShowPassword] = useState(false);

    // FORMULARIO (useForm): Herramienta de Inertia para manejar los datos de los inputs,
    // el estado de carga (processing) y los errores que devuelve Laravel.
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false, // Estado para la casilla de "Recordarme"
    });

    // FUNCIÓN SUBMIT: Se ejecuta al presionar ENTER o el botón de 'ENTRAR'.
    const submit = (e) => {
        e.preventDefault(); // Evita que la página se recargue automáticamente.
        post(route('login'), {
            // Si el login falla, borramos la contraseña por seguridad.
            onFinish: () => reset('password'),
        });
    };

    // ESTILO GLOBAL: Forzamos la fuente Arial/Sans para mantener consistencia visual.
    const fontStyle = { fontFamily: 'Arial, Helvetica, sans-serif' };

    // COMPONENTE VISUAL (Icono): Dibujamos el ojo usando SVG. 
    // Recibe la propiedad 'open' para decidir qué dibujo mostrar.
    const EyeIcon = ({ open }) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            {open ? (
                /* Icono: Ojo con una línea atravesada (Ocultar) */
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            ) : (
                /* Icono: Ojo normal (Mostrar) */
                <>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.399 8.049 7.21 4.5 12 4.5c4.79 0 8.601 3.549 9.963 7.178.07.207.07.431 0 .639C20.601 15.951 16.79 19.5 12 19.5c-4.79 0-8.601-3.549-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </>
            )}
        </svg>
    );

    return (
        <GuestLayout>
            <Head title="Iniciar sesión" />

            {/* ENCABEZADO: Título principal y bienvenida con branding oficial */}
            <div className="text-center mb-8" style={fontStyle}>
                <h1 className="text-2xl font-bold tracking-tight text-[#1F2937]">
                    Iniciar sesión
                </h1>
                <p className="mt-2 text-sm text-[#6B7280]">
                    Bienvenido de nuevo a{' '}
                    <span className="font-bold">
                        <span className="text-[#1E3A8A]">Conecta</span>
                        <span className="text-amber-400">Parral</span>
                    </span>.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-4" style={fontStyle}>
                {/* --- CAMPO EMAIL --- */}
                <div>
                    <label className="block text-sm font-bold text-[#1F2937] mb-1">Correo electrónico</label>
                    <input
                        type="email"
                        value={data.email}
                        /* Condición: Si hay error en el email, el borde se pone rojo */
                        className={`w-full h-11 px-4 rounded border ${errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] outline-none transition-all text-sm`}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                {/* --- CAMPO CONTRASEÑA --- */}
                <div>
                    <label className="block text-sm font-bold text-[#1F2937] mb-1">Contraseña</label>
                    <div className="relative"> {/* 'relative' para que el botón del ojo se posicione adentro */}
                        <input
                            /* Tipo dinámico: cambia entre password y text */
                            type={showPassword ? 'text' : 'password'}
                            value={data.password}
                            /* pr-11: Padding derecho extra para que el texto no se encime con el ojo */
                            className={`w-full h-11 pl-4 pr-11 rounded border ${errors.password ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] outline-none transition-all text-sm`}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {/* Botón para alternar visibilidad */}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1E3A8A] focus:outline-none z-10"
                        >
                            <EyeIcon open={showPassword} />
                        </button>
                    </div>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                {/* --- FILA DE RECORDARME Y OLVIDÓ CONTRASEÑA --- */}
                <div className="flex items-center justify-between text-sm pb-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer group">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            className="w-5 h-5 rounded border-gray-300 !text-[#1E3A8A] !focus:ring-[#1E3A8A] focus:ring-offset-0 transition-all cursor-pointer"
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="text-gray-600 group-hover:text-gray-900 transition-colors font-medium">Recordarme</span>
                    </label>

                    {/* Link de recuperación: Solo se muestra si el backend permite restablecer claves */}
                    {canResetPassword && (
                        <Link href={route('password.request')} className="text-[#1E3A8A] font-bold hover:text-[#162a63] transition-colors">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    )}
                </div>

                {/* --- BOTONES DE ACCIÓN --- */}
                <div className="space-y-3 pt-2">
                    {/* Botón Principal: Entrar */}
                    <button
                        type="submit"
                        disabled={processing} // Evita múltiples clics mientras carga
                        className="w-full h-12 rounded bg-[#1E3A8A] text-white font-bold text-sm hover:bg-[#162a63] transition-all shadow-md active:scale-[0.98] disabled:opacity-50 uppercase tracking-wider"
                    >
                        {processing ? 'ENTRANDO...' : 'ENTRAR'}
                    </button>

                    {/* Botón Secundario: Ir a Registro */}
                    <Link
                        href={route('register')}
                        className="w-full h-12 rounded border border-gray-300 bg-white text-sm font-bold text-[#1F2937] flex items-center justify-center hover:bg-gray-50 transition-all shadow-sm hover:shadow-md uppercase tracking-wider"
                    >
                        CREAR CUENTA NUEVA
                    </Link>
                </div>

                {/* --- DIVISOR VISUAL --- */}
                <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-4 text-xs font-bold text-[#6B7280] uppercase tracking-widest">O</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {/* --- BOTÓN DE GOOGLE - Convertido a Enlace --- */}
                <a
                    href={route('google.login')}
                    className="w-full h-12 rounded border border-gray-300 bg-white text-sm font-bold text-[#1F2937] flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
                    style={{ textDecoration: 'none' }}
                >
                    {/* SVG oficial del logo de Google */}
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    INICIAR SESIÓN CON GOOGLE
                </a>

                {/* --- PIE DE PÁGINA: LEGALES --- */}
                <div className="pt-8 border-t border-gray-100 mt-6 text-center">
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
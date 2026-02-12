import { useState } from 'react';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    // ESTADO: Controla si el texto de los inputs es visible o está oculto (puntos)
    const [showPasswords, setShowPasswords] = useState(false);

    // FORMULARIO: useForm de Inertia gestiona los datos, errores y el envío al servidor
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email, // El email suele venir pre-cargado desde el enlace de recuperación
        password: '',
        password_confirmation: '',
    });

    // ENVÍO: Función que se dispara al hacer clic en el botón principal
    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            // Si el envío es exitoso, limpia los campos de contraseña por seguridad
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    // ESTILO: Fuente estándar para asegurar que se vea igual en todos los navegadores
    const fontStyle = { fontFamily: 'Arial, Helvetica, sans-serif' };

    // CLASES COMPARTIDAS: Evita repetir código en los inputs. 
    // Define altura, bordes, sombras y el color azul al hacer clic (focus).
    const sharedInputClasses = "w-full h-11 px-4 rounded border shadow-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] outline-none transition-all text-sm";

    // COMPONENTE VISUAL: Icono SVG dinámico que cambia según el estado 'open'
    const EyeIcon = ({ open }) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            {open ? (
                /* Icono de ojo tachado (ocultar) */
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            ) : (
                /* Icono de ojo normal (mostrar) */
                <>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.399 8.049 7.21 4.5 12 4.5c4.79 0 8.601 3.549 9.963 7.178.07.207.07.431 0 .639C20.601 15.951 16.79 19.5 12 19.5c-4.79 0-8.601-3.549-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </>
            )}
        </svg>
    );

    return (
        <GuestLayout>
            <Head title="Restablecer contraseña" />

            {/* ENCABEZADO: Título y branding con el azul y amarillo oficial */}
            <div className="text-center mb-8" style={fontStyle}>
                <h2 className="text-2xl font-bold tracking-tight text-[#1F2937]">
                    Nueva contraseña
                </h2>
                <p className="mt-2 text-sm text-[#6B7280]">
                    Asegura tu cuenta en{' '}
                    <span className="font-bold">
                        <span className="text-[#1E3A8A]">Conecta</span>
                        <span className="text-amber-400">Parral</span>
                    </span>.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5" style={fontStyle}>
                
                {/* CAMPO EMAIL: Solo lectura, para confirmar a quién se le cambia la clave */}
                <div>
                    <label className="block text-sm font-bold text-[#1F2937] mb-1">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={`${sharedInputClasses} ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-gray-50 text-gray-500`}
                        readOnly // No permitimos editar el correo aquí por seguridad
                    />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                {/* CAMPO NUEVA CONTRASEÑA: Con el botón del ojo integrado */}
                <div>
                    <label className="block text-sm font-bold text-[#1F2937] mb-1">
                        Nueva Contraseña
                    </label>
                    <div className="relative"> {/* 'relative' permite posicionar el ojo dentro del input */}
                        <input
                            id="password"
                            // Si showPasswords es true, el tipo es 'text', si es false es 'password'
                            type={showPasswords ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className={`${sharedInputClasses} pr-10 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {/* BOTÓN DEL OJO: Cambia el estado al hacer clic */}
                        <button 
                            type="button" 
                            onClick={() => setShowPasswords(!showPasswords)} 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1E3A8A] transition-colors"
                        >
                            <EyeIcon open={showPasswords} />
                        </button>
                    </div>
                    {/* Indicador de requisito de caracteres */}
                    <p className="mt-1 text-[11px] text-gray-500 ml-1">
                        La contraseña debe tener <span className="text-[#1E3A8A] font-bold">mínimo 8 caracteres</span>.
                    </p>
                    <InputError message={errors.password} className="mt-1" />
                </div>

                {/* CAMPO CONFIRMACIÓN: Repite la lógica del input anterior */}
                <div>
                    <label className="block text-sm font-bold text-[#1F2937] mb-1">
                        Confirmar contraseña
                    </label>
                    <div className="relative">
                        <input
                            type={showPasswords ? 'text' : 'password'}
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className={`${sharedInputClasses} pr-10 ${errors.password_confirmation ? 'border-red-500' : 'border-gray-300'}`}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                        <button 
                            type="button" 
                            onClick={() => setShowPasswords(!showPasswords)} 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1E3A8A] transition-colors"
                        >
                            <EyeIcon open={showPasswords} />
                        </button>
                    </div>
                    <InputError message={errors.password_confirmation} className="mt-1" />
                </div>

                {/* BOTÓN DE ACCIÓN: Con efectos de hover (pasar el mouse) y active (clic) */}
                <div className="pt-2">
                    <button 
                        type="submit"
                        disabled={processing} // Desactiva el botón mientras se envía la petición
                        className="w-full h-12 rounded bg-[#1E3A8A] text-white font-bold text-sm hover:bg-[#162a63] transition-all shadow-md shadow-blue-900/30 active:scale-95 hover:shadow-lg disabled:opacity-50 uppercase tracking-wider"
                    >
                        {processing ? 'ACTUALIZANDO...' : 'RESTABLECER CONTRASEÑA'}
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
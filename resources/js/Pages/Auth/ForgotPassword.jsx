import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    // Gestión del formulario con Inertia
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    // Envía la petición al controlador de Laravel (PasswordBroker)
    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    // Estilo de fuente global Arial
    const fontStyle = { fontFamily: 'Arial, Helvetica, sans-serif' };

    return (
        <GuestLayout>
            <Head title="Olvidé mi contraseña" />

            {/* Cabecera Informativa */}
            <div className="text-center mb-8" style={fontStyle}>
                <h1 className="text-2xl font-bold tracking-tight text-[#1F2937]">
                    ¿Olvidaste tu contraseña?
                </h1>
                <p className="mt-2 text-sm text-[#6B7280]">
                    No hay problema. Solo dinos tu correo y te enviaremos un enlace para restablecerla.
                </p>
            </div>

            {/* Mensaje de confirmación (aparece cuando el email se envía con éxito) */}
            {status && (
                <div className="mb-6 p-4 rounded bg-green-50 border border-green-100 text-sm font-medium text-green-700 shadow-sm" style={fontStyle}>
                    {status}
                </div>
            )}

            <form onSubmit={submit} style={fontStyle}>
                {/* Campo de Email */}
                <div>
                    <label className="block text-sm font-bold text-[#1F2937] mb-1 ml-1">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={`w-full h-11 px-4 rounded border ${errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] outline-none transition-all text-sm`}
                        placeholder="tucorreo@gmail.com"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoFocus
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Botón de Acción Principal */}
                <div className="mt-8">
                    <button 
                        type="submit"
                        className="w-full h-12 rounded bg-[#1E3A8A] text-white font-bold text-sm hover:bg-[#162a63] transition-all shadow-md shadow-blue-900/30 active:scale-95 hover:shadow-lg disabled:opacity-50 uppercase tracking-wider" 
                        disabled={processing}
                    >
                        {processing ? 'ENVIANDO...' : 'ENVIAR ENLACE'}
                    </button>
                </div>

                {/* Enlace de retorno con el estilo azul del Login */}
                <div className="mt-8 text-center pt-6 border-t border-gray-100">
                    <Link
                        href={route('login')}
                        /* Se cambió hover:text-[#F59E0B] por hover:text-[#162a63] para unificar el diseño */
                        className="text-sm font-bold text-[#1E3A8A] hover:text-[#162a63] transition-colors"
                    >
                        Volver al inicio de sesión
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
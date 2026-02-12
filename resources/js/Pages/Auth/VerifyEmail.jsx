import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    // FORMULARIO INERTIA: Aunque no enviamos datos de inputs, usamos useForm 
    // para gestionar el envío (post) y el estado de carga (processing).
    const { post, processing } = useForm({});

    // FUNCIÓN SUBMIT: Dispara la petición al servidor para reenviar el email.
    const submit = (e) => {
        e.preventDefault();
        // Llama a la ruta definida en Laravel para enviar el enlace de verificación.
        post(route('verification.send'));
    };

    // ESTILO: Mantenemos Arial para que todo el sistema de autenticación sea uniforme.
    const fontStyle = { fontFamily: 'Arial, Helvetica, sans-serif' };

    return (
        <GuestLayout>
            <Head title="Verificar Correo" />

            {/* CABECERA: Explicación para el usuario de por qué está en esta pantalla */}
            <div className="text-center mb-8" style={fontStyle}>
                <h1 className="text-2xl font-bold tracking-tight text-[#1F2937]">
                    Verifica tu cuenta
                </h1>
                <p className="mt-4 text-sm text-[#6B7280] leading-relaxed px-2">
                    ¡Gracias por registrarte! Antes de comenzar, ¿podrías verificar tu dirección de correo haciendo clic en el enlace que acabamos de enviarte? Si no recibiste el correo, con gusto te enviaremos otro.
                </p>
            </div>

            {/* MENSAJE DE ÉXITO: Se muestra solo cuando Laravel confirma que reenvió el correo.
                El valor 'verification-link-sent' viene de la sesión de Laravel. */}
            {status === 'verification-link-sent' && (
                <div className="mb-6 p-4 rounded bg-green-50 border border-green-200 text-sm font-medium text-green-700 shadow-sm" style={fontStyle}>
                    Se ha enviado un nuevo enlace de verificación a la dirección de correo electrónico que proporcionaste durante el registro.
                </div>
            )}

            <form onSubmit={submit} style={fontStyle}>
                <div className="mt-4 flex flex-col gap-4 items-center">
                    
                    {/* BOTÓN REENVIAR:
                        - disabled={processing}: Evita que el usuario sature el servidor con muchos correos.
                        - transition-all & active:scale-95: Dan esa sensación de "botón real" al presionarlo.
                    */}
                    <button 
                        type="submit"
                        disabled={processing}
                        className="w-full h-12 rounded bg-[#1E3A8A] text-white font-bold text-sm hover:bg-[#162a63] transition-all shadow-md shadow-blue-900/30 active:scale-95 hover:shadow-lg disabled:opacity-50 uppercase tracking-wider"
                    >
                        {processing ? 'REENVIANDO...' : 'REENVIAR CORREO DE VERIFICACIÓN'}
                    </button>

                    {/* ENLACE CERRAR SESIÓN:
                        - method="post": Muy importante, el cierre de sesión debe ser siempre por POST.
                        - as="button": Aunque parece un enlace, Inertia lo trata como un botón para que el clic funcione correctamente con el método POST.
                    */}
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="mt-2 text-sm font-bold text-gray-500 hover:text-[#1E3A8A] transition-colors"
                    >
                        Cerrar sesión
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
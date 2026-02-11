import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificar Correo" />

            {/* Cabecera adaptada */}
            <div className="text-center mb-6">
                <h1 className="text-2xl 2xl:text-3xl font-extrabold tracking-tight text-gray-900 font-['Rubik']">
                    Verifica tu cuenta
                </h1>
                <p className="mt-2 text-sm 2xl:text-base text-gray-600 font-['Nunito'] leading-relaxed">
                    ¡Gracias por registrarte! Antes de comenzar, ¿podrías verificar tu dirección de correo haciendo clic en el enlace que acabamos de enviarte? Si no recibiste el correo, con gusto te enviaremos otro.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-sm font-medium text-green-700 font-['Nunito']">
                    Se ha enviado un nuevo enlace de verificación a la dirección de correo electrónico que proporcionaste durante el registro.
                </div>
            )}

            <form onSubmit={submit} className="font-['Nunito']">
                <div className="mt-4 flex flex-col gap-4 items-center justify-between">
                    <PrimaryButton 
                        className="w-full h-11 2xl:h-12 rounded-lg bg-[#1E3A8A] text-white font-extrabold hover:bg-blue-800 transition flex justify-center items-center shadow-lg shadow-blue-900/10"
                        disabled={processing}
                    >
                        Reenviar correo de verificación
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-sm font-bold text-gray-500 hover:text-[#1E3A8A] underline transition"
                    >
                        Cerrar sesión
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
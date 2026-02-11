import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm, Link } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Olvidé mi contraseña" />

            {/* Cabecera con tipografía y colores corporativos */}
            <div className="text-center mb-8">
                <h1 className="text-2xl 2xl:text-3xl font-extrabold tracking-tight text-[#1F2937] font-['Rubik']">
                    ¿Olvidaste tu contraseña?
                </h1>
                <p className="mt-2 text-sm 2xl:text-base text-[#6B7280] font-['Nunito']">
                    No hay problema. Solo dinos tu correo y te enviaremos un enlace para restablecerla.
                </p>
            </div>

            {/* Alerta de estado optimizada */}
            {status && (
                <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-100 text-sm font-medium text-green-700 font-['Nunito'] shadow-sm">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="font-['Nunito']">
                <div>
                    <label className="block text-sm font-bold text-[#1F2937] mb-2">
                        Correo electrónico
                    </label>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        /* Eliminado: focus:ring-4 y focus:ring-blue-100 
                           Mantenido: focus:border-[#1E3A8A] (Primary Color)
                        */
                        className="w-full h-12 px-4 rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] focus:outline-none focus:border-[#1E3A8A] transition-colors placeholder:text-gray-400"
                        isFocused={true}
                        placeholder="tucorreo@gmail.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-8">
                    <PrimaryButton 
                        /* Botón usando --primary-color (#1E3A8A) */
                        className="w-full h-12 rounded-lg bg-[#1E3A8A] border-none text-white font-extrabold hover:bg-[#162a63] active:bg-[#1E3A8A] transition-all flex justify-center items-center shadow-md uppercase tracking-wider text-xs" 
                        disabled={processing}
                    >
                        {processing ? 'Enviando...' : 'Enviar enlace de restablecimiento'}
                    </PrimaryButton>
                </div>

                {/* Retorno al inicio de sesión con el color de acento o primario */}
                <div className="mt-8 text-center pt-6 border-t border-[#E5E7EB]">
                    <Link
                        href={route('login')}
                        className="text-sm font-bold text-[#1E3A8A] hover:text-[#F59E0B] transition-colors"
                    >
                        Volver al inicio de sesión
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
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

            {/* Cabecera adaptada */}
            <div className="text-center mb-6">
                <h1 className="text-2xl 2xl:text-3xl font-extrabold tracking-tight text-gray-900 font-['Rubik']">
                    ¿Olvidaste tu contraseña?
                </h1>
                <p className="mt-2 text-sm 2xl:text-base text-gray-600 font-['Nunito']">
                    No hay problema. Solo dinos tu correo y te enviaremos un enlace para restablecerla.
                </p>
            </div>

            {status && (
                <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 text-sm font-medium text-green-600 font-['Nunito']">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="font-['Nunito']">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Correo electrónico
                    </label>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="w-full h-11 2xl:h-12 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#1E3A8A] transition"
                        isFocused={true}
                        placeholder="tucorreo@gmail.com"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-6">
                    <PrimaryButton 
                        className="w-full h-11 2xl:h-12 rounded-lg bg-[#1E3A8A] text-white font-extrabold hover:bg-blue-800 transition flex justify-center items-center shadow-lg shadow-blue-900/10" 
                        disabled={processing}
                    >
                        Enviar enlace de restablecimiento
                    </PrimaryButton>
                </div>

                {/* Link de retorno */}
                <div className="mt-6 text-center">
                    <Link
                        href={route('login')}
                        className="text-sm font-bold text-[#1E3A8A] hover:underline"
                    >
                        Volver al inicio de sesión
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
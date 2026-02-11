import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirmar Contraseña" />

            {/* Cabecera adaptada */}
            <div className="text-center mb-6">
                <h1 className="text-2xl 2xl:text-3xl font-extrabold tracking-tight text-gray-900 font-['Rubik']">
                    Área segura
                </h1>
                <p className="mt-2 text-sm 2xl:text-base text-gray-600 font-['Nunito']">
                    Esta es un área segura de la aplicación. Por favor, confirma tu contraseña antes de continuar.
                </p>
            </div>

            <form onSubmit={submit} className="font-['Nunito']">
                <div>
                    <InputLabel htmlFor="password" value="Contraseña" className="font-semibold text-gray-700" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full h-11 2xl:h-12 px-4 mt-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#1E3A8A] transition"
                        isFocused={true}
                        placeholder="••••••••"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-6">
                    <PrimaryButton 
                        className="w-full h-11 2xl:h-12 rounded-lg bg-[#1E3A8A] text-white font-extrabold hover:bg-blue-800 transition flex justify-center items-center shadow-lg shadow-blue-900/10" 
                        disabled={processing}
                    >
                        Confirmar contraseña
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
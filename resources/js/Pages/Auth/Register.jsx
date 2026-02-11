import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    // CAMBIO: 'first_name' pasa a ser 'name' para coincidir con el controlador
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '', 
        last_name: '',
        email: '',
        phone: '', 
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Crear cuenta" />

            <div className="text-center">
                <h1 className="text-2xl 2xl:text-3xl font-extrabold tracking-tight text-gray-900 font-['Rubik']">
                    Crear cuenta
                </h1>
                <p className="mt-1 text-sm 2xl:text-base text-gray-600 font-['Nunito']">
                    Regístrate para comprar en ConectaParral.
                </p>
            </div>

            {/* Ahora los errores sí se mostrarán porque los nombres coinciden */}
            {Object.keys(errors).length > 0 && (
                <div className="mt-5 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 font-['Nunito']">
                    Por favor, verifica los campos marcados en rojo.
                </div>
            )}

            <form onSubmit={submit} className="mt-6 space-y-4 font-['Nunito']">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            name="name" // CAMBIO: name="name"
                            value={data.name}
                            autoComplete="given-name"
                            className={`w-full h-11 2xl:h-12 px-4 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#1E3A8A] transition`}
                            placeholder="Ej. Juan"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-1" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Apellidos</label>
                        <input
                            type="text"
                            name="last_name"
                            value={data.last_name}
                            autoComplete="family-name"
                            className={`w-full h-11 2xl:h-12 px-4 rounded-lg border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#1E3A8A] transition`}
                            placeholder="Ej. Pérez"
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.last_name} className="mt-1" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Correo electrónico</label>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        className={`w-full h-11 2xl:h-12 px-4 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#1E3A8A] transition`}
                        placeholder="tucorreo@ejemplo.com"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono celular</label>
                    <input
                        type="tel"
                        name="phone"
                        value={data.phone}
                        autoComplete="tel"
                        className={`w-full h-11 2xl:h-12 px-4 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#1E3A8A] transition`}
                        placeholder="627 123 4567"
                        onChange={(e) => setData('phone', e.target.value)}
                        required
                    />
                    <InputError message={errors.phone} className="mt-1" />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        className={`w-full h-11 2xl:h-12 px-4 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#1E3A8A] transition`}
                        placeholder="Mínimo 8 caracteres"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-1" />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Confirmar contraseña</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        className="w-full h-11 2xl:h-12 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#1E3A8A] transition"
                        placeholder="Repite tu contraseña"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full h-11 2xl:h-12 rounded-lg bg-[#1E3A8A] text-white font-extrabold hover:bg-blue-800 transition shadow-lg shadow-blue-900/10 disabled:opacity-50"
                >
                    {processing ? 'Procesando...' : 'Crear cuenta'}
                </button>

                <div className="relative pt-4">
                    <div className="h-px bg-gray-200"></div>
                    <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-white px-3 text-xs text-gray-500">
                        ¿Ya tienes cuenta?
                    </span>
                </div>

                <Link
                    href={route('login')}
                    className="w-full h-11 2xl:h-12 rounded-lg border border-gray-300 bg-white font-extrabold text-gray-900 flex items-center justify-center hover:bg-gray-50 transition"
                >
                    Iniciar sesión
                </Link>
            </form>
        </GuestLayout>
    );
}
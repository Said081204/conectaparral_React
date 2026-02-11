import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    // Mantenemos la lógica intacta de useForm
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar sesión" />

            {/* Cabecera estilo ConectaParral */}
            <div className="text-center">
                <h1 className="text-2xl 2xl:text-3xl font-extrabold tracking-tight text-gray-900 font-['Rubik']">
                    Iniciar sesión
                </h1>
                <p className="mt-1 text-sm 2xl:text-base text-gray-600 font-['Nunito']">
                    Accede con tu correo y contraseña.
                </p>
            </div>

            {/* Status de sesión (ej. al resetear pass) */}
            {status && (
                <div className="mt-5 p-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700 font-medium">
                    {status}
                </div>
            )}

            {/* Error general */}
            {Object.keys(errors).length > 0 && (
                <div className="mt-5 p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 font-['Nunito']">
                    {errors.email || errors.password || "Credenciales incorrectas."}
                </div>
            )}

            <form onSubmit={submit} className="mt-6 space-y-4 font-['Nunito']">
                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Correo
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        required
                        autoComplete="username"
                        placeholder="tucorreo@gmail.com"
                        className="w-full h-11 2xl:h-12 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#1E3A8A] transition"
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        required
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="w-full h-11 2xl:h-12 px-4 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#1E3A8A] transition"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-1" />
                </div>

                {/* Remember + Forgot/Volver */}
                <div className="flex items-center justify-between text-sm 2xl:text-base">
                    <label className="inline-flex items-center gap-2 select-none cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            className="rounded border-gray-300 text-[#1E3A8A] shadow-sm focus:ring-[#1E3A8A]"
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="text-gray-600">Recordarme</span>
                    </label>

                    {canResetPassword ? (
                        <Link
                            href={route('password.request')}
                            className="text-[#1E3A8A] font-semibold hover:underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    ) : (
                        <Link href="/" className="text-[#1E3A8A] font-semibold hover:underline">
                            Volver
                        </Link>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={processing}
                    className="w-full h-11 2xl:h-12 rounded-lg bg-[#1E3A8A] text-white font-extrabold hover:bg-blue-800 transition shadow-lg shadow-blue-900/10 disabled:opacity-50"
                >
                    {processing ? 'Entrando...' : 'Entrar'}
                </button>

                {/* Divider */}
                <div className="relative pt-4">
                    <div className="h-px bg-gray-200"></div>
                    <span className="absolute left-1/2 -translate-x-1/2 -top-2 bg-white px-3 text-xs text-gray-500">
                        ¿No tienes cuenta?
                    </span>
                </div>

                {/* Register Link */}
                <Link
                    href={route('register')}
                    className="w-full h-11 2xl:h-12 rounded-lg border border-gray-300 bg-white font-extrabold text-gray-900 flex items-center justify-center hover:bg-gray-50 transition"
                >
                    Crear cuenta
                </Link>

                {/* Legal */}
                <p className="text-xs text-gray-500 leading-relaxed text-center px-4">
                    Al continuar aceptas nuestras{' '}
                    <Link href="/terminos" className="text-[#1E3A8A] font-semibold hover:underline">Condiciones</Link>
                    {' '}y{' '}
                    <Link href="/privacidad" className="text-[#1E3A8A] font-semibold hover:underline">Privacidad</Link>.
                </p>
            </form>
        </GuestLayout>
    );
}
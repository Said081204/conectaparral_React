import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        last_name: user.last_name || '', 
        email: user.email,
        phone: user.phone || '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    const fontStyle = { 
        fontFamily: "Arial, Helvetica, sans-serif",
        WebkitFontSmoothing: 'antialiased' 
    };

    return (
        <section className={className} style={fontStyle}>
            <form onSubmit={submit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* NOMBRE */}
                    <div>
                        <label className="block text-[11px] font-black text-black uppercase tracking-widest mb-1">Nombre(s)</label>
                        <input
                            id="name"
                            className={`w-full h-12 px-4 rounded-lg border-2 border-gray-300 focus:border-[#1E3A8A] focus:ring-4 focus:ring-blue-50 outline-none transition-all text-base font-bold text-black ${errors.name ? 'border-red-500' : ''}`}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError className="mt-2 text-xs font-bold text-red-600" message={errors.name} />
                    </div>

                    {/* APELLIDOS */}
                    <div>
                        <label className="block text-[11px] font-black text-black uppercase tracking-widest mb-1">Apellidos</label>
                        <input
                            id="last_name"
                            className={`w-full h-12 px-4 rounded-lg border-2 border-gray-300 focus:border-[#1E3A8A] focus:ring-4 focus:ring-blue-50 outline-none transition-all text-base font-bold text-black ${errors.last_name ? 'border-red-500' : ''}`}
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                        />
                        <InputError className="mt-2 text-xs font-bold text-red-600" message={errors.last_name} />
                    </div>

                    {/* EMAIL */}
                    <div className="md:col-span-1">
                        <label className="block text-[11px] font-black text-black uppercase tracking-widest mb-1">Correo Electrónico</label>
                        <input
                            id="email"
                            type="email"
                            className={`w-full h-12 px-4 rounded-lg border-2 border-gray-300 focus:border-[#1E3A8A] focus:ring-4 focus:ring-blue-50 outline-none transition-all text-base font-bold text-black ${errors.email ? 'border-red-500' : ''}`}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError className="mt-2 text-xs font-bold text-red-600" message={errors.email} />
                    </div>

                    {/* TELÉFONO */}
                    <div>
                        <label className="block text-[11px] font-black text-black uppercase tracking-widest mb-1">Teléfono</label>
                        <input
                            id="phone"
                            type="text"
                            className={`w-full h-12 px-4 rounded-lg border-2 border-gray-300 focus:border-[#1E3A8A] focus:ring-4 focus:ring-blue-50 outline-none transition-all text-base font-bold text-black ${errors.phone ? 'border-red-500' : ''}`}
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            placeholder="627 123 4567"
                        />
                        <InputError className="mt-2 text-xs font-bold text-red-600" message={errors.phone} />
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-[#1E3A8A] text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#162d6b] transition-all shadow-md active:scale-95 disabled:opacity-50"
                    >
                        {processing ? 'Guardando...' : 'Guardar Cambios'}
                    </button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-100"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm font-bold text-green-600">✓ Actualizado correctamente</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
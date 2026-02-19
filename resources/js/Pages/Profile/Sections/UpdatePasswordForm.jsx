import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    // Estados para controlar la visibilidad de las contraseñas
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                // ✅ Resetear los iconos de ojo a estado "oculto" al tener éxito
                setShowCurrent(false);
                setShowNew(false);
                setShowConfirm(false);
            },
            onError: (errors) => {
                if (errors.password) { 
                    reset('password', 'password_confirmation'); 
                    passwordInput.current.focus(); 
                }
                if (errors.current_password) { 
                    reset('current_password'); 
                    currentPasswordInput.current.focus(); 
                }
            },
        });
    };

    const inputClass = (error) => `w-full h-12 pl-4 pr-12 rounded-lg border-2 ${error ? 'border-red-500' : 'border-gray-300'} focus:border-[#1E3A8A] focus:ring-4 focus:ring-blue-50 outline-none transition-all text-base font-bold text-black mt-1`;

    const EyeIcon = ({ open }) => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            ) : (
                <><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.399 8.049 7.21 4.5 12 4.5c4.79 0 8.601 3.549 9.963 7.178.07.207.07.431 0 .639C20.601 15.951 16.79 19.5 12 19.5c-4.79 0-8.601-3.549-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>
            )}
        </svg>
    );

    return (
        <section className={className} style={{fontFamily: 'Arial, sans-serif'}}>
            <header className="mb-8">
                <p className="text-sm font-bold text-gray-600">Actualiza tu contraseña para mantener tu cuenta segura.</p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6 max-w-xl">
                {/* PASSWORD ACTUAL */}
                <div className="relative">
                    <label className="block text-[11px] font-black text-black uppercase tracking-widest">Contraseña Actual</label>
                    <input
                        ref={currentPasswordInput}
                        type={showCurrent ? 'text' : 'password'}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        className={inputClass(errors.current_password)}
                    />
                    <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-4 top-[38px] text-[#1E3A8A] hover:text-[#F59E0B]">
                        <EyeIcon open={showCurrent} />
                    </button>
                    <InputError message={errors.current_password} className="mt-2 font-bold" />
                </div>

                {/* NUEVA PASSWORD */}
                <div className="relative">
                    <label className="block text-[11px] font-black text-black uppercase tracking-widest">Nueva Contraseña</label>
                    <input
                        ref={passwordInput}
                        type={showNew ? 'text' : 'password'}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className={inputClass(errors.password)}
                    />
                    <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-[38px] text-[#1E3A8A] hover:text-[#F59E0B]">
                        <EyeIcon open={showNew} />
                    </button>
                    <InputError message={errors.password} className="mt-2 font-bold" />
                </div>

                {/* CONFIRMAR PASSWORD */}
                <div className="relative">
                    <label className="block text-[11px] font-black text-black uppercase tracking-widest">Confirmar Contraseña</label>
                    <input
                        type={showConfirm ? 'text' : 'password'}
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className={inputClass(errors.password_confirmation)}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-[38px] text-[#1E3A8A] hover:text-[#F59E0B]">
                        <EyeIcon open={showConfirm} />
                    </button>
                    <InputError message={errors.password_confirmation} className="mt-2 font-bold" />
                </div>

                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-[#1E3A8A] text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#162d6b] transition-all shadow-md disabled:opacity-50"
                    >
                        Cambiar Contraseña
                    </button>

                    <Transition show={recentlySuccessful} enter="transition ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition ease-in duration-100" leaveTo="opacity-0">
                        <p className="text-sm font-bold text-green-600">✓ Guardado</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
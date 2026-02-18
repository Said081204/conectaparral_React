import React, { useEffect, useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Plus, RotateCcw, CheckCircle2, MapPin } from "lucide-react"; 
import InputError from '@/Components/InputError';
import ConfirmationModal from './ConfirmationModal'; 

export default function AddressManager({ showForm, setShowForm, addresses = [] }) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [addressToDelete, setAddressToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        alias: '', 
        name: '',
        phone: '',
        cp: '',
        address: '',
        colonia: '',
        city: '',
        state: '',
        between_streets: '',
        references: '',
        is_default: false,
    });

    const arialStyle = { fontFamily: 'Arial, Helvetica, sans-serif' };

    useEffect(() => {
        if (data.cp.startsWith('338')) {
            setData(prev => ({ ...prev, state: 'Chihuahua', city: 'Hidalgo del Parral' }));
        }
    }, [data.cp]);

    const handleEdit = (address) => {
        setEditingId(address.id);
        setData({
            alias: address.alias || '',
            name: address.name || '',
            phone: address.phone || '',
            cp: address.cp || '',
            address: address.address || '',
            colonia: address.colonia || '',
            city: address.city || '',
            state: address.state || '',
            between_streets: address.between_streets || '',
            references: address.references || '',
            is_default: address.is_default || false,
        });
        setShowForm(true);
    };

    const handleDeleteClick = (id) => setAddressToDelete(id);

    const handleConfirmDelete = () => {
        if (!addressToDelete) return;
        router.delete(route('profile.address.destroy', addressToDelete), {
            onBefore: () => setIsDeleting(true),
            onSuccess: () => { setAddressToDelete(null); setIsDeleting(false); },
            onFinish: () => setIsDeleting(false),
        });
    };

    const handleSetDefault = (id) => router.patch(route('profile.address.default', id));

    const submitAddress = (e) => {
        e.preventDefault();
        const action = editingId 
            ? put(route('profile.address.update', editingId)) 
            : post(route('profile.address.store'));

        action.onSuccess = () => {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                reset();
                setEditingId(null);
                setShowForm(false);
            }, 2000);
        };
    };

    return (
        <div style={arialStyle} className="w-full max-w-4xl mx-auto px-4 sm:px-6 animate-in slide-in-from-bottom-4 duration-500">
            
            <ConfirmationModal 
                isOpen={!!addressToDelete} 
                onClose={() => setAddressToDelete(null)} 
                onConfirm={handleConfirmDelete}
                loading={isDeleting}
                title="¿Eliminar esta dirección?"
                message="Esta acción no se puede deshacer y la dirección será eliminada permanentemente de tu cuenta."
            />

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 border-b-2 border-[#E5E7EB] pb-6 gap-4">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-black text-[#1E3A8A] uppercase tracking-tighter">
                        {showForm ? (editingId ? 'Editar Dirección' : 'Nueva Dirección') : 'Mis Direcciones'}
                    </h2>
                    <p className="text-sm font-bold text-gray-500 mt-1 uppercase tracking-tight">Lugares de entrega frecuentes</p>
                </div>
                {showForm && !showSuccess && (
                    <button onClick={() => { setShowForm(false); setEditingId(null); reset(); }} className="flex items-center gap-2 text-xs font-black text-[#F59E0B] uppercase tracking-widest hover:text-[#1E3A8A] transition-colors">
                        <RotateCcw size={16} /> Volver al listado
                    </button>
                )}
            </div>

            {showSuccess ? (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-in zoom-in-95">
                    <CheckCircle2 size={60} className="text-green-500 mb-4" />
                    <h3 className="text-xl font-black text-[#1E3A8A] uppercase">¡Guardado con éxito!</h3>
                </div>
            ) : !showForm ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button 
                        onClick={() => { reset(); setEditingId(null); setShowForm(true); }}
                        className="group border-2 border-dashed border-[#E5E7EB] rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:border-[#F59E0B] hover:bg-amber-50/30 transition-all min-h-[220px]"
                    >
                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#F59E0B] transition-colors shadow-sm">
                            <Plus size={32} className="text-[#6B7280] group-hover:text-[#1E3A8A]" strokeWidth={3} />
                        </div>
                        <span className="text-lg font-black text-[#6B7280] group-hover:text-[#1E3A8A] uppercase tracking-tight">Agregar domicilio</span>
                    </button>

                    {addresses.map((address) => (
                        <div key={address.id} className={`relative p-6 rounded-2xl border-2 transition-all ${address.is_default ? 'border-[#1E3A8A] bg-blue-50/20' : 'border-[#E5E7EB] bg-white'}`}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} className={address.is_default ? 'text-[#1E3A8A]' : 'text-gray-400'} />
                                    <span className="text-[11px] font-black uppercase tracking-widest text-[#1E3A8A]">{address.alias}</span>
                                </div>
                                {address.is_default && <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-[#1E3A8A] text-white rounded-md">Principal</span>}
                            </div>
                            <h4 className="font-black text-sm uppercase text-black mb-1">{address.name}</h4>
                            <p className="text-[11px] text-gray-500 leading-relaxed uppercase font-bold">
                                {address.address}, {address.colonia}<br />
                                {address.city}, {address.state}. CP {address.cp}<br />
                                <span className="text-black font-black">TEL: {address.phone}</span>
                            </p>
                            <div className="mt-4 flex gap-4 border-t border-gray-100 pt-4">
                                <button onClick={() => handleEdit(address)} className="text-[10px] font-black text-[#1E3A8A] uppercase hover:opacity-70 transition-opacity">Editar</button>
                                <button onClick={() => handleDeleteClick(address.id)} className="text-[10px] font-black text-red-600 uppercase hover:opacity-70 transition-opacity">Eliminar</button>
                                {!address.is_default && <button onClick={() => handleSetDefault(address.id)} className="ml-auto text-[10px] font-black text-[#F59E0B] uppercase hover:opacity-70 transition-opacity">Hacer principal</button>}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <form onSubmit={submitAddress} className="space-y-6 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                        <div className="sm:col-span-2">
                            <label className="label-style">Apodo de la dirección</label>
                            <input type="text" className="input-style" placeholder="Ej. Mi Casa o Trabajo" value={data.alias} onChange={e => setData('alias', e.target.value)} required autoComplete="new-password" />
                            <InputError message={errors.alias} />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="label-style">Nombre de quien recibe</label>
                            <input type="text" className="input-style" placeholder="Nombre de la persona que recibirá el paquete" value={data.name} onChange={e => setData('name', e.target.value)} required autoComplete="new-password" />
                            <InputError message={errors.name} />
                        </div>

                        <div className="col-span-1">
                            <label className="label-style">Código Postal (5 dígitos)</label>
                            <input 
                                type="text" 
                                className="input-style" 
                                placeholder="00000" 
                                maxLength="5" 
                                value={data.cp} 
                                onChange={e => setData('cp', e.target.value.replace(/\D/g, '').slice(0, 5))} 
                                required 
                                autoComplete="postal-code" 
                            />
                            <InputError message={errors.cp} />
                        </div>

                        <div className="col-span-1">
                            <label className="label-style">Teléfono</label>
                            <div className="relative flex">
                                <div className="flex items-center justify-center bg-gray-100 border-2 border-r-0 border-[#E5E7EB] rounded-l-xl px-4 mt-1 text-xs font-black text-[#1E3A8A]">+52</div>
                                <input type="tel" className="input-style !rounded-l-none !mt-1" placeholder="6270000000" maxLength="10" value={data.phone} onChange={e => setData('phone', e.target.value.replace(/\D/g, ''))} required autoComplete="new-password" />
                            </div>
                            <InputError message={errors.phone} />
                        </div>

                        <div className="col-span-1">
                            <label className="label-style">Ciudad / Municipio</label>
                            <input type="text" className="input-style" placeholder="Nombre de la ciudad" value={data.city} onChange={e => setData('city', e.target.value)} required autoComplete="new-password" />
                        </div>

                        <div className="col-span-1">
                            <label className="label-style">Estado</label>
                            <input type="text" className="input-style" placeholder="Nombre del estado" value={data.state} onChange={e => setData('state', e.target.value)} required autoComplete="new-password" />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="label-style">Colonia</label>
                            <input type="text" className="input-style" placeholder="Nombre del sector o colonia" value={data.colonia} onChange={e => setData('colonia', e.target.value)} required autoComplete="new-password" />
                            <InputError message={errors.colonia} />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="label-style">Calle y Número</label>
                            <input type="text" className="input-style" placeholder="Calle principal y número de casa" value={data.address} onChange={e => setData('address', e.target.value)} required autoComplete="new-password" />
                            <InputError message={errors.address} />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="label-style">¿Entre qué calles está?</label>
                            <input type="text" className="input-style" placeholder="Referencia de calles laterales" value={data.between_streets} onChange={e => setData('between_streets', e.target.value)} autoComplete="new-password" />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="label-style">Referencias del domicilio</label>
                            <textarea className="input-style h-24 resize-none pt-4" placeholder="Describe el color de la casa, portón o negocios cercanos para facilitar la entrega" value={data.references} onChange={e => setData('references', e.target.value)} autoComplete="new-password"></textarea>
                        </div>

                        <div className="sm:col-span-2 flex items-center gap-3 py-3 px-4 bg-gray-50 rounded-xl border border-gray-200">
                            <input type="checkbox" id="is_default" className="w-5 h-5 border-2 border-gray-400 rounded cursor-pointer accent-[#1E3A8A]" checked={data.is_default} onChange={e => setData('is_default', e.target.checked)} />
                            <label htmlFor="is_default" className="text-[10px] font-black text-black cursor-pointer select-none uppercase tracking-widest">Establecer como principal</label>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-100">
                        <button type="submit" disabled={processing} className="w-full sm:w-auto bg-[#1E3A8A] text-white px-12 py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-[#162d6b] transition-all">
                            {processing ? 'Guardando...' : (editingId ? 'Actualizar Dirección' : 'Guardar Dirección')}
                        </button>
                        <button type="button" onClick={() => { setShowForm(false); setEditingId(null); reset(); }} className="w-full sm:w-auto bg-white text-gray-500 border-2 border-gray-200 px-12 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-50 transition-all">
                            Cancelar
                        </button>
                    </div>
                </form>
            )}

            <style dangerouslySetInnerHTML={{ __html: `
                .label-style { display: block; font-size: 11px; font-weight: 900; color: #000; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
                .input-style { width: 100%; height: 52px; padding: 0 1.25rem; background-color: #fcfcfc; border: 2px solid #E5E7EB; border-radius: 0.75rem; font-size: 15px; font-weight: 600; color: #000; outline: none; transition: all 0.2s; }
                .input-style::placeholder { color: #9CA3AF; font-weight: 400; font-size: 13px; text-transform: none; letter-spacing: normal; }
                .input-style:focus { border-color: #1E3A8A; background-color: #fff; box-shadow: 0 0 0 4px rgba(30, 58, 138, 0.05); }
            `}} />
        </div>
    );
}
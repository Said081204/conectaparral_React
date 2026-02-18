import React from 'react';
import { Link } from '@inertiajs/react';
import { PackageOpen } from "lucide-react";

export default function MyOrders() {
    return (
        <div className="animate-in fade-in duration-500">
            <h2 className="text-2xl lg:text-3xl font-black text-[#1E3A8A] mb-8 border-b-2 border-[#E5E7EB] pb-4 uppercase">Mis Pedidos</h2>
            <div className="flex flex-col items-center justify-center py-16 lg:py-24 text-center">
                <div className="mb-8">
                    <PackageOpen size={120} className="text-[#E5E7EB]" strokeWidth={1} />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-[#1F2937] mb-2">Parece que aún no has comprado</h3>
                <p className="text-[#6B7280] text-base mb-10 max-w-sm font-medium">Tus compras aparecerán aquí para que puedas gestionar tus envíos.</p>
                <Link href="/" className="bg-[#1E3A8A] text-white px-10 py-4 rounded-xl font-extrabold text-sm uppercase tracking-widest hover:bg-[#162d6e] transition-all shadow-lg shadow-blue-900/10">
                    Explorar productos
                </Link>
            </div>
        </div>
    );
}
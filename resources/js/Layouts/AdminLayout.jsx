import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import AdminSidebar from '@/Components/Admin/Layout/AdminSidebar';
import AdminHeader from '@/Components/Admin/Layout/AdminHeader';

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar Lateral Izquierdo */}
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            <div className="flex-1 flex flex-col">
                {/* Header Superior */}
                <AdminHeader user={auth.user} />

                {/* Área de Contenido Dinámico */}
                <main className="p-6 lg:p-10 flex-1">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>

                {/* Footer opcional */}
                <footer className="p-4 text-center text-xs text-slate-400">
                    &copy; 2026 Conecta Parral - Panel de Control
                </footer>
            </div>
        </div>
    );
}
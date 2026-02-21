import React, { useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';

export default function Dashboard() {
  // ✅ Llama hooks SOLO una vez y en el top del componente
  const { auth } = usePage().props;
  const role = auth?.user?.role;

  // ✅ logs seguros (sin volver a llamar hooks)
  console.log('ROLE:', role);
  console.log('AUTH USER:', auth?.user);

  useEffect(() => {
    // Esperar a que exista auth.user
    if (!auth?.user) return;

    if (role === 'admin') {
      router.visit(route('admin.home'));
    } else if (role === 'vendor') {
      router.visit(route('vendor.home'));
    } else {
      router.visit(route('public.home'));
    }
  }, [auth?.user, role]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500 animate-pulse">Cargando tu panel personalizado...</p>
    </div>
  );
}
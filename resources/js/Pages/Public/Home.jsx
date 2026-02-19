import React, { useEffect } from "react";
import PublicLayout from "@/Layouts/PublicLayout";
import { usePage } from "@inertiajs/react";

// Componentes adaptados
import Portada from "@/Components/Public/Home/Portada";
import Categorias from "@/Components/Public/Home/Categorias";
import Productos from "@/Components/Public/Home/Productos";

export default function Home({ auth }) {
    // Usamos usePage de forma segura
    const { props } = usePage();
    
    // Obtenemos flash con un valor por defecto para evitar el pantallazo blanco
    const flash = props?.flash || {};

    useEffect(() => {
        // Solo ejecutamos la lógica si existe el mensaje específico
        if (flash.verified === true || flash.status === 'verification-success') {
            alert("¡Cuenta verificada con éxito! Bienvenido a ConectaParral.");
            
            // Opcional: Limpiar el mensaje de la URL para que no salga el alert cada vez que recargues
            // window.history.replaceState({}, document.title, window.location.pathname);
        }
    }, [flash]);

    return (
        <PublicLayout user={auth?.user}>
            <Portada />

            <main className="space-y-4 sm:space-y-8 pb-20">
                <Categorias />
                <Productos />
            </main>
        </PublicLayout>
    );
}
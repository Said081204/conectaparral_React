import React from 'react';
import { Link } from '@inertiajs/react';
import { 
    PackageOpen, 
    ExternalLink, 
    ChevronRight, 
    Clock, 
    CheckCircle2, 
    Truck, 
    AlertCircle,
    FileText,
    RefreshCcw
} from "lucide-react";

export default function MyOrders({ orders = [] }) {
    
    // --- DATOS FICTICIOS PARA LA SIMULACIÓN ---
    // Si no recibes pedidos del backend, usaremos este para la demostración
    const mockOrder = {
        id: 1,
        order_number: "CP-7742190",
        date: "17 de Febrero, 2026",
        total: "1,549.00",
        status: "en_camino", // Puede ser: procesando, en_camino, entregado, cancelado
        shipping_name: "Usuario Demo",
        items: [
            {
                id: 101,
                name: "Tenis Running Ultra Light - Edición Parral",
                quantity: 1,
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=200&auto=format&fit=crop"
            },
            {
                id: 102,
                name: "Sudadera Hoodie Classic Navy",
                quantity: 1,
                image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=200&auto=format&fit=crop"
            }
        ]
    };

    // Usamos el mock si el array está vacío para esta prueba
    const displayOrders = orders.length > 0 ? orders : [mockOrder];

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-8 border-b-2 border-[#E5E7EB] pb-4">
                <h2 className="text-2xl lg:text-3xl font-black text-[#1E3A8A] uppercase tracking-tight">Mis Pedidos</h2>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    {displayOrders.length} pedido(s)
                </p>
            </div>

            <div className="space-y-8">
                {displayOrders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>
        </div>
    );
}

function OrderCard({ order }) {
    const statusConfig = {
        'procesando': { color: 'text-amber-600', bg: 'bg-amber-50', icon: <Clock size={16}/>, label: 'Procesando Pago', progress: 'w-1/4' },
        'en_camino': { color: 'text-blue-600', bg: 'bg-blue-50', icon: <Truck size={16}/>, label: 'En camino', progress: 'w-2/3' },
        'entregado': { color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <CheckCircle2 size={16}/>, label: 'Entregado', progress: 'w-full' },
        'cancelado': { color: 'text-red-600', bg: 'bg-red-50', icon: <AlertCircle size={16}/>, label: 'Cancelado', progress: 'w-0' },
    };

    const currentStatus = statusConfig[order.status] || statusConfig['procesando'];

    return (
        <div className="border-2 border-[#E5E7EB] rounded-2xl overflow-hidden hover:border-[#1E3A8A]/30 transition-all duration-300 group bg-white shadow-sm hover:shadow-md">
            
            {/* CABECERA: Info Administrativa */}
            <div className="bg-gray-50/80 p-4 border-b border-[#E5E7EB] flex flex-wrap justify-between items-center gap-4 text-[11px] sm:text-xs">
                <div className="flex gap-6 md:gap-12">
                    <div>
                        <p className="font-black text-gray-400 uppercase tracking-tighter mb-0.5">Fecha</p>
                        <p className="font-bold text-gray-700">{order.date}</p>
                    </div>
                    <div>
                        <p className="font-black text-gray-400 uppercase tracking-tighter mb-0.5">Total</p>
                        <p className="font-black text-[#1E3A8A]">${order.total}</p>
                    </div>
                    <div className="hidden md:block">
                        <p className="font-black text-gray-400 uppercase tracking-tighter mb-0.5">Enviar a</p>
                        <p className="font-bold text-gray-700 truncate max-w-[120px]">{order.shipping_name}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <p className="font-black text-gray-400 uppercase tracking-tighter mb-0.5">Referencia</p>
                    <p className="font-bold text-gray-700">#{order.order_number}</p>
                </div>
            </div>

            {/* CUERPO: Productos y Status */}
            <div className="p-5">
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                    
                    <div className="flex-1 space-y-5">
                        {/* Status Badge */}
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${currentStatus.bg} ${currentStatus.color} border border-current/10`}>
                            {currentStatus.icon}
                            {currentStatus.label}
                        </div>

                        {/* Items List */}
                        <div className="space-y-4">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="flex gap-4 items-center group/item">
                                    <div className="h-20 w-20 bg-gray-50 rounded-xl flex-shrink-0 border border-gray-100 overflow-hidden relative">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" 
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-gray-800 leading-tight mb-1 group-hover/item:text-[#1E3A8A] transition-colors">
                                            {item.name}
                                        </h4>
                                        <div className="flex items-center gap-3">
                                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-tighter bg-gray-100 px-2 py-0.5 rounded">
                                                Cant: {item.quantity}
                                            </p>
                                            <Link href={`/product/${item.id}`} className="text-[11px] text-[#1E3A8A] font-black hover:underline uppercase tracking-tighter">
                                                Ver producto
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: Botones Pro */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:w-52">
                        <button className="flex-1 bg-[#1E3A8A] text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#F59E0B] transition-all shadow-lg shadow-blue-900/10 active:scale-95 flex items-center justify-center gap-2">
                            <Truck size={14} /> Rastrear Envío
                        </button>
                        <button className="flex-1 border-2 border-[#E5E7EB] text-gray-700 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95">
                            Detalles del Pedido
                        </button>
                        <div className="hidden lg:flex pt-3 flex-col gap-2 border-t border-gray-100 mt-2">
                            <button className="text-[9px] font-black text-gray-400 hover:text-[#1E3A8A] flex items-center gap-2 uppercase tracking-widest transition-colors">
                                <FileText size={14} /> Factura Electrónica
                            </button>
                            <button className="text-[9px] font-black text-gray-400 hover:text-red-500 flex items-center gap-2 uppercase tracking-widest transition-colors">
                                <RefreshCcw size={14} /> Problemas / Devolución
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            
            {/* FOOTER: Barra de progreso animada */}
            <div className="px-5 pb-5">
                 <div className="relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner">
                    <div 
                        className={`absolute top-0 left-0 h-full transition-all duration-1000 ease-out 
                        ${order.status === 'entregado' ? 'bg-emerald-500' : 'bg-[#F59E0B] animate-pulse'} 
                        ${currentStatus.progress}`}
                    />
                 </div>
                 <div className="flex justify-between mt-2 px-1">
                    <span className={`text-[9px] font-bold uppercase tracking-tighter ${order.status !== 'cancelado' ? 'text-blue-600' : 'text-gray-400'}`}>Confirmado</span>
                    <span className={`text-[9px] font-bold uppercase tracking-tighter ${order.status === 'en_camino' || order.status === 'entregado' ? 'text-blue-600' : 'text-gray-400'}`}>En Ruta</span>
                    <span className={`text-[9px] font-bold uppercase tracking-tighter ${order.status === 'entregado' ? 'text-emerald-600' : 'text-gray-400'}`}>Entregado</span>
                 </div>
            </div>
        </div>
    );
}
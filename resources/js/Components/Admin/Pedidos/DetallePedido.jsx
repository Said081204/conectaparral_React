import React from 'react';

export default function DetallePedido({ items }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-100">
                        <th className="py-4 text-[10px] uppercase font-bold text-slate-400 tracking-widest">Producto</th>
                        <th className="py-4 text-[10px] uppercase font-bold text-slate-400 tracking-widest text-center">Cant.</th>
                        <th className="py-4 text-[10px] uppercase font-bold text-slate-400 tracking-widest text-right">Precio</th>
                        <th className="py-4 text-[10px] uppercase font-bold text-slate-400 tracking-widest text-right">Subtotal</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {items.map((item, index) => (
                        <tr key={index} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="py-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                                        <img src={item.imagen} alt={item.nombre} className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">{item.nombre}</p>
                                        <p className="text-xs text-slate-500">SKU: {item.sku || 'N/A'}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4 text-center text-sm font-medium text-slate-600">
                                {item.cantidad}
                            </td>
                            <td className="py-4 text-right text-sm text-slate-600">
                                ${new Intl.NumberFormat().format(item.precio)}
                            </td>
                            <td className="py-4 text-right text-sm font-bold text-slate-900">
                                ${new Intl.NumberFormat().format(item.precio * item.cantidad)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
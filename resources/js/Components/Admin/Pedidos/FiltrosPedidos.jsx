import React from 'react';

export default function FiltrosPedidos({ filters, onFilterChange }) {
    // Lista de estados para el select
    const estados = [
        { value: '', label: 'Todos los estados' },
        { value: 'pendiente', label: 'Pendientes' },
        { value: 'pagado', label: 'Pagados' },
        { value: 'en_camino', label: 'En camino' },
        { value: 'entregado', label: 'Entregados' },
        { value: 'cancelado', label: 'Cancelados' },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        onFilterChange(name, value);
    };

    return (
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                
                {/* Búsqueda por ID o Cliente */}
                <div className="md:col-span-2">
                    <label className="text-[10px] uppercase font-black text-slate-400 mb-1.5 block tracking-widest">
                        Buscar pedido
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            name="search"
                            value={filters.search || ''}
                            onChange={handleChange}
                            placeholder="ID, cliente o vendedor..."
                            className="w-full bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 transition-all placeholder:text-slate-400"
                        />
                    </div>
                </div>

                {/* Filtro por Estado */}
                <div>
                    <label className="text-[10px] uppercase font-black text-slate-400 mb-1.5 block tracking-widest">
                        Estado
                    </label>
                    <select
                        name="estado"
                        value={filters.estado || ''}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 transition-all cursor-pointer"
                    >
                        {estados.map((opcion) => (
                            <option key={opcion.value} value={opcion.value}>
                                {opcion.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Filtro por Fecha (Opcional) */}
                <div>
                    <label className="text-[10px] uppercase font-black text-slate-400 mb-1.5 block tracking-widest">
                        Fecha
                    </label>
                    <input
                        type="date"
                        name="date"
                        value={filters.date || ''}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 transition-all cursor-pointer"
                    />
                </div>

            </div>
            
            {/* Indicador de filtros activos (Si hay algo escrito o seleccionado) */}
            {(filters.search || filters.estado || filters.date) && (
                <div className="mt-4 pt-4 border-t border-slate-50 flex justify-end">
                    <button 
                        onClick={() => onFilterChange('reset', '')}
                        className="text-[10px] font-bold text-amber-600 uppercase hover:text-amber-700 transition-colors"
                    >
                        Limpiar filtros
                    </button>
                </div>
            )}
        </div>
    );
}
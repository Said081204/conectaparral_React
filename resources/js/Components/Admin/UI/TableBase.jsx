import React from 'react';

export default function TableBase({ headers = [], children, emptyMessage = "No se encontraron registros." }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {React.Children.count(children) > 0 ? (
              children
            ) : (
              <tr>
                <td colSpan={headers.length} className="px-6 py-12 text-center text-slate-400 italic">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
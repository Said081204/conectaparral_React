import React from 'react';

export default function DocumentosSolicitud({ documentos = [] }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {documentos.map((doc, idx) => (
        <div key={idx} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-amber-500 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{doc.nombre}</p>
              <p className="text-[10px] text-slate-400 uppercase font-medium">{doc.tipo} • PDF</p>
            </div>
          </div>
          <a 
            href={doc.url} 
            target="_blank" 
            className="text-xs font-bold text-blue-600 hover:text-blue-800 underline"
          >
            Ver Documento
          </a>
        </div>
      ))}
    </div>
  );
}
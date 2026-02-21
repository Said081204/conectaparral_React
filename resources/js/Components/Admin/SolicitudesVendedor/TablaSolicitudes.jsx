// Components/Admin/SolicitudesVendedor/TablaSolicitudes.jsx
import React from "react";
import TableBase from "../UI/TableBase";
import BadgeEstado from "../UI/BadgeEstado";
import BotonAccion from "../UI/BotonAccion";
import { Link } from "@inertiajs/react";

export default function TablaSolicitudes({ solicitudes }) {
  const headers = ["Negocio / Solicitante", "Tipo", "Fecha Registro", "Estado", "Acciones"];

  return (
    <TableBase headers={headers}>
      {solicitudes.map((item) => (
        <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-[#0F172A] text-white flex items-center justify-center font-black text-xs shadow-lg shadow-slate-900/10 transition-transform group-hover:scale-110">
                {item.negocio[0]}
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 leading-tight">{item.negocio}</p>
                <p className="text-[11px] font-medium text-slate-500">{item.solicitante}</p>
              </div>
            </div>
          </td>
          <td className="px-6 py-4">
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">
              {item.tipo}
            </span>
          </td>
          <td className="px-6 py-4">
            <p className="text-xs font-medium text-slate-500">{item.fecha}</p>
          </td>
          <td className="px-6 py-4">
            <BadgeEstado estado={item.status} />
          </td>
          <td className="px-6 py-4 text-right">
            <Link href={`/admin/solicitudes-vendedor/${item.id}`}>
              <BotonAccion variant="secondary" className="h-9 px-4 rounded-xl group-hover:bg-slate-900 group-hover:text-white">
                Revisar Perfil
              </BotonAccion>
            </Link>
          </td>
        </tr>
      ))}
    </TableBase>
  );
}
import React from "react";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
  return (
    <>
      <Head title="Panel del Vendedor" />
      <div className="p-8">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Panel del Vendedor
        </h1>
        <p className="mt-2 text-gray-600">
          Hola {auth?.user?.name}, aquí irá tu panel de ventas y productos.
        </p>
      </div>
    </>
  );
}
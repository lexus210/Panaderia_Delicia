import React from 'react';
import { Link } from 'react-router-dom';

const OrdenGenerada = ({ numeroOrden }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 border border-green-300 text-center max-w-md">
        <h2 className="text-3xl font-bold text-green-600 mb-4">¡Gracias por tu compra! 🎉</h2>
        <p className="text-gray-700 mb-2">Tu orden ha sido procesada con éxito.</p>
        {numeroOrden && (
          <p className="text-green-700 font-semibold mb-4">
            Número de orden: <span className="underline">{numeroOrden}</span>
          </p>
        )}
        <Link
          to="/productos"
          className="mt-4 inline-block bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition"
        >
          Seguir comprando
        </Link>
      </div>
    </div>
  );
};

export default OrdenGenerada;

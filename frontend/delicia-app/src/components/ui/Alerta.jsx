import React from 'react';

const Alerta = ({ tipo = 'info', mensaje }) => {
  const estilos = {
    info: 'bg-blue-100 text-blue-800 border-blue-300',
    exito: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    advertencia: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  };

  return (
    <div className={`border-l-4 p-4 rounded-md mb-4 ${estilos[tipo] || estilos.info}`}>
      <p className="text-sm font-medium">{mensaje}</p>
    </div>
  );
};

export default Alerta;

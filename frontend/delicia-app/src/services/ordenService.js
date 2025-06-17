// src/services/ordenService.js

const API_URL = 'http://localhost:8080/api/ordenes';

const ordenService = {
  crearOrden: async (orden) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orden),
    });

    if (!res.ok) {
      throw new Error('Error al crear la orden');
    }

    return await res.json();
  },

  obtenerOrdenesPorUsuario: async (usuarioId) => {
    const res = await fetch(`${API_URL}/usuario/${usuarioId}`);
    
    if (!res.ok) {
      throw new Error('Error al obtener órdenes del usuario');
    }

    return await res.json();
  }
};

export default ordenService;

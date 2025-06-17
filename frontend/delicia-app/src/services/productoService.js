// src/services/productoService.js

const API_URL = 'http://localhost:8080/api/productos';

const productoService = {
  obtenerProductos: async () => {
    const res = await fetch(API_URL);
    
    if (!res.ok) {
      throw new Error('Error al cargar productos');
    }

    return await res.json();
  },

  obtenerProductoPorId: async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    
    if (!res.ok) {
      throw new Error('Producto no encontrado');
    }

    return await res.json();
  },

  crearProducto: async (producto) => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto),
    });

    if (!res.ok) {
      throw new Error('Error al crear el producto');
    }

    return await res.json();
  }
};

export default productoService;

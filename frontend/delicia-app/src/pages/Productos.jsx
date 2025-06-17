import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/productos');
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/categorias');
        const data = await res.json();
        setCategorias(data.map(c => c.nombre));
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const productosFiltrados = productos.filter(p => {
    const coincideCategoria = categoriaSeleccionada === 'todos' || p.categoria === categoriaSeleccionada;
    const coincideMin = precioMin === '' || p.precio >= parseFloat(precioMin);
    const coincideMax = precioMax === '' || p.precio <= parseFloat(precioMax);
    return coincideCategoria && coincideMin && coincideMax;
  });

  if (loading) {
    return <p className="text-center text-gray-600">Cargando productos...</p>;
  }

  return (
    <div className="bg-pink-50 px-6 py-10 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-pink-700 mb-8">🎂 Nuestro Catálogo</h1>

      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-4 mb-10 items-center">
        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          className="border border-pink-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          <option value="todos">Todas las categorías</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Precio mínimo"
          value={precioMin}
          onChange={(e) => setPrecioMin(e.target.value)}
          className="border border-pink-300 rounded px-4 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />

        <input
          type="number"
          placeholder="Precio máximo"
          value={precioMax}
          onChange={(e) => setPrecioMax(e.target.value)}
          className="border border-pink-300 rounded px-4 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>

      {/* Productos */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {productosFiltrados.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No hay productos con esos filtros.</p>
        ) : (
          productosFiltrados.map((p) => (
            <div key={p.id} className="bg-white border border-pink-200 rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col">
              <img
                src={p.imagenUrl}
                alt={p.nombre}
                className="rounded-md h-44 w-full object-cover mb-3"
                onError={(e) => {
                  e.target.src = "/img/default.jpg";
                }}
              />
              <h2 className="font-semibold text-pink-700 text-lg">{p.nombre}</h2>
              <p className="text-sm text-gray-500">{p.descripcion}</p>
              <div className="mt-auto pt-3">
                <span className="block font-bold text-pink-600 text-lg">S/ {p.precio.toFixed(2)}</span>
                <button
                  onClick={() => addToCart(p)}
                  className="mt-3 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 w-full rounded-lg font-medium transition-all flex justify-center items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.293 2.293a1 1 0 001.414 1.414L8.828 14H17a1 1 0 100-2H7z" />
                  </svg>
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Productos;

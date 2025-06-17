// src/components/carrito/CarritoLista.jsx

import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CarritoLista = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-pink-50">
        <h2 className="text-2xl font-semibold text-pink-700 mb-4">Tu carrito está vacío 🛒</h2>
        <button
          onClick={() => navigate('/productos')}
          className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Ver productos
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-pink-50">
      <h2 className="text-3xl font-bold text-pink-700 mb-6">Carrito de Compras</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow border border-pink-200"
          >
            <div>
              <h3 className="text-lg font-semibold text-pink-600">{item.nombre}</h3>
              <p className="text-sm text-gray-500">S/ {item.precio.toFixed(2)} c/u</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                className="bg-pink-200 px-2 rounded text-pink-700 hover:bg-pink-300"
              >−</button>
              <span className="min-w-[24px] text-center">{item.cantidad}</span>
              <button
                onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                className="bg-pink-200 px-2 rounded text-pink-700 hover:bg-pink-300"
              >+</button>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-red-500 hover:underline ml-2"
              >
                Quitar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Subtotal y acciones */}
      <div className="mt-6 text-right">
        <p className="text-xl font-semibold text-pink-700">Subtotal: S/ {subtotal.toFixed(2)}</p>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:underline"
          >
            Vaciar carrito
          </button>
          <button
            onClick={() => navigate('/checkout')}
            className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600 transition"
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarritoLista;

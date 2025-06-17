import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Carrito = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const igv = subtotal * 0.18;
  const total = subtotal + igv;

  return (
    <div className="min-h-screen px-6 py-10 bg-pink-50">
      <h1 className="text-3xl font-bold text-pink-700 mb-6 text-center">🛍️ Tu carrito</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="space-y-4 max-w-2xl mx-auto">
            {cartItems.map(item => (
              <li key={item.id} className="border border-pink-200 p-4 rounded-lg bg-white shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="font-semibold text-pink-700">{item.nombre}</h2>
                    <p className="text-sm text-gray-600">Precio unitario: S/ {item.precio.toFixed(2)}</p>
                    <div className="flex items-center mt-1 gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.cantidad - 1)}
                        className="px-2 bg-pink-100 rounded text-pink-700 hover:bg-pink-200"
                      >−</button>
                      <span>{item.cantidad}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                        className="px-2 bg-pink-100 rounded text-pink-700 hover:bg-pink-200"
                      >+</button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-pink-600">S/ {(item.precio * item.cantidad).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm text-red-500 hover:underline mt-2"
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 max-w-2xl mx-auto text-right space-y-2">
            <p className="text-gray-800">Subtotal: <strong>S/ {subtotal.toFixed(2)}</strong></p>
            <p className="text-gray-800">IGV (18%): <strong>S/ {igv.toFixed(2)}</strong></p>
            <p className="text-xl font-bold text-pink-700">Total: S/ {total.toFixed(2)}</p>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={clearCart}
                className="bg-white border border-red-400 text-red-500 px-4 py-2 rounded hover:bg-red-50"
              >
                Vaciar carrito
              </button>
              <button
                onClick={() => navigate('/checkout')}
                className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
              >
                Ir al Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;

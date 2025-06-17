import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDialog = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  if (!isOpen) return null;

  const handleDecrease = (id, cantidad) => updateQuantity(id, cantidad - 1);
  const handleIncrease = (id, cantidad) => updateQuantity(id, cantidad + 1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-xl rounded-2xl p-6 shadow-lg relative border border-pink-200">

        {/* Botón cerrar */}
        <button
          className="absolute top-3 right-3 text-pink-600 hover:text-pink-800 text-xl font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-pink-700 mb-4 text-center">🛒 Tu carrito</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">No hay productos en el carrito.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map(({ id, nombre, precio, cantidad }) => (
              <div key={id} className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-semibold text-pink-700">{nombre}</p>
                  <p className="text-sm text-gray-500">S/ {precio.toFixed(2)} c/u</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecrease(id, cantidad)}
                    className="px-2 bg-pink-100 rounded text-lg text-pink-700 hover:bg-pink-200"
                  >−</button>
                  <span className="min-w-[20px] text-center">{cantidad}</span>
                  <button
                    onClick={() => handleIncrease(id, cantidad)}
                    className="px-2 bg-pink-100 rounded text-lg text-pink-700 hover:bg-pink-200"
                  >+</button>
                  <button
                    onClick={() => removeFromCart(id)}
                    className="text-red-500 ml-2 hover:underline text-sm"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            ))}

            {/* Subtotal y acciones */}
            <div className="border-t pt-4 mt-4">
              <p className="text-lg font-semibold text-pink-700 text-right">
                Subtotal: S/ {subtotal.toFixed(2)}
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:underline"
                >
                  Vaciar carrito
                </button>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
                >
                  Finalizar compra
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDialog;

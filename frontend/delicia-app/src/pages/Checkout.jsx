import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Alerta from '../components/ui/Alerta';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [entrega, setEntrega] = useState('delivery');
  const [metodoPago, setMetodoPago] = useState('yape');
  const [nombreCliente, setNombreCliente] = useState('');
  const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const igv = subtotal * 0.18;
  const envio = entrega === 'delivery' ? 5.0 : 0;
  const total = subtotal + igv + envio;

  const handleConfirmar = async () => {
    if (!nombreCliente.trim()) {
      setAlerta({ tipo: 'advertencia', mensaje: 'Por favor, ingresa tu nombre.' });
      return;
    }

    if (cartItems.length === 0) {
      setAlerta({ tipo: 'error', mensaje: 'Tu carrito está vacío.' });
      return;
    }

    const venta = {
      nombreCliente,
      tipoPago: metodoPago,
      total,
      detalles: cartItems.map(item => ({
        nombreProducto: item.nombre,
        cantidad: item.cantidad,
        precioUnitario: item.precio,
      })),
    };

    try {
      setLoading(true);
      const res = await fetch('http://localhost:8080/api/ventas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(venta),
      });

      if (res.ok) {
        setAlerta({ tipo: 'exito', mensaje: 'Pedido confirmado. Gracias por tu compra 🥳' });
        clearCart();
        setTimeout(() => navigate('/'), 2500); // Redirige después de 2.5 segundos
      } else {
        setAlerta({ tipo: 'error', mensaje: 'Ocurrió un error al guardar el pedido.' });
      }
    } catch (error) {
      console.error(error);
      setAlerta({ tipo: 'error', mensaje: 'No se pudo conectar con el servidor.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto bg-pink-50 min-h-screen">
      <h1 className="text-3xl font-bold text-pink-700 mb-8 text-center">🧾 Confirmar Pedido</h1>

      {alerta.mensaje && <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} />}

      <div className="mb-6">
        <label className="block mb-2 font-medium text-pink-800">👤 Nombre del cliente:</label>
        <input
          type="text"
          value={nombreCliente}
          onChange={(e) => setNombreCliente(e.target.value)}
          placeholder="Tu nombre completo"
          className="border border-pink-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-pink-700 mb-3">🧺 Resumen del carrito:</h2>
        <ul className="space-y-2">
          {cartItems.map(item => (
            <li key={item.id} className="flex justify-between border-b border-pink-200 pb-2 text-gray-700">
              <span>{item.nombre} x {item.cantidad}</span>
              <span>S/ {(item.precio * item.cantidad).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1 text-gray-800">
          <p>Subtotal: <strong>S/ {subtotal.toFixed(2)}</strong></p>
          <p>IGV (18%): <strong>S/ {igv.toFixed(2)}</strong></p>
          <p>Envío: <strong>S/ {envio.toFixed(2)}</strong></p>
        </div>
        <p className="text-lg mt-3 font-bold text-pink-700">Total: S/ {total.toFixed(2)}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-pink-700">🚚 Método de entrega:</h2>
        <label className="block mt-1">
          <input
            type="radio"
            value="delivery"
            checked={entrega === 'delivery'}
            onChange={(e) => setEntrega(e.target.value)}
          />
          <span className="ml-2">Delivery (S/ 5.00)</span>
        </label>
        <label className="block mt-1">
          <input
            type="radio"
            value="tienda"
            checked={entrega === 'tienda'}
            onChange={(e) => setEntrega(e.target.value)}
          />
          <span className="ml-2">Recojo en tienda</span>
        </label>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-pink-700">💳 Método de pago:</h2>
        <select
          className="border border-pink-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-pink-300"
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
        >
          <option value="yape">Yape</option>
          <option value="plin">Plin</option>
          <option value="tarjeta">Tarjeta</option>
          <option value="contra_entrega">Pago contra entrega</option>
        </select>
      </div>

      <button
        onClick={handleConfirmar}
        className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-lg transition w-full disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Procesando pedido...' : 'Confirmar pedido'}
      </button>
    </div>
  );
};

export default Checkout;

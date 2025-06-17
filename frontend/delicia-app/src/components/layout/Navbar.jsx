import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';
import CartDialog from '../CartDialog';

function Navbar() {
  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalCantidad = cartItems.reduce((sum, item) => sum + item.cantidad, 0);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem('usuario'));

  const logout = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-4 bg-pink-100 shadow-md border-b border-pink-200">
        <h1 className="text-2xl font-bold text-pink-700 tracking-wide">🎂 Pastelería Delicia</h1>
        <ul className="flex gap-5 items-center text-pink-700 font-medium">
          <li><Link to="/" className="hover:underline">Inicio</Link></li>
          <li><Link to="/productos" className="hover:underline">Productos</Link></li>
          <li>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center hover:underline"
            >
              🛒 Carrito
              {totalCantidad > 0 && (
                <span className="ml-2 text-xs bg-pink-500 text-white rounded-full px-2 py-0.5 font-semibold">
                  {totalCantidad}
                </span>
              )}
            </button>
          </li>

          {usuario ? (
            <>
              <li className="text-sm text-gray-600">Hola, {usuario.nombre}</li>
              <li>
                <button
                  onClick={logout}
                  className="text-red-500 text-sm hover:underline"
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="hover:underline">Iniciar sesión</Link></li>
              <li><Link to="/register" className="hover:underline">Registrarse</Link></li>
            </>
          )}
        </ul>
      </nav>

      <CartDialog isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Navbar;

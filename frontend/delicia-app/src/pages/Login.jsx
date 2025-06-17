import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState(''); // 'error' o 'success'
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMensaje('Completa todos los campos.');
      setTipoMensaje('error');
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        setMensaje('Inicio de sesión exitoso');
        setTipoMensaje('success');
        localStorage.setItem('usuario', JSON.stringify(data.user));
        setTimeout(() => navigate('/'), 1000); // pequeño delay
      } else {
        setMensaje(data.message || 'Error al iniciar sesión');
        setTipoMensaje('error');
      }
    } catch (err) {
      console.error(err);
      setMensaje('Error de conexión con el servidor.');
      setTipoMensaje('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="max-w-md w-full bg-white border border-pink-200 rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">🍓 Iniciar Sesión</h2>

        {mensaje && (
          <p
            className={`text-center mb-4 font-medium ${
              tipoMensaje === 'success' ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {mensaje}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-pink-800 mb-1">Correo electrónico</label>
            <input
              type="email"
              required
              className="w-full border border-pink-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm text-pink-800 mb-1">Contraseña</label>
            <input
              type="password"
              required
              className="w-full border border-pink-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition disabled:opacity-60"
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="text-pink-600 font-medium hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

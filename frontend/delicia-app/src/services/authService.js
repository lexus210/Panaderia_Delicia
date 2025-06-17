// src/services/authService.js

const API_URL = 'http://localhost:8080/api/auth';

const authService = {
  login: async ({ email, password }) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error('Error al iniciar sesión');
    }

    const data = await res.json();
    localStorage.setItem('usuario', JSON.stringify(data.user));
    return data;
  },

  register: async ({ nombre, email, password }) => {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, password }),
    });

    if (!res.ok) {
      throw new Error('Error al registrarse');
    }

    const data = await res.json();
    return data;
  },

  logout: () => {
    localStorage.removeItem('usuario');
  },

  getUser: () => {
    const user = localStorage.getItem('usuario');
    return user ? JSON.parse(user) : null;
  }
};

export default authService;

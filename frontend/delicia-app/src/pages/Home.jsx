import React from 'react';
import Catalogo from '../components/catalogo/Catalogo';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main className="bg-[url('/src/jpg/fondo.jpg')] bg-cover bg-fixed bg-center min-h-screen">
      
      {/* HERO SECTION */}
      <header className="relative bg-[url('/src/assets/hero-pasteleria.jpg')] bg-cover bg-center text-white py-32 px-6">
        <div className="absolute inset-0 bg-pink-200 bg-opacity-30 backdrop-blur-sm"></div>

        <div className="relative max-w-5xl mx-auto text-center animate-fade-in">
          <p className="text-lg mb-3 font-semibold text-pink-400 tracking-widest uppercase drop-shadow-lg">
            Sweet Bakery
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-xl tracking-wide text-white">
            Momentos Dulces, <br />
            <span className="text-pink-300">Sabores Inolvidables</span>
          </h1>
          <div className="flex justify-center gap-8 mt-8">
            <Link
              to="#productos"
              className="bg-gradient-to-r from-pink-400 to-pink-300 hover:from-pink-500 hover:to-pink-400 shadow-lg text-white font-bold px-8 py-4 rounded-full transition-all duration-300"
            >
              Comprar Ahora
            </Link>
            <Link
              to="/nosotros"
              className="bg-gradient-to-r from-pink-400 to-pink-300 hover:from-pink-500 hover:to-pink-400 shadow-lg text-white font-bold px-8 py-4 rounded-full transition-all duration-300"
            >
              Conócenos
            </Link>
          </div>
        </div>
      </header>

      {/* CATÁLOGO DE PRODUCTOS */}
      <section
        id="productos"
        className="py-20 px-6 bg-gradient-to-b from-pink-50 via-pink-100 to-pink-50 text-gray-800"
      >
        <h2 className="text-center text-5xl font-extrabold mb-14 tracking-wide drop-shadow-md text-pink-600 animate-fade-up">
          Nuestros Pasteles
        </h2>
        <Catalogo />
      </section>

      {/* PROMOCIÓN */}
      <section className="py-20 px-6 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100 text-center rounded-tl-3xl rounded-br-3xl shadow-xl max-w-4xl mx-auto mt-20 animate-fade-in-up">
        <h3 className="text-4xl font-extrabold text-pink-600 mb-6 tracking-wide drop-shadow-sm">
          20% de Descuento en tu Primer Pedido
        </h3>
        <p className="text-gray-700 text-lg mb-8 max-w-xl mx-auto">
          Suscríbete y recibe un dulce regalo de bienvenida. ¡Disfruta nuestros sabores únicos!
        </p>
        <button className="bg-pink-400 hover:bg-pink-500 text-white px-10 py-4 rounded-full font-bold shadow-md transition-colors duration-300">
          Más Información
        </button>
      </section>
    </main>
  );
};

export default Home;

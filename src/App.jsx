import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inicio from './pages/Inicio';
import MisCompaneros from './pages/MisCompaneros';
import Registro from './pages/Registro';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
        {/* Menú de Navegación Simple */}
        <nav className="bg-blue-600 text-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
            {/* Título Modificado */}
            <span className="font-bold text-xl tracking-tight">Evaluación Formativa 2</span>
            <div className="space-x-4">
              <Link to="/inicio" className="hover:text-blue-200 transition-colors font-medium">
                Inicio
              </Link>
              <Link to="/mis-companeros" className="hover:text-blue-200 transition-colors font-medium">
                Mis Compañeros
              </Link>
            </div>
          </div>
        </nav>

        {/* Contenedor de Vistas */}
        <main className="flex-grow container mx-auto max-w-6xl px-4 py-8">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/mis-companeros" element={<MisCompaneros />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/registrarme" element={<Registro />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

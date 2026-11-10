import React from 'react';
import { useNavigate } from 'react-router-dom';

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-2xl mx-auto border border-gray-100">
      <h1 className="text-3xl font-extrabold text-blue-600 mb-4">
        Evaluación Formativa Unidad 2
      </h1>
      <p className="text-gray-600 text-lg mb-6 leading-relaxed">
        Bienvenido a la plataforma de gestión de alumnos. Esta aplicación interactúa y
        permite listar y registrar compañeros de sección.
      </p>
      <div className="border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-500 mb-4">Módulo: Tecnologías Web (Cliente-Servidor)</p>
        <button 
          onClick={() => navigate('/mis-companeros')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md shadow transition-colors"
        >
          Ver Mis Compañeros
        </button>
      </div>
    </div>
  );
}

export default Inicio;

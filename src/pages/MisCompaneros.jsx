import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerCompaneros } from '../services/api';

function MisCompaneros() {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerCompaneros()
      .then((data) => {
        setUsuarios(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mis Compañeros</h2>
          <p className="text-sm text-gray-500">Listado de usuarios registrados en el backend</p>
        </div>
        <button
          onClick={() => navigate('/registro')}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-5 rounded-md shadow transition-colors"
        >
          Registrarme
        </button>
      </div>

      {cargando && (
        <div className="text-center py-12 text-gray-500 font-medium animate-pulse">
          Cargando compañeros...
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md border border-red-200">
          ⚠️ Ocurrió un error: {error}
        </div>
      )}

      {!cargando && !error && usuarios.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No hay compañeros registrados en este momento.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usuarios.map((user, index) => (
          <div key={user.id || index} className="bg-white rounded-lg shadow border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <div className="bg-blue-100 text-blue-600 font-bold rounded-full w-10 h-10 flex items-center justify-center uppercase">
                {user.name?.charAt(0)}{user.lastName?.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {user.name} {user.lastName}
                </h3>
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded font-mono">
                  RUT: {user.rut}
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-600 pt-2 border-t border-gray-50">
              <span className="font-medium text-gray-400 block text-xs">Correo Electrónico</span>
              <span className="break-all">{user.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MisCompaneros;

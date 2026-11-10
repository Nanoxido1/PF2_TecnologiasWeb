import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrarUsuario } from '../services/api';

function Registro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    rut: '',
    email: '',
    password: ''
  });
  const [alerta, setAlerta] = useState({ tipo: '', mensaje: '' });
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlerta({ tipo: '', mensaje: '' });

    // RegEx para validar RUT con puntos y guion (Criterio de Evaluación obligatorio)
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;
    if (!rutRegex.test(formData.rut)) {
      setAlerta({
        tipo: 'error',
        mensaje: 'El RUT debe incluir puntos y guion obligatoriamente (Ejemplo: 12.345.678-9).'
      });
      return;
    }

    setEnviando(true);

    try {
      await registrarUsuario(formData);
      setAlerta({ tipo: 'success', mensaje: '¡Registro completado con éxito! Redirigiendo...' });
      setTimeout(() => {
        navigate('/mis-companeros');
      }, 2000);
    } catch (err) {
      setAlerta({ tipo: 'error', mensaje: err.message });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-1">Formulario de Registro</h2>
      <p className="text-xs text-gray-500 mb-6">Ingresa tus datos para registrarte en el sistema.</p>

      {alerta.mensaje && (
        <div className={`p-3 text-sm rounded-md mb-4 border ${
          alerta.tipo === 'success' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
        }`}>
          {alerta.mensaje}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Nombre</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Juan"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Apellido</label>
          <input
            type="text"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="Pérez"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">RUT (Con puntos y guion)</label>
          <input
            type="text"
            name="rut"
            required
            value={formData.rut}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
            placeholder="12.345.678-9"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="juan.perez@correo.cl"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Contraseña</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-md shadow tracking-wide transition-colors mt-2 text-sm disabled:opacity-50"
        >
          {enviando ? 'Guardando...' : 'Enviar Registro'}
        </button>
      </form>
    </div>
  );
}

export default Registro;

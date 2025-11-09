import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    twitter: '',
    ocupacion: '',
    avatar: '',
    aceptaTerminos: false
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const API_BASE = 'https://backcongreso-1.onrender.com/api';


  // URLs de los 3 avatares disponibles
  const avatars = [
    { id: 1, url: 'https://i.pravatar.cc/150?img=3', label: 'Avatar 1' },
    { id: 2, url: 'https://i.pravatar.cc/150?img=12', label: 'Avatar 2' },
    { id: 3, url: 'https://i.pravatar.cc/150?img=20', label: 'Avatar 3' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAvatarSelect = (url) => {
    setFormData({ ...formData, avatar: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.aceptaTerminos) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }

    if (!formData.avatar) {
      setError('Debes seleccionar un avatar.');
      return;
    }

    try {
      setEnviando(true);
      setError('');
      setMensaje('');

      await axios.post(`${API_BASE}/registro`, formData);
      setMensaje('Usuario registrado correctamente.');

      setTimeout(() => navigate('/participantes'), 1500);
    } catch (err) {
      console.error(err);
      setError('Error al registrar el usuario. Revisa los datos.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary mb-4 fw-bold">Registro de Participante</h2>

      <form className="mx-auto" style={{ maxWidth: '600px' }} onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Apellidos</label>
            <input
              type="text"
              name="apellidos"
              className="form-control"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Usuario en Twitter</label>
          <input
            type="text"
            name="twitter"
            className="form-control"
            placeholder="@usuario"
            value={formData.twitter}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Ocupación</label>
          <input
            type="text"
            name="ocupacion"
            className="form-control"
            value={formData.ocupacion}
            onChange={handleChange}
          />
        </div>

        {/* Selección de Avatares */}
        <div className="mb-4 text-center">
          <label className="form-label d-block mb-3 fw-semibold">Selecciona un avatar</label>
          <div className="d-flex justify-content-center gap-4">
            {avatars.map((a) => (
              <div key={a.id} className="text-center">
                <input
                  type="radio"
                  id={`avatar-${a.id}`}
                  name="avatar"
                  value={a.url}
                  checked={formData.avatar === a.url}
                  onChange={() => handleAvatarSelect(a.url)}
                  className="form-check-input mb-2"
                />
                <label htmlFor={`avatar-${a.id}`} className="d-block">
                  <img
                    src={a.url}
                    alt={a.label}
                    className={`rounded-circle border ${
                      formData.avatar === a.url ? 'border-primary border-3' : 'border-secondary'
                    }`}
                    style={{ width: '80px', height: '80px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => handleAvatarSelect(a.url)}
                  />
                  <div className="mt-2">{a.label}</div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Términos */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="aceptaTerminos"
            checked={formData.aceptaTerminos}
            onChange={handleChange}
            required
          />
          <label className="form-check-label">
            Leí y acepto los términos y condiciones
          </label>
        </div>

        {/* Mensajes */}
        {error && <div className="alert alert-danger">{error}</div>}
        {mensaje && <div className="alert alert-success">{mensaje}</div>}

        {/* Botón Guardar */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-success px-5 py-2 fw-bold"
            disabled={enviando}
          >
            {enviando ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registro;

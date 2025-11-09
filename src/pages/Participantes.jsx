import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 👈 para redirigir a /registro o /gafete

const Participantes = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const API_BASE = 'https://localhost:7186/api'; // 🔹 Ajusta según tu backend

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      const res = await axios.get(`${API_BASE}/listado`);
      setUsuarios(res.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    } finally {
      setCargando(false);
    }
  };

  const buscarUsuarios = async (texto) => {
    if (!texto.trim()) {
      cargarUsuarios();
      return;
    }

    try {
      setCargando(true);
      const res = await axios.get(`${API_BASE}/listado/buscar?q=${texto}`);
      setUsuarios(res.data);
    } catch (error) {
      console.error('Error en la búsqueda:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setBusqueda(value);
    buscarUsuarios(value);
  };

  return (
    <div className="container py-5">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold mb-3 mb-md-0 text-center text-md-start">
          Participantes Registrados
        </h2>

        {/* 🔹 Botón para ir al registro */}
        <button
          className="btn btn-success btn-lg shadow-sm"
          onClick={() => navigate('/registro')}
        >
          + Nuevo Participante
        </button>
      </div>

      {/* Cuadro de búsqueda */}
      <div className="row mb-4">
        <div className="col-md-6 mx-auto">
          <input
            type="text"
            className="form-control form-control-lg shadow-sm"
            placeholder="Buscar participante por nombre..."
            value={busqueda}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Indicador de carga */}
      {cargando && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      )}

      {/* Listado de tarjetas */}
      <div className="row g-4">
        {usuarios.length > 0 ? (
          usuarios.map((u) => (
            <div
              key={u.id}
              className="col-sm-6 col-md-4 col-lg-3"
              onClick={() => navigate(`/gafete/${u.id}`)} // 👈 redirige al gafete del usuario
              style={{ cursor: 'pointer' }}
            >
              <div className="card h-100 shadow-sm border-0 hover-shadow">
                <img
                  src={u.avatar || 'https://i.pravatar.cc/150'}
                  className="card-img-top"
                  alt={u.nombre}
                  style={{
                    height: '200px',
                    objectFit: 'cover',
                    borderTopLeftRadius: '0.5rem',
                    borderTopRightRadius: '0.5rem'
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title mb-1">
                    {u.nombre} {u.apellidos}
                  </h5>
                  <p className="card-text text-muted mb-1">{u.ocupacion}</p>
                  {u.twitter && (
                    <a
                      href={`https://twitter.com/${u.twitter.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-decoration-none"
                      onClick={(e) => e.stopPropagation()} // Evita redirección si se hace click en el enlace
                    >
                      @{u.twitter.replace('@', '')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          !cargando && (
            <p className="text-center text-secondary mt-4">
              No se encontraron participantes.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Participantes;

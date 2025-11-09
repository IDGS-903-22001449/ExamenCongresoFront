import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Gafete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = "https://localhost:7186/api"; // Ajusta según tu backend

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await axios.get(`${API_BASE}/usuario/${id}`);
        setUsuario(res.data);
      } catch (error) {
        console.error("Error al cargar usuario:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuario();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="text-muted mt-2">Cargando gafete...</p>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger">No se encontró el participante.</p>
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/participantes")}
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5 d-flex flex-column align-items-center">
      <h2 className="text-primary fw-bold mb-4">Gafete del Participante</h2>

      <div className="d-flex flex-column flex-md-row gap-4">
        {/* 🔵 Cara frontal */}
        <div
          className="card shadow-lg border-0 text-center p-4"
          style={{
            width: "320px",
            background:
              "linear-gradient(180deg, rgba(0,123,255,0.1) 0%, rgba(255,255,255,1) 100%)",
            borderTop: "8px solid #007bff",
          }}
        >
          <div
            className="rounded-circle mx-auto mb-3 border border-primary border-3"
            style={{
              width: "130px",
              height: "130px",
              backgroundImage: `url(${usuario.avatar || "https://i.pravatar.cc/150"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <h4 className="fw-bold text-uppercase text-dark mb-1">
            {usuario.nombre} {usuario.apellidos}
          </h4>
          <p className="text-primary fs-6 mb-4">
            {usuario.ocupacion || "Participante"}
          </p>

          <div className="mt-auto">
            <p className="fw-semibold text-dark mb-0">Congreso TIC’s 2025</p>
            <hr className="mx-auto w-75" />
            <p className="text-muted small mb-0">
              Universidad Tecnológica de León
            </p>
          </div>
        </div>

        {/* 🟣 Cara trasera */}
        <div
          className="card shadow-lg border-0 text-center p-4"
          style={{
            width: "320px",
            backgroundColor: "#f8f9fa",
            borderTop: "8px solid #007bff",
          }}
        >
          <h5 className="fw-bold text-primary mb-3">Datos de Contacto</h5>

          <div className="text-start mb-4 px-3">
            <p className="mb-2">
              <strong>Email:</strong> <br />
              <span className="text-secondary">{usuario.email}</span>
            </p>

            <p className="mb-2">
              <strong>Twitter:</strong> <br />
              {usuario.twitter ? (
                <a
                  href={`https://twitter.com/${usuario.twitter.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-decoration-none"
                >
                  @{usuario.twitter.replace("@", "")}
                </a>
              ) : (
                <span className="text-secondary">No especificado</span>
              )}
            </p>

            <p className="mb-2">
              <strong>Ocupación:</strong> <br />
              <span className="text-secondary">
                {usuario.ocupacion || "No especificada"}
              </span>
            </p>
          </div>

          <div className="mt-auto border-top pt-3">
            <p className="small text-muted mb-1">
              © Congreso de Tecnologías 2025
            </p>
            <p className="small text-muted mb-0">
              www.congreso-utleon.edu.mx
            </p>
          </div>
        </div>
      </div>

      <button
        className="btn btn-outline-secondary mt-4 px-4"
        onClick={() => navigate("/participantes")}
      >
        ← Volver al listado
      </button>
    </div>
  );
};

export default Gafete;

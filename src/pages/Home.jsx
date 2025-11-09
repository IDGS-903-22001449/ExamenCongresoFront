import React from 'react';
import logo from '../assets/utlLogo.png';
import logoCongreso from '../assets/logoCongreso.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container-fluid bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center text-center p-4">

      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-4 mb-4">
        <img src={logo} alt="Logo UTL" className="img-fluid" style={{ maxWidth: '220px' }} />
        <img src={logoCongreso} alt="Logo Congreso" className="img-fluid" style={{ maxWidth: '220px' }} />
      </div>

      <h1 className="display-5 fw-bold text-primary mb-3">
        Congreso de Tecnologías de la Información
      </h1>

      <p className="lead text-secondary mb-4 px-3">
        Únete al evento más importante sobre innovación, desarrollo y tendencias tecnológicas.
      </p>

      <NavLink to={"/participantes"} className="btn btn-primary btn-lg px-4 shadow-sm">
        Entrar
      </NavLink>

      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(180deg, rgba(0,123,255,0.05) 0%, rgba(255,255,255,1) 100%)', zIndex: -1, }} >

      </div>
    </div>
  );
};

export default Home;

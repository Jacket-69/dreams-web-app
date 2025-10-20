import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// Importa el archivo CSS
import './SuccessPage.css';

// URL de la imagen de fondo (asumimos que está en /public)
const BG_IMAGE_URL = '/imagen_edificio.jpg';
// URL del logo (asumimos que está en /public)
const LOGO_URL = '/logo_blanco.png';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtener el correo desde el estado de navegación o usar uno por defecto
  const email = location.state?.email || 'usuario@ucen.cl';

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="success-page">
      <div 
        className="success-background"
        style={{ backgroundImage: `url(${BG_IMAGE_URL})` }}
      >
        <div className="success-overlay"></div>
        <div className="success-overlay-dark"></div>
      </div>
      
      {/* Logo en la esquina superior izquierda */}
      <div className="success-logo-top">
        <img src={LOGO_URL} alt="Logo UCEN" className="success-logo" />
      </div>

      {/* Contenedor del Mensaje de Éxito Centrado */}
      <div className="success-content">
        <div className="success-form-container">
          <div className="success-form">
            <h1 className="success-title">RECUPERAR CONTRASEÑA</h1>
            
            <div className="success-message">
              <p className="success-text">
                Se ha enviado un correo de recuperación de contraseña al correo {email}
              </p>
            </div>

            <button type="button" className="success-button" onClick={handleBackToLogin}>
              INICIAR SESIÓN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;

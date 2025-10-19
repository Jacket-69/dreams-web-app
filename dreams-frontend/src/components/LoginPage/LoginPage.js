import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Importa el archivo CSS
import './LoginPage.css';
// Importa el componente de alerta personalizada
import Alert from '../Alert/Alert'; 

// URL de la imagen de fondo
const BG_IMAGE_URL = '/imagen_edificio.jpg';
// URL del logo
const LOGO_URL = '/logo_blanco.png';

const LoginPage = () => { // Cambiado a LoginPage para una convención más clara
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  // Función para validar email
  const validateEmail = (email) => {
    if (!email) return 'El correo es requerido';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Ingrese un correo válido';
    if (!email.includes('@ucen.cl') && !email.includes('@ucentral.cl')) {
      return 'Debe usar un correo UCEN (@ucen.cl o @ucentral.cl)';
    }
    return '';
  };

  // Función para validar contraseña
  const validatePassword = (password) => {
    if (!password) return 'La contraseña es requerida';
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    return '';
  };

  // Validación en tiempo real (valida que los campos sigan las reglas de validación al momento de que el usuario ingresa los datos)
  useEffect(() => {
    const newErrors = {
      email: touched.email ? validateEmail(formData.email) : '', //Si el campo es TRUE valida el email
      password: touched.password ? validatePassword(formData.password) : '' //Si el campo es TRUE valida la contraseña
    };
    setErrors(newErrors);
  }, [formData, touched]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleRecoveryClick = () => {
    navigate('/recovery');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados para mostrar errores
    setTouched({
      email: true,
      password: true
    });

    // Validar todos los campos
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError
      });
      return;
    }

    // Si no hay errores, proceder con el envío
    console.log('Datos del formulario:', formData);
    // Aquí iría la lógica del backend
  };

  return (
    <div className="login-page">
      <div 
        className="login-background"
        style={{ backgroundImage: `url(${BG_IMAGE_URL})` }}
      >
        <div className="login-overlay"></div>
        <div className="login-overlay-dark"></div>
      </div>
      
      {/* Logo en la esquina superior izquierda */}
      <div className="login-logo-top">
        <img src={LOGO_URL} alt="Logo UCEN" className="login-logo" />
      </div>

      {/* Contenedor del Formulario Centrado */}
      <div className="login-content">
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <h1 className="login-title">INICIAR SESIÓN</h1>
            
            {/* Campo Correo UCEN */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">Correo UCEN</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email && touched.email ? 'form-input-error' : ''}`}
                placeholder="Ingrese su correo..."
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <Alert
                type="error"
                message={errors.email}
                show={!!errors.email && touched.email}
                position="relative"
              />
            </div>

            {/* Campo Contraseña */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-input ${errors.password && touched.password ? 'form-input-error' : ''}`}
                placeholder="Ingrese su contraseña..."
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <Alert
                type="error"
                message={errors.password}
                show={!!errors.password && touched.password}
                position="relative"
              />
            </div>

            <button type="submit" className="login-button">
              INICIAR SESIÓN
            </button>

            <button type="button" className="forgot-password-link" onClick={handleRecoveryClick}>
              Recuperar Contraseña
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
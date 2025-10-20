import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Importa el archivo CSS
import './LoginPage.css';
// Importa el componente de alerta personalizada
import Alert from '../Alert/Alert';
// Importar iconos de visibilidad
import visibilityIcon from '../../../Icons/visibility.svg';
import visibilityOffIcon from '../../../Icons/visibility_off.svg'; 

// URL de la imagen de fondo
const BG_IMAGE_URL = '/imagen_edificio.jpg';
// URL del logo
const LOGO_URL = '/logo_blanco.png';

const LoginPage = () => {
  //es un hook de React Router que te permite navegar a otras páginas
  const navigate = useNavigate();
  
  //Estado para el formulario de login que se inicializa con email y contraseña vacíos
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  //Estado para los errores de validación que se inicializa con email y contraseña vacíos
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  //Estado para los campos que se han tocado (se han interactuado) que se inicializa con email y contraseña false
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  const [showPassword, setShowPassword] = useState(false);

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

  //Si escribes "usuario@ucen.cl" en el campo email, actualiza formData.email con ese valor.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  //Se ejecuta cuando el usuario sale de un campo (hace clic fuera o presiona Tab)
  //Esto activa las validaciones en tiempo real para mostrar errores
  const handleInputBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  //Te manda a la página de recuperación de contraseña
  const handleRecoveryClick = () => {
    navigate('/recovery');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
      //Si hay errores, actualiza los errores con el email y contraseña respectivamente
      setErrors({
        email: emailError,
        password: passwordError
      });
      return; //Si hay errores, no se envía el formulario y se muestra el error
    }

    // Si no hay errores, proceder con el envío
    console.log('Datos del formulario:', formData);
    // Aquí iría la lógica del backend para verificar el email y contraseña ALEJANDROOOOOOOOOO
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
              <div className="password-input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className={`form-input ${errors.password && touched.password ? 'form-input-error' : ''}`}
                  placeholder="Ingrese su contraseña..."
                  value={formData.password}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  <img 
                    src={showPassword ? visibilityIcon : visibilityOffIcon} 
                    alt={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="password-toggle-icon"
                  />
                </button>
              </div>
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
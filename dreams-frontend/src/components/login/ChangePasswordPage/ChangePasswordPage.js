import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Importa el archivo CSS
import './ChangePasswordPage.css';
// Importa el componente de alerta personalizada
import Alert from '../Alert/Alert';
// Importar iconos de visibilidad
import visibilityIcon from '../../../Icons/visibility.svg';
import visibilityOffIcon from '../../../Icons/visibility_off.svg';

// URL de la imagen de fondo
const BG_IMAGE_URL = '/imagen_edificio.jpg';
// URL del logo
const LOGO_URL = '/logo_blanco.png';

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  
  // Estado para el formulario de cambio de contraseña
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  // Estado para los errores de validación
  const [errors, setErrors] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  // Estado para los campos que se han tocado
  const [touched, setTouched] = useState({
    newPassword: false,
    confirmPassword: false
  });

  // Estados para mostrar/ocultar contraseñas
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Función para validar contraseña nueva
  const validateNewPassword = (password) => {
    if (!password) return 'La contraseña es requerida';
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    if (!/(?=.*[a-z])/.test(password)) return 'La contraseña debe contener al menos una letra minúscula';
    if (!/(?=.*[A-Z])/.test(password)) return 'La contraseña debe contener al menos una letra mayúscula';
    if (!/(?=.*\d)/.test(password)) return 'La contraseña debe contener al menos un número';
    if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) return 'La contraseña debe contener al menos un carácter especial (!@#$%^&*()_+-=[]{}|;:,.<>?)';
    return '';
  };

  // Función para validar confirmación de contraseña
  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) return 'Debe confirmar la contraseña';
    if (confirmPassword !== formData.newPassword) return 'Las contraseñas no coinciden';
    return '';
  };

  // Validación en tiempo real
  useEffect(() => {
    const newErrors = {
      newPassword: touched.newPassword ? validateNewPassword(formData.newPassword) : '',
      confirmPassword: touched.confirmPassword ? validateConfirmPassword(formData.confirmPassword) : ''
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

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Marcar todos los campos como tocados para mostrar errores
    setTouched({
      newPassword: true,
      confirmPassword: true
    });

    // Validar todos los campos
    const newPasswordError = validateNewPassword(formData.newPassword);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword);

    if (newPasswordError || confirmPasswordError) {
      setErrors({
        newPassword: newPasswordError,
        confirmPassword: confirmPasswordError
      });
      return;
    }

    // Si no hay errores, proceder con el cambio de contraseña
    console.log('Cambiando contraseña:', formData);
    
    // TODO: Aquí iría la lógica del backend para cambiar la contraseña
    // Por ahora simulamos éxito y redirigimos al login
    alert('Contraseña cambiada exitosamente');
    navigate('/login');
  };

  return (
    <div className="change-password-page">
      <div 
        className="change-password-background"
        style={{ backgroundImage: `url(${BG_IMAGE_URL})` }}
      >
        <div className="change-password-overlay"></div>
        <div className="change-password-overlay-dark"></div>
      </div>
      
      {/* Logo en la esquina superior izquierda */}
      <div className="change-password-logo-top">
        <img src={LOGO_URL} alt="Logo UCEN" className="change-password-logo" />
      </div>

      {/* Contenedor del Formulario Centrado */}
      <div className="change-password-content">
        <div className="change-password-form-container">
          <form className="change-password-form" onSubmit={handleSubmit} noValidate>
            <h1 className="change-password-title">CAMBIAR CONTRASEÑA</h1>
            
            {/* Campo Contraseña Nueva */}
            <div className="form-group">
              <label htmlFor="newPassword" className="form-label">Contraseña Nueva</label>
              <div className="password-input-container">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  name="newPassword"
                  className={`form-input ${errors.newPassword && touched.newPassword ? 'form-input-error' : ''}`}
                  placeholder="Ingrese su nueva contraseña..."
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={toggleNewPasswordVisibility}
                  aria-label={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  <img 
                    src={showNewPassword ? visibilityIcon : visibilityOffIcon} 
                    alt={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="password-toggle-icon"
                  />
                </button>
              </div>
              <Alert
                type="error"
                message={errors.newPassword}
                show={!!errors.newPassword && touched.newPassword}
                position="relative"
              />
            </div>

            {/* Campo Confirmar Contraseña */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
              <div className="password-input-container">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`form-input ${errors.confirmPassword && touched.confirmPassword ? 'form-input-error' : ''}`}
                  placeholder="Vuelva a escribir su nueva contraseña..."
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={toggleConfirmPasswordVisibility}
                  aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  <img 
                    src={showConfirmPassword ? visibilityIcon : visibilityOffIcon} 
                    alt={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    className="password-toggle-icon"
                  />
                </button>
              </div>
              <Alert
                type="error"
                message={errors.confirmPassword}
                show={!!errors.confirmPassword && touched.confirmPassword}
                position="relative"
              />
            </div>

            <button type="submit" className="change-password-button">
              CAMBIAR CONTRASEÑA
            </button>

            <button type="button" className="back-to-login-link" onClick={handleBackToLogin}>
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;

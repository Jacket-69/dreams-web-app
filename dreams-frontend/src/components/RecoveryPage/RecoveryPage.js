import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Importa el archivo CSS
import './RecoveryPage.css';
// Importa el componente de alerta personalizada
import Alert from '../Alert/Alert';

// URL de la imagen de fondo (asumimos que está en /public)
const BG_IMAGE_URL = '/imagen_edificio.jpg';
// URL del logo (asumimos que está en /public)
const LOGO_URL = '/logo_blanco.png';

const RecoveryPage = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    rut: ''
  });

  const [errors, setErrors] = useState({
    rut: ''
  });

  const [touched, setTouched] = useState({
    rut: false
  });

  // Función para validar RUT con algoritmo módulo 11
  const validateRUT = (rut) => {
    if (!rut) return 'El RUT es requerido';
    
    // Limpiar el RUT (quitar puntos, guiones y espacios)
    const cleanRut = rut.replace(/[^0-9kK]/g, '');
    
    if (cleanRut.length < 8 || cleanRut.length > 9) {
      return 'El RUT debe tener 9 dígitos';
    }

    // Separar número y dígito verificador
    const rutNumber = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toUpperCase();

    // Validar que el número del RUT sea válido
    if (!/^[0-9]+$/.test(rutNumber)) {
      return 'El RUT contiene caracteres inválidos';
    }

    // Calcular dígito verificador con algoritmo módulo 11
    let sum = 0;
    let multiplier = 2;
    
    for (let i = rutNumber.length - 1; i >= 0; i--) {
      sum += parseInt(rutNumber[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    
    const remainder = sum % 11;
    const calculatedDV = remainder === 0 ? '0' : remainder === 1 ? 'K' : (11 - remainder).toString();
    
    if (calculatedDV !== dv) {
      return 'El RUT ingresado no es válido';
    }

    return '';
  };

  // Función para formatear RUT mientras el usuario escribe
  const formatRUT = (value) => {
    // Remover todo excepto números y K
    const cleanValue = value.replace(/[^0-9kK]/g, '');
    
    if (cleanValue.length === 0) return '';
    
    // Separar número y dígito verificador
    const rutNumber = cleanValue.slice(0, -1);
    const dv = cleanValue.slice(-1);
    
    // Formatear número con puntos
    const formattedNumber = rutNumber.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    // Combinar número formateado con dígito verificador
    return dv ? `${formattedNumber}-${dv}` : formattedNumber;
  };

  // Validación en tiempo real
  useEffect(() => {
    const newErrors = {
      rut: touched.rut ? validateRUT(formData.rut) : ''
    };
    setErrors(newErrors);
  }, [formData, touched]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Limitar a máximo 9 dígitos (sin contar puntos y guión)
    const cleanValue = value.replace(/[^0-9kK]/g, '');
    if (cleanValue.length > 9) {
      return; // No permitir más de 9 caracteres
    }
    
    const formattedValue = formatRUT(value);
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleInputBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Marcar el campo como tocado para mostrar errores
    setTouched({
      rut: true
    });

    // Validar el RUT
    const rutError = validateRUT(formData.rut);

    if (rutError) {
      setErrors({
        rut: rutError
      });
      return;
    }

    // Si no hay errores, proceder con el envío
    console.log('RUT para recuperación:', formData.rut);
    
    // TODO: Aquí el backend debería: ALEJANDROOOOOOOOOO xd
    // 1. Buscar el correo asociado al RUT
    // 2. Enviar el email de recuperación
    // 3. Retornar el correo al que se envió
    
    // Por ahora simulamos un correo basado en el RUT
    const simulatedEmail = `usuario${formData.rut.replace(/[^0-9]/g, '').slice(-4)}@ucen.cl`;
    
    // Navegar a la página de éxito con el correo como estado
    navigate('/success', { state: { email: simulatedEmail } });
  };

  return (
    <div className="recovery-page">
      <div 
        className="recovery-background"
        style={{ backgroundImage: `url(${BG_IMAGE_URL})` }}
      >
        <div className="recovery-overlay"></div>
        <div className="recovery-overlay-dark"></div>
      </div>
      
      {/* Logo en la esquina superior izquierda */}
      <div className="recovery-logo-top">
        <img src={LOGO_URL} alt="Logo UCEN" className="recovery-logo" />
      </div>

      {/* Contenedor del Formulario Centrado */}
      <div className="recovery-content">
        <div className="recovery-form-container">
          <form className="recovery-form" onSubmit={handleSubmit} noValidate>
            <h1 className="recovery-title">RECUPERAR CONTRASEÑA</h1>
            
            {/* Campo RUT */}
            <div className="form-group">
              <label htmlFor="rut" className="form-label">RUT</label>
              <input
                type="text"
                id="rut"
                name="rut"
                className={`form-input ${errors.rut && touched.rut ? 'form-input-error' : ''}`}
                placeholder="Ingrese su RUT..."
                value={formData.rut}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <Alert
                type="error"
                message={errors.rut}
                show={!!errors.rut && touched.rut}
                position="relative"
              />
            </div>

            <button type="submit" className="recovery-button">
              RECUPERAR CONTRASEÑA
            </button>

            <button type="button" className="back-to-login-link" onClick={handleBackToLogin}>
              Volver al Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecoveryPage;

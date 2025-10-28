import React, { useState } from 'react';
import './SubirProyectoModal.css';

const SubirProyectoModal = ({ isOpen, onClose, onSubirProyecto }) => {
  const lenguajesDisponibles = [
    'React', 'Vue', 'Angular', 'Node.js', 'Python', 'Java', 
    'JavaScript', 'TypeScript', 'PHP', 'C#', 'C++'
  ];

  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    lenguajes: [],
    tipoProyecto: '',
    imagen: null
  });

  const [errores, setErrores] = useState({});
  const [isDragging, setIsDragging] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLenguajeChange = (lenguaje) => {
    setFormData(prev => {
      const lenguajes = prev.lenguajes.includes(lenguaje)
        ? prev.lenguajes.filter(l => l !== lenguaje)
        : [...prev.lenguajes, lenguaje];
      
      return {
        ...prev,
        lenguajes
      };
    });
    
    // Limpiar error cuando se seleccione un lenguaje
    if (errores.lenguajes) {
      setErrores(prev => ({
        ...prev,
        lenguajes: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imagen: file
      }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setFormData(prev => ({
        ...prev,
        imagen: file
      }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.titulo.trim()) {
      nuevosErrores.titulo = 'El título es requerido';
    }

    if (!formData.descripcion.trim()) {
      nuevosErrores.descripcion = 'La descripción es requerida';
    }

    if (formData.lenguajes.length === 0) {
      nuevosErrores.lenguajes = 'Debe seleccionar al menos un lenguaje';
    }

    if (!formData.tipoProyecto.trim()) {
      nuevosErrores.tipoProyecto = 'El tipo de proyecto es requerido';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      onSubirProyecto(formData);
      // Limpiar formulario
      setFormData({
        titulo: '',
        descripcion: '',
        lenguajes: [],
        tipoProyecto: '',
        imagen: null
      });
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({
      titulo: '',
      descripcion: '',
      lenguajes: [],
      tipoProyecto: '',
      imagen: null
    });
    setErrores({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Publicar Proyecto</h2>
        <p className="modal-instruction">
          Completa los siguientes campos con la información del proyecto en cuestión.
        </p>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            {/* Columna Izquierda */}
            <div className="form-column-left">
              <div className="form-group">
                <label htmlFor="titulo" className="form-label">
                  Título*
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  className={`form-input ${errores.titulo ? 'error' : ''}`}
                  placeholder="Ingrese el título del proyecto..."
                />
                {errores.titulo && <span className="error-message">{errores.titulo}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="tipoProyecto" className="form-label">
                  Tipo de Proyecto*
                </label>
                <select
                  id="tipoProyecto"
                  name="tipoProyecto"
                  value={formData.tipoProyecto}
                  onChange={handleInputChange}
                  className={`form-select ${errores.tipoProyecto ? 'error' : ''}`}
                >
                  <option value="">Seleccione el tipo...</option>
                  <option value="Proyecto Personal">Proyecto Personal</option>
                  <option value="Proyecto de Asignatura">Proyecto de Asignatura</option>
                  <option value="Proyecto Externo">Proyecto Externo</option>
                </select>
                {errores.tipoProyecto && <span className="error-message">{errores.tipoProyecto}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="descripcion" className="form-label">
                  Descripción*
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  className={`form-textarea ${errores.descripcion ? 'error' : ''}`}
                  placeholder="Describa su proyecto..."
                />
                {errores.descripcion && <span className="error-message">{errores.descripcion}</span>}
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="form-column-right">
              <div className="form-group">
                <label htmlFor="lenguajes" className="form-label">
                  Lenguajes Utilizados*
                </label>
                <div className={`lenguajes-container ${errores.lenguajes ? 'error' : ''}`}>
                  {lenguajesDisponibles.map((lenguaje) => (
                    <div key={lenguaje} className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.lenguajes.includes(lenguaje)}
                          onChange={() => handleLenguajeChange(lenguaje)}
                        />
                        <span>{lenguaje}</span>
                      </label>
                    </div>
                  ))}
                </div>
                {errores.lenguajes && <span className="error-message">{errores.lenguajes}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="imagen" className="form-label">
                  Imagen del Proyecto
                </label>
                <div 
                  className={`file-upload-box ${isDragging ? 'dragging' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('imagen').click()}
                >
                  <div className="upload-content">
                    <svg className="upload-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="3" width="18" height="18" rx="2" stroke="#d0d0d0" strokeWidth="1.5" fill="none"/>
                      <path d="M12 8v6M9 11l3-3 3 3" stroke="#d0d0d0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {formData.imagen ? (
                      <p className="upload-text">{formData.imagen.name}</p>
                    ) : (
                      <>
                        <p className="upload-text">
                          Arrastra y suelta tu archivo aquí
                        </p>
                        <p className="upload-text-small">o haz click para buscar</p>
                        <p className="upload-info">JPG, PNG (Max. 10MB)</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    onChange={handleFileChange}
                    className="file-input"
                    accept=".jpg,.jpeg,.png"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancelar" onClick={handleClose}>
              CANCELAR
            </button>
            <button type="submit" className="btn-siguiente">
              SIGUIENTE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubirProyectoModal;


import React, { useState } from 'react';
import './FilterModal.css';

const FilterModal = ({ isOpen, onClose, filtros, onFiltroChange, onLimpiarFiltros, userRole }) => {
  const [filtrosLocales, setFiltrosLocales] = useState(filtros);

  const handleFiltroChange = (campo, valor) => {
    setFiltrosLocales(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const handleAplicarFiltros = () => {
    onFiltroChange('filtrosAvanzados', filtrosLocales);
    onClose();
  };

  const handleLimpiarFiltros = () => {
    const filtrosVacios = {
      estado: '',
      tutor: '',
      categoria: '',
      tipo: '',
      lenguajes: '',
      asignatura: ''
    };
    setFiltrosLocales(filtrosVacios);
    onFiltroChange('filtrosAvanzados', filtrosVacios);
  };

  if (!isOpen) return null;

  return (
    <div className="filter-modal-overlay" onClick={onClose}>
      <div className="filter-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="filter-modal-header">
          <h2 className="filter-modal-title">Filtros</h2>
          <p className="filter-modal-description">
            Aplica filtros para poder ver la información más útil para ti
          </p>
        </div>

        <div className="filter-modal-body">
          <div className="filter-row">
            <div className="filter-group">
              <label className="filter-label">Estado</label>
              <select
                value={filtrosLocales.estado || ''}
                onChange={(e) => handleFiltroChange('estado', e.target.value)}
                className="filter-select"
              >
                <option value="">Seleccione el Estado...</option>
                <option value="En Proceso">En Proceso</option>
                <option value="Rechazado">Rechazado</option>
                <option value="Finalizado">Finalizado</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Pausado">Pausado</option>
                <option value="Esperando Resultado">Esperando Resultado</option>
                {userRole !== 'estudiante' && <option value="Para Aprobar">Para Aprobar</option>}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Tutor</label>
              <select
                value={filtrosLocales.tutor || ''}
                onChange={(e) => handleFiltroChange('tutor', e.target.value)}
                className="filter-select"
              >
                <option value="">Seleccione el Tutor...</option>
                <option value="Alumno">Alumno</option>
                <option value="Patricio Rojas">Patricio Rojas</option>
                <option value="Mario Ortiz">Mario Ortiz</option>
                <option value="Ana García">Ana García</option>
                <option value="Carlos Mendoza">Carlos Mendoza</option>
                <option value="Laura Torres">Laura Torres</option>
                <option value="Roberto Silva">Roberto Silva</option>
                <option value="María González">María González</option>
                <option value="Benjamin Lopez">Benjamin Lopez</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Categoria</label>
              <select
                value={filtrosLocales.categoria || ''}
                onChange={(e) => handleFiltroChange('categoria', e.target.value)}
                className="filter-select"
              >
                <option value="">Seleccione la categoria...</option>
                <option value="Web">Web</option>
                <option value="Mobile">Mobile</option>
                <option value="Desktop">Desktop</option>
                <option value="IoT">IoT</option>
              </select>
            </div>
          </div>

          <div className="filter-row">
            <div className="filter-group">
              <label className="filter-label">Tipo</label>
              <select
                value={filtrosLocales.tipo || ''}
                onChange={(e) => handleFiltroChange('tipo', e.target.value)}
                className="filter-select"
              >
                <option value="">Seleccione el Tipo...</option>
                <option value="Proyecto Personal">Proyecto Personal</option>
                <option value="Proyecto de Asignatura">Proyecto de Asignatura</option>
                <option value="Proyecto Externo">Proyecto Externo</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Lenguajes</label>
              <select
                value={filtrosLocales.lenguajes || ''}
                onChange={(e) => handleFiltroChange('lenguajes', e.target.value)}
                className="filter-select"
              >
                <option value="">Seleccione el Lenguaje...</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C++">C++</option>
                <option value="React">React</option>
                <option value="Vue">Vue</option>
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Asignatura</label>
              <select
                value={filtrosLocales.asignatura || ''}
                onChange={(e) => handleFiltroChange('asignatura', e.target.value)}
                className="filter-select"
              >
                <option value="">Seleccione la asignatura...</option>
                <option value="Proyecto Personal">Proyecto Personal</option>
                <option value="Automatización">Automatización</option>
                <option value="Base de Datos">Base de Datos</option>
                <option value="Programación">Programación</option>
                <option value="Desarrollo Web">Desarrollo Web</option>
              </select>
            </div>
          </div>
        </div>

        <div className="filter-modal-footer">
          <button 
            className="btn-limpiar-filtros-modal"
            onClick={handleLimpiarFiltros}
          >
            BORRAR FILTROS
          </button>
          <button 
            className="btn-filtrar-modal"
            onClick={handleAplicarFiltros}
          >
            FILTRAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;

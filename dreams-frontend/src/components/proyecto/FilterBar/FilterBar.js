import React, { useState } from 'react';
import FilterModal from '../FilterModal/FilterModal';
import './FilterBar.css';

const FilterBar = ({ userRole, filtros, onFiltroChange, onLimpiarFiltros }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isEstudiante = userRole === 'estudiante';

  return (
    <div className="filter-bar-container">
      <div className="filter-bar-content">
        {/* Campo de búsqueda */}
        <div className="search-input-container">
          {/* ✅ Búsqueda implementada: funciona por nombre del proyecto Y nombre del estudiante */}
          <input
            type="text"
            placeholder="Ingrese Nombre del Proyecto o Alumno..."
            value={filtros.nombre}
            onChange={(e) => onFiltroChange('nombre', e.target.value)}
            className="search-input"
          />
        </div>

        {/* Botones de filtro */}
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filtros.tipo === 'asignatura' ? 'active' : ''}`}
            onClick={() => onFiltroChange('tipo', filtros.tipo === 'asignatura' ? '' : 'asignatura')}
          >
            P. ASIGNATURA
          </button>
          
          {!isEstudiante && (
            <button 
              className={`filter-btn ${filtros.tipo === 'mis-proyectos' ? 'active' : ''}`}
              onClick={() => onFiltroChange('tipo', filtros.tipo === 'mis-proyectos' ? '' : 'mis-proyectos')}
            >
              TUS PROYECTOS
            </button>
          )}
          
          <button 
            className="filter-icon-btn"
            onClick={() => setIsModalOpen(true)}
            title="Filtros avanzados"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
              <path d="M440-160q-17 0-28.5-11.5T400-200v-240L168-736q-15-20-4.5-42t36.5-22h560q26 0 36.5 22t-4.5 42L560-440v240q0 17-11.5 28.5T520-160h-80Z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        filtros={filtros}
        onFiltroChange={onFiltroChange}
        onLimpiarFiltros={onLimpiarFiltros}
        userRole={userRole}
      />
    </div>
  );
};

export default FilterBar;

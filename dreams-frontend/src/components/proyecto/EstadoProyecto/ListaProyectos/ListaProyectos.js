import React, { useState, useMemo } from 'react';
import EstadoProyecto from '../EstadoProyecto';
import './ListaProyectos.css';

const ListaProyectos = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtroActivo, setFiltroActivo] = useState('todos');

  // Datos de ejemplo basados en la imagen
  const proyectos = [
    {
      id: 1,
      nombre: '2WD CON VISIÓN INTELIGENTE',
      dueno: 'Patricio Rojas',
      tipo: 'Proyecto Personal',
      estado: 'EN PROCESO'
    },
    {
      id: 2,
      nombre: '2WD CON PID',
      dueno: 'Joaquin Michea',
      tipo: 'Asignatura',
      estado: 'PARA APROBAR'
    },
    {
      id: 3,
      nombre: 'DIGITALIZA EMPA',
      dueno: 'Mario Ortiz',
      tipo: 'Externo',
      estado: 'ESPERANDO RESULTADO'
    },
    {
      id: 4,
      nombre: 'PROYECTO RIEGO AUTOMATIZADO',
      dueno: 'Patricio Rojas',
      tipo: 'Proyecto Personal',
      estado: 'PAUSADO'
    },
    {
      id: 5,
      nombre: 'BOT DE DISCORD',
      dueno: 'Fernando Godoy',
      tipo: 'Proyecto Personal',
      estado: 'FINALIZADO'
    },
    {
      id: 6,
      nombre: 'NPCS PARA PROJECT ZOMBOID',
      dueno: 'Benjamin Lopez',
      tipo: 'Proyecto Personal',
      estado: 'FINALIZADO'
    },
    {
      id: 7,
      nombre: 'APP RESTAURANT EN KOTLIN',
      dueno: 'Fernando Godoy',
      tipo: 'Proyecto Personal',
      estado: 'FINALIZADO'
    },
    {
      id: 8,
      nombre: 'PID EN VELOCIDAD DE VEHICULO',
      dueno: 'Patricio Rojas',
      tipo: 'Proyecto Personal',
      estado: 'FINALIZADO'
    },
    {
      id: 9,
      nombre: 'RECORRE CDT',
      dueno: 'Hans Bugueño',
      tipo: 'Externo',
      estado: 'RECHAZADO'
    },
    {
      id: 10,
      nombre: 'APP DE FINANZAS',
      dueno: 'Benjamin Lopez',
      tipo: 'Proyecto Personal',
      estado: 'CANCELADO'
    }
  ];

  // Filtrar proyectos según búsqueda y filtro activo
  const proyectosFiltrados = useMemo(() => {
    let proyectosFiltrados = proyectos;

    // Filtrar por texto de búsqueda
    if (busqueda) {
      proyectosFiltrados = proyectosFiltrados.filter(proyecto =>
        proyecto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        proyecto.dueno.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    // Filtrar por tipo
    if (filtroActivo === 'asignatura') {
      proyectosFiltrados = proyectosFiltrados.filter(proyecto =>
        proyecto.tipo === 'Asignatura'
      );
    } else if (filtroActivo === 'tus-proyectos') {
      // Aquí podrías filtrar por proyectos del usuario actual
      proyectosFiltrados = proyectosFiltrados.filter(proyecto =>
        proyecto.dueno === 'Patricio Rojas' // Ejemplo
      );
    }

    return proyectosFiltrados;
  }, [busqueda, filtroActivo]);

  const handleSubirProyecto = () => {
    alert('Funcionalidad de subir proyecto - Por implementar');
  };

  const handleFiltroAsignatura = () => {
    setFiltroActivo(filtroActivo === 'asignatura' ? 'todos' : 'asignatura');
  };

  const handleFiltroTusProyectos = () => {
    setFiltroActivo(filtroActivo === 'tus-proyectos' ? 'todos' : 'tus-proyectos');
  };

  return (
    <div className="proyectos-card">
      {/* Encabezado */}
      <div className="card-header">
        <h1 className="card-title">PROYECTOS UNIVERSITARIOS</h1>
        <button className="upload-button" onClick={handleSubirProyecto}>
          SUBIR PROYECTO
        </button>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Ingrese Nombre del Proyecto o Alumno..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
        <button 
          className={`filter-button ${filtroActivo === 'asignatura' ? 'active' : ''}`}
          onClick={handleFiltroAsignatura}
        >
          P. ASIGNATURA
        </button>
        <button 
          className={`filter-button ${filtroActivo === 'tus-proyectos' ? 'active' : ''}`}
          onClick={handleFiltroTusProyectos}
        >
          TUS PROYECTOS
        </button>
        <button className="filter-icon-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
          </svg>
        </button>
      </div>

      {/* Tabla de proyectos */}
      <div className="table-container">
        <table className="proyectos-table">
          <thead className="table-header">
            <tr>
              <th>NOMBRE</th>
              <th>DUEÑO</th>
              <th>TIPO</th>
              <th>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {proyectosFiltrados.map((proyecto) => (
              <tr key={proyecto.id} className="table-row">
                <td className="table-cell nombre-cell">{proyecto.nombre}</td>
                <td className="table-cell dueno-cell">{proyecto.dueno}</td>
                <td className="table-cell tipo-cell">{proyecto.tipo}</td>
                <td className="table-cell estado-cell">
                  <EstadoProyecto estado={proyecto.estado} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="pagination">
        <button className="pagination-button">‹</button>
        <button className="pagination-button pagination-current">1</button>
        <button className="pagination-button">›</button>
      </div>
    </div>
  );
};

export default ListaProyectos;


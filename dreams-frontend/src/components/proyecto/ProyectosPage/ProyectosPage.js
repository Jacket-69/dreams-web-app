import React, { useState } from 'react';
import SubirProyectoModal from '../SubirProyectoModal/SubirProyectoModal';
import FilterBar from '../FilterBar/FilterBar';
import './ProyectosPage.css';

const ProyectosPage = ({ userRole = 'estudiante' }) => {
  const [filtros, setFiltros] = useState({
    nombre: '',
    estado: '',
    tutor: '',
    tecnologia: '',
    tipo: '',
    filtrosAvanzados: {
      estado: '',
      tutor: '',
      categoria: '',
      tipo: '',
      lenguajes: '',
      asignatura: ''
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // TODO: INTEGRACIÓN BACKEND - Reemplazar con llamada a API
  // NECESARIO: Implementar carga de proyectos desde el backend
  // - GET /api/proyectos con filtros y paginación
  // - Manejar estados de carga (loading, error)
  // - Implementar paginación del servidor
  const [proyectos] = useState([
    {
      id: 1,
      nombre: '2WD CON VISIÓN INTELIGENTE',
      tutor: 'Alumno',
      asignatura: 'Proyecto Personal',
      estado: 'En Proceso',
      estudiante: 'Juan Pérez'
    },
    {
      id: 2,
      nombre: '2WD CON PID',
      tutor: 'Patricio Rojas',
      asignatura: 'Automatización',
      estado: 'Finalizado',
      estudiante: 'María González'
    },
    {
      id: 3,
      nombre: 'DISEÑO DE CRUD',
      tutor: 'Mario Ortiz',
      asignatura: 'Base de Datos',
      estado: 'Finalizado',
      estudiante: 'Carlos Rodríguez'
    },
    {
      id: 4,
      nombre: 'PROYECTO RIEGO AUTOMATIZADO',
      tutor: 'Patricio Rojas',
      asignatura: 'Automatización',
      estado: 'Cancelado',
      estudiante: 'Ana Martínez'
    },
    {
      id: 5,
      nombre: 'APP DE FINANZAS',
      tutor: 'Benjamin Lopez',
      asignatura: 'Proyecto Personal',
      estado: 'Rechazado',
      estudiante: 'Luis Fernández'
    },
    {
      id: 6,
      nombre: 'SISTEMA DE GESTIÓN',
      tutor: 'Ana García',
      asignatura: 'Programación',
      estado: 'Pausado',
      estudiante: 'Sofia Herrera'
    },
    {
      id: 7,
      nombre: 'ANÁLISIS DE DATOS',
      tutor: 'Carlos Mendoza',
      asignatura: 'Base de Datos',
      estado: 'Esperando Resultado',
      estudiante: 'Diego Silva'
    },
    {
      id: 8,
      nombre: 'PROYECTO MÓVIL',
      tutor: 'Laura Torres',
      asignatura: 'Programación',
      estado: 'Para Aprobar',
      estudiante: 'Valentina Torres'
    },
    {
      id: 9,
      nombre: 'SISTEMA DE INVENTARIO',
      tutor: 'Roberto Silva',
      asignatura: 'Programación',
      estado: 'En Proceso',
      estudiante: 'Roberto Castro'
    },
    {
      id: 10,
      nombre: 'PLATAFORMA E-LEARNING',
      tutor: 'María González',
      asignatura: 'Desarrollo Web',
      estado: 'Finalizado',
      estudiante: 'Camila Vargas'
    },
    {
      id: 11,
      nombre: 'ROBOT AUTÓNOMO',
      tutor: 'Patricio Rojas',
      asignatura: 'Automatización',
      estado: 'Pausado',
      estudiante: 'Andrés Morales'
    },
    {
      id: 12,
      nombre: 'ANÁLISIS DE MERCADO',
      tutor: 'Carlos Mendoza',
      asignatura: 'Base de Datos',
      estado: 'Esperando Resultado',
      estudiante: 'Natalia Jiménez'
    },
    {
      id: 13,
      nombre: 'APP DE DELIVERY',
      tutor: 'Laura Torres',
      asignatura: 'Programación',
      estado: 'Para Aprobar',
      estudiante: 'Sebastián Ruiz'
    },
    {
      id: 14,
      nombre: 'SISTEMA DE FACTURACIÓN',
      tutor: 'Ana García',
      asignatura: 'Programación',
      estado: 'Rechazado',
      estudiante: 'Isabella López'
    },
    {
      id: 15,
      nombre: 'CONTROL DE ACCESO',
      tutor: 'Mario Ortiz',
      asignatura: 'Automatización',
      estado: 'En Proceso',
      estudiante: 'Mateo Sánchez'
    },
    {
      id: 16,
      nombre: 'PLATAFORMA DE VENTAS',
      tutor: 'Roberto Silva',
      asignatura: 'Desarrollo Web',
      estado: 'Finalizado',
      estudiante: 'Gabriela Ramírez'
    },
    {
      id: 17,
      nombre: 'SISTEMA DE MONITOREO',
      tutor: 'Patricio Rojas',
      asignatura: 'Automatización',
      estado: 'Cancelado',
      estudiante: 'Fernando Díaz'
    },
    {
      id: 18,
      nombre: 'APP DE SALUD',
      tutor: 'María González',
      asignatura: 'Programación',
      estado: 'Pausado',
      estudiante: 'Paula Muñoz'
    },
    {
      id: 19,
      nombre: 'ANÁLISIS PREDICTIVO',
      tutor: 'Carlos Mendoza',
      asignatura: 'Base de Datos',
      estado: 'Esperando Resultado',
      estudiante: 'Alejandro Torres'
    },
    {
      id: 20,
      nombre: 'SISTEMA DE RESERVAS',
      tutor: 'Laura Torres',
      asignatura: 'Programación',
      estado: 'Para Aprobar',
      estudiante: 'Constanza Vega'
    },
    {
      id: 21,
      nombre: 'CONTROL DE TEMPERATURA',
      tutor: 'Mario Ortiz',
      asignatura: 'Automatización',
      estado: 'En Proceso',
      estudiante: 'Felipe Contreras'
    },
    {
      id: 22,
      nombre: 'PLATAFORMA DE STREAMING',
      tutor: 'Roberto Silva',
      asignatura: 'Desarrollo Web',
      estado: 'Finalizado',
      estudiante: 'Javiera Morales'
    },
    {
      id: 23,
      nombre: 'SISTEMA DE ALERTAS',
      tutor: 'Ana García',
      asignatura: 'Programación',
      estado: 'Rechazado',
      estudiante: 'Tomás Herrera'
    },
    {
      id: 24,
      nombre: 'APP DE FITNESS',
      tutor: 'María González',
      asignatura: 'Programación',
      estado: 'Pausado',
      estudiante: 'Antonella Flores'
    },
    {
      id: 25,
      nombre: 'ANÁLISIS DE RENDIMIENTO',
      tutor: 'Carlos Mendoza',
      asignatura: 'Base de Datos',
      estado: 'Esperando Resultado',
      estudiante: 'Maximiliano Rojas'
    },
    {
      id: 26,
      nombre: 'SISTEMA DE GESTIÓN DE STOCK',
      tutor: 'Patricio Rojas',
      asignatura: 'Automatización',
      estado: 'Para Aprobar',
      estudiante: 'Catalina Espinoza'
    },
    {
      id: 27,
      nombre: 'PLATAFORMA DE COLABORACIÓN',
      tutor: 'Laura Torres',
      asignatura: 'Desarrollo Web',
      estado: 'En Proceso',
      estudiante: 'Nicolás Guzmán'
    },
    {
      id: 28,
      nombre: 'CONTROL DE ILUMINACIÓN',
      tutor: 'Mario Ortiz',
      asignatura: 'Automatización',
      estado: 'Finalizado',
      estudiante: 'Amanda Castillo'
    },
    {
      id: 29,
      nombre: 'APP DE TURISMO',
      tutor: 'Roberto Silva',
      asignatura: 'Programación',
      estado: 'Cancelado',
      estudiante: 'Emilio Paredes'
    },
    {
      id: 30,
      nombre: 'SISTEMA DE REPORTES',
      tutor: 'Ana García',
      asignatura: 'Base de Datos',
      estado: 'Pausado',
      estudiante: 'Renata Navarro'
    }
  ]);

  const [paginaActual, setPaginaActual] = useState(1);
  const proyectosPorPagina = 8;

  const handleFiltroChange = (campo, valor) => {
    // TODO: INTEGRACIÓN BACKEND - Los filtros actuales son solo locales
    // NECESARIO: Implementar filtros que se comuniquen con el backend
    // - Enviar filtros al servidor cuando cambien
    // - Recargar datos filtrados desde la API
    // - Mantener filtros en la URL para compartir enlaces
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const limpiarFiltros = () => {
    setFiltros({
      nombre: '',
      estado: '',
      tutor: '',
      tecnologia: '',
      tipo: '',
      filtrosAvanzados: {
        estado: '',
        tutor: '',
        categoria: '',
        tipo: '',
        lenguajes: '',
        asignatura: ''
      }
    });
  };

  const handleSubirProyecto = (nuevoProyecto) => {
    // TODO: INTEGRACIÓN BACKEND - Implementar subida de proyectos
    // NECESARIO: Conectar con API para crear proyectos
    // - POST /api/proyectos con datos del formulario
    // - Validar datos antes de enviar
    // - Manejar respuesta (éxito/error)
    // - Recargar lista de proyectos después de crear
    console.log('Nuevo proyecto:', nuevoProyecto);
    alert('Proyecto subido exitosamente');
  };


  const proyectosFiltrados = proyectos.filter(proyecto => {
    const filtrosAvanzados = filtros.filtrosAvanzados || {};
    
    // Lógica para "Para Aprobar": solo visible para profesores en proyectos de asignatura
    if (proyecto.estado === 'Para Aprobar') {
      const esProfesor = userRole !== 'estudiante';
      const esProyectoAsignatura = proyecto.asignatura !== 'Proyecto Personal';
      
      if (!esProfesor || !esProyectoAsignatura) {
        return false; // No mostrar proyectos "Para Aprobar" a estudiantes o proyectos personales
      }
    }
    
    return (
      // Búsqueda mejorada: por nombre del proyecto Y nombre del estudiante
      (proyecto.nombre.toLowerCase().includes(filtros.nombre.toLowerCase()) ||
       (proyecto.estudiante && proyecto.estudiante.toLowerCase().includes(filtros.nombre.toLowerCase()))) &&
      (filtros.estado === '' || proyecto.estado === filtros.estado) &&
      proyecto.tutor.toLowerCase().includes(filtros.tutor.toLowerCase()) &&
      (filtros.tecnologia === '' || true) && // Por ahora no hay campo de tecnología
      (filtrosAvanzados.estado === '' || proyecto.estado === filtrosAvanzados.estado) &&
      (filtrosAvanzados.tutor === '' || proyecto.tutor === filtrosAvanzados.tutor) &&
      (filtrosAvanzados.asignatura === '' || proyecto.asignatura === filtrosAvanzados.asignatura)
    );
  });

  const totalPaginas = Math.ceil(proyectosFiltrados.length / proyectosPorPagina);
  const proyectosEnPagina = proyectosFiltrados.slice(
    (paginaActual - 1) * proyectosPorPagina,
    paginaActual * proyectosPorPagina
  );

  const getEstadoClass = (estado) => {
    switch (estado) {
      case 'En Proceso':
        return 'estado-en-proceso';
      case 'Finalizado':
        return 'estado-finalizado';
      case 'Cancelado':
        return 'estado-cancelado';
      case 'Rechazado':
        return 'estado-rechazado';
      case 'Pausado':
        return 'estado-pausado';
      case 'Esperando Resultado':
        return 'estado-esperando';
      case 'Para Aprobar':
        return 'estado-para-aprobar';
      default:
        return 'estado-default';
    }
  };

  return (
    <div className="proyectos-page">
      <div className="proyectos-header">
        <h1 className="proyectos-title">TUS PROYECTOS UNIVERSITARIOS</h1>
        <button 
          className="btn-subir-proyecto"
          onClick={() => setIsModalOpen(true)}
        >
          SUBIR PROYECTO
        </button>
      </div>

      <FilterBar
        userRole={userRole}
        filtros={filtros}
        onFiltroChange={handleFiltroChange}
        onLimpiarFiltros={limpiarFiltros}
      />

      <div className="tabla-container">
        <table className="tabla-proyectos">
          <thead>
            <tr>
              <th>NOMBRE</th>
              <th>TUTOR</th>
              <th>ASIGNATURA</th>
              <th>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {proyectosEnPagina.map(proyecto => (
              <tr key={proyecto.id}>
                <td className="columna-nombre">{proyecto.nombre}</td>
                <td className="columna-tutor">{proyecto.tutor}</td>
                <td className="columna-asignatura">{proyecto.asignatura}</td>
                <td className="columna-estado">
                  <span className={`estado-badge ${getEstadoClass(proyecto.estado)}`}>
                    {proyecto.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPaginas > 1 && (
        <div className="paginacion">
          <button 
            className="btn-pagina"
            onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
            disabled={paginaActual === 1}
          >
            &lt;
          </button>
          <span className="pagina-actual">{paginaActual}</span>
          <button 
            className="btn-pagina"
            onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
            disabled={paginaActual === totalPaginas}
          >
            &gt;
          </button>
          <div className="paginacion-info">
            Página {paginaActual} de {totalPaginas} • {proyectosFiltrados.length} proyectos
          </div>
        </div>
      )}

      <SubirProyectoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubirProyecto={handleSubirProyecto}
      />
    </div>
  );
};

export default ProyectosPage;

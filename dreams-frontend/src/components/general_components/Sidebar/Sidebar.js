import React from 'react';
import './Sidebar.css';
import houseIcon from '../../../Icons/house.svg';
import foldersIcon from '../../../Icons/folders.svg';
import groupIcon from '../../../Icons/group.svg';
import workIcon from '../../../Icons/work.svg';
import articlePersonIcon from '../../../Icons/article_person.svg';
import settingsIcon from '../../../Icons/settings.svg';

/**
 * Componente Sidebar con filtrado por rol de usuario
 * 
 * PROPS:
 * - userRole: string - Rol del usuario ('estudiante', 'profesor', 'admin', 'gestor')
 * - currentPage: string - Página actualmente activa
 * 
 * EJEMPLO DE USO:
 * <Sidebar userRole="estudiante" currentPage="proyectos" />
 * <Sidebar userRole="profesor" currentPage="alumnos" />
 * <Sidebar userRole="admin" currentPage="inicio" />
 * <Sidebar userRole="gestor" currentPage="gestionar-practicas" />
 */

const Sidebar = ({ userRole = 'estudiante', currentPage = 'proyectos' }) => {
  // TODO: CONFIGURAR NOMBRES EXACTOS DE ROLES SEGÚN LA BASE DE DATOS
  // 
  // IMPORTANTE: Los nombres de roles deben coincidir EXACTAMENTE con los de la DB
  //
  // REGLAS DE ACCESO POR ROL (AJUSTAR SEGÚN NOMBRES REALES):
  // 
  // ESTUDIANTE: 
  //   - Puede ver: inicio, practicas, tu-practica, proyectos
  //   - NO puede ver: alumnos, gestionar-practicas
  // 
  // PROFESOR: 
  //   - Puede ver: inicio, alumnos, proyectos
  //   - NO puede ver: practicas, gestionar-practicas, tu-practica
  // 
  // ADMIN: 
  //   - Puede ver: inicio, proyectos, alumnos, practicas, gestionar-practicas
  //   - NO puede ver: tu-practica
  // 
  // GESTOR: 
  //   - Puede ver: inicio, alumnos, proyectos, practicas, gestionar-practicas
  //   - NO puede ver: tu-practica
  //
  // CONFIGURACIÓN: Disponible para todos los roles

  // ========================================
  // CONFIGURACIÓN DE ROLES - CAMBIAR AQUÍ
  // ========================================
  // IMPORTANTE: Actualizar estos valores con los nombres exactos de la DB
  // 
  // PASOS PARA CONFIGURAR:
  // 1. Consultar la tabla de usuarios/roles en la DB
  // 2. Identificar los valores exactos del campo 'role' o similar
  // 3. Reemplazar los valores de abajo con los nombres reales
  // 4. Ejemplo: si en la DB aparece 'user_student', cambiar 'estudiante' por 'user_student'
  //
  const ROLES = {
    STUDENT: 'estudiante',     // ← CAMBIAR: nombre exacto del rol estudiante en la DB
    TEACHER: 'profesor',       // ← CAMBIAR: nombre exacto del rol profesor en la DB  
    ADMIN: 'admin',           // ← CAMBIAR: nombre exacto del rol admin en la DB
    MANAGER: 'gestor'         // ← CAMBIAR: nombre exacto del rol gestor en la DB
  };

  // ========================================
  // CONFIGURACIÓN DE PERMISOS POR ROL
  // ========================================
  const ROLE_PERMISSIONS = {
    [ROLES.STUDENT]: ['inicio', 'practicas', 'tu-practica', 'proyectos'],
    [ROLES.TEACHER]: ['inicio', 'alumnos', 'proyectos'],
    [ROLES.ADMIN]: ['inicio', 'proyectos', 'alumnos', 'practicas', 'gestionar-practicas'],
    [ROLES.MANAGER]: ['inicio', 'alumnos', 'proyectos', 'practicas', 'gestionar-practicas']
  };

  // Menú completo con todas las opciones disponibles
  const allMenuItems = [
    {
      id: 'inicio',
      nombre: 'Inicio',
      icono: <img src={houseIcon} alt="Inicio" width="20" height="20" />
    },
    {
      id: 'proyectos',
      nombre: 'Proyectos',
      icono: <img src={foldersIcon} alt="Proyectos" width="20" height="20" />
    },
    {
      id: 'alumnos',
      nombre: 'Alumnos',
      icono: <img src={groupIcon} alt="Alumnos" width="20" height="20" />
    },
    {
      id: 'practicas',
      nombre: 'Practicas',
      icono: <img src={workIcon} alt="Practicas" width="20" height="20" />
    },
    {
      id: 'gestionar-practicas',
      nombre: 'Gestionar Practicas',
      icono: <img src={articlePersonIcon} alt="Gestionar Practicas" width="20" height="20" />
    },
    {
      id: 'tu-practica',
      nombre: 'Tu Practica',
      icono: <img src={articlePersonIcon} alt="Tu Practica" width="20" height="20" />
    }
  ];

  // Función para filtrar elementos según el rol del usuario
  const getFilteredMenuItems = () => {
    const userPermissions = ROLE_PERMISSIONS[userRole] || [];
    return allMenuItems.filter(item => userPermissions.includes(item.id));
  };

  // Obtener elementos filtrados
  const mainMenuItems = getFilteredMenuItems();

  // Configuración separada para posicionarla al final
  const configItem = {
    id: 'configuracion',
    nombre: 'Configuración',
    icono: <img src={settingsIcon} alt="Configuración" width="20" height="20" />
  };

  return (
    <nav className="sidebar">
      <ul className="nav-list">
        {mainMenuItems.map((item) => (
          <li key={item.id} className="nav-item">
            <a 
              href={`#${item.id}`} 
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icono}</span>
              {item.nombre}
            </a>
          </li>
        ))}
      </ul>
      
      <ul className="nav-list config-section">
        <li className="nav-item">
          <a 
            href={`#${configItem.id}`} 
            className={`nav-link ${currentPage === configItem.id ? 'active' : ''}`}
          >
            <span className="nav-icon">{configItem.icono}</span>
            {configItem.nombre}
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;


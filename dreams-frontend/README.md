# Sistema de Gestión de Proyectos Universitarios - UECN

Una aplicación web desarrollada en React para la gestión de proyectos universitarios, completamente en español y basada en componentes.

## 🚀 Características

- **Interfaz moderna y responsive**: Diseño limpio con esquema de colores azul y naranja
- **Navegación intuitiva**: Sidebar con menú de navegación
- **Gestión de proyectos**: Lista completa con filtros y búsqueda
- **Estados visuales**: Pills de colores para diferentes estados de proyectos
- **Completamente en español**: Interfaz y funcionalidades en español

## 🛠️ Tecnologías Utilizadas

- React 18.2.0
- CSS3 con variables personalizadas
- Componentes funcionales con Hooks
- Diseño responsive

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.js
│   │   └── Header.css
│   ├── Sidebar/
│   │   ├── Sidebar.js
│   │   └── Sidebar.css
│   ├── Layout/
│   │   ├── Layout.js
│   │   └── Layout.css
│   ├── ListaProyectos/
│   │   ├── ListaProyectos.js
│   │   └── ListaProyectos.css
│   └── EstadoProyecto/
│       ├── EstadoProyecto.js
│       └── EstadoProyecto.css
├── App.js
├── index.js
└── index.css
```

## 🎨 Componentes Principales

### Layout
- **Header**: Barra superior con logo UECN y perfil de usuario
- **Sidebar**: Navegación lateral con menú de opciones
- **Main Content**: Área principal de contenido

### ListaProyectos
- **Búsqueda**: Filtrado por nombre de proyecto o alumno
- **Filtros**: Por asignatura y proyectos del usuario
- **Tabla**: Lista de proyectos con estados visuales
- **Paginación**: Control de navegación entre páginas

### EstadoProyecto
- **Pills de estado**: Indicadores visuales para diferentes estados:
  - 🟡 EN PROCESO
  - 🟠 PARA APROBAR
  - ⚪ ESPERANDO RESULTADO
  - ⚫ PAUSADO
  - 🟢 FINALIZADO
  - 🔴 RECHAZADO/CANCELADO

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Pasos para ejecutar

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo**:
   ```bash
   npm start
   ```

3. **Abrir en el navegador**:
   La aplicación se abrirá automáticamente en `http://localhost:3000`

### Scripts disponibles

- `npm start`: Ejecuta la aplicación en modo desarrollo
- `npm build`: Construye la aplicación para producción
- `npm test`: Ejecuta las pruebas
- `npm eject`: Expone la configuración de React (irreversible)

## 🎯 Funcionalidades Implementadas

### ✅ Completadas
- [x] Estructura de componentes React
- [x] Layout responsivo con sidebar y header
- [x] Navegación con menú lateral
- [x] Lista de proyectos con datos de ejemplo
- [x] Sistema de búsqueda por nombre y alumno
- [x] Filtros por tipo de proyecto
- [x] Estados visuales con pills de colores
- [x] Diseño responsive para móviles
- [x] Esquema de colores consistente

### 🔄 Por Implementar
- [ ] Funcionalidad de subir proyecto
- [ ] Gestión de usuarios y autenticación
- [ ] Integración con backend/API
- [ ] Gestión de prácticas
- [ ] Panel de administración
- [ ] Notificaciones en tiempo real

## 🎨 Esquema de Colores

- **Azul Principal**: #354093
- **Texto Oscuro**: #212121
- **Naranja Acento**: #F5A04E
- **Gris Medio**: #565555
- **Fondo Claro**: #FAFAFA
- **Verde Éxito**: #22c55e
- **Amarillo Advertencia**: #eab308
- **Rojo Error**: #ef4444

## 📱 Responsive Design

La aplicación está optimizada para:
- **Desktop**: Layout completo con sidebar fijo
- **Tablet**: Adaptación del sidebar y tabla
- **Mobile**: Navegación colapsible y tabla scrolleable

## 🤝 Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado para UECN - Estamos comprometidos con la Región de Coquimbo**

# Integración Backend - ProyectosPage

## Funcionalidades Pendientes de Integración

### 1. Carga de Proyectos
**Archivo:** `ProyectosPage.js` (línea 25-29)
**Estado:** ❌ Pendiente
**Descripción:** Los proyectos actualmente son datos estáticos
**Implementación necesaria:**
```javascript
// Reemplazar datos estáticos con:
const [proyectos, setProyectos] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Llamada a API:
useEffect(() => {
  fetchProyectos();
}, []);

const fetchProyectos = async () => {
  try {
    const response = await fetch('/api/proyectos');
    const data = await response.json();
    setProyectos(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### 2. Búsqueda por Estudiante
**Archivo:** `ProyectosPage.js` (línea 288-290)
**Estado:** ❌ Pendiente
**Descripción:** La búsqueda actual solo filtra por nombre del proyecto
**Implementación necesaria:**
```javascript
// Modificar la lógica de filtrado para incluir:
const buscarEnEstudiante = proyecto.estudiante?.toLowerCase().includes(filtros.nombre.toLowerCase());
const buscarEnProyecto = proyecto.nombre.toLowerCase().includes(filtros.nombre.toLowerCase());

return buscarEnEstudiante || buscarEnProyecto;
```

### 3. Filtros Avanzados
**Archivo:** `ProyectosPage.js` (línea 246-251)
**Estado:** ❌ Pendiente
**Descripción:** Los filtros son solo locales, no se comunican con el backend
**Implementación necesaria:**
```javascript
// Enviar filtros al servidor:
const aplicarFiltros = async (filtros) => {
  const queryParams = new URLSearchParams(filtros);
  const response = await fetch(`/api/proyectos?${queryParams}`);
  return await response.json();
};
```

### 4. Subida de Proyectos
**Archivo:** `ProyectosPage.js` (línea 276-285)
**Estado:** ❌ Pendiente
**Descripción:** Solo muestra alert, no guarda en backend
**Implementación necesaria:**
```javascript
const handleSubirProyecto = async (nuevoProyecto) => {
  try {
    const response = await fetch('/api/proyectos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProyecto)
    });
    
    if (response.ok) {
      // Recargar lista de proyectos
      await fetchProyectos();
      // Cerrar modal
      setIsModalOpen(false);
    }
  } catch (error) {
    console.error('Error al subir proyecto:', error);
  }
};
```

### 5. Paginación del Servidor
**Archivo:** `ProyectosPage.js` (línea 301-303)
**Estado:** ❌ Pendiente
**Descripción:** La paginación es solo del frontend
**Implementación necesaria:**
```javascript
// Implementar paginación del servidor:
const fetchProyectos = async (page = 1, limit = 8) => {
  const response = await fetch(`/api/proyectos?page=${page}&limit=${limit}`);
  const data = await response.json();
  return {
    proyectos: data.items,
    totalPages: data.totalPages,
    currentPage: data.currentPage
  };
};
```

## Endpoints de API Necesarios

### GET /api/proyectos
- **Query params:** page, limit, estado, tutor, asignatura, nombre
- **Response:** Lista paginada de proyectos
- **Headers:** Authorization (JWT token)

### POST /api/proyectos
- **Body:** Datos del nuevo proyecto
- **Response:** Proyecto creado
- **Headers:** Authorization (JWT token)

### PUT /api/proyectos/:id
- **Body:** Datos actualizados del proyecto
- **Response:** Proyecto actualizado
- **Headers:** Authorization (JWT token)

### DELETE /api/proyectos/:id
- **Response:** Confirmación de eliminación
- **Headers:** Authorization (JWT token)

## Estados de Carga Necesarios

```javascript
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [submitting, setSubmitting] = useState(false);
```

## Manejo de Errores

```javascript
const handleError = (error) => {
  setError(error.message);
  // Mostrar notificación al usuario
  // Log del error para debugging
};
```

## Notas Importantes

1. **Autenticación:** Todos los endpoints requieren JWT token
2. **Validación:** Validar datos antes de enviar al servidor
3. **Loading States:** Mostrar indicadores de carga durante las operaciones
4. **Error Handling:** Manejar errores de red y del servidor
5. **Optimistic Updates:** Actualizar UI antes de confirmar con el servidor
6. **Cache:** Considerar implementar cache para mejorar rendimiento

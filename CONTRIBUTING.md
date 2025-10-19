# **Guía de Contribución para DREAMS 🤝**

## Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/)

## **Formato de Commits**

```
<tipo>(<alcance>): <descripción>

[cuerpo opcional]

[footer opcional]
```

### Tipos

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad |
| `fix` | Corrección de bug |
| `docs` | Solo documentación |
| `refactor` | Refactorización (sin cambio funcional) |
| `test` | Agregar/modificar tests |
| `chore` | Mantenimiento (deps, configs) |
| `style` | Cambio estético del código (espacios, formato, etc.) |

**descripción**: Una descripción corta y clara del cambio.  
  * Debe estar en imperativo ("agrega" en vez de "agregado").  
  * Debe empezar con minúscula.  
  * No debe terminar con un punto.
  * No escribir babosadas.
  * Los emojis están permitidos.

### Ejemplos

```bash
feat(auth): agregar endpoint de login
fix(projects): corregir validación de estado ASIGNATURA
docs(readme): actualizar instrucciones de instalación
refactor(users): extraer lógica de permisos a servicio
test(auth): agregar tests de login
chore(deps): actualizar prisma a v5.7
```

## **Frontend (UI/Visual) 🎨**

Para el equipo que trabaja **solo en la parte visual**, se usa el mismo formato pero con **tipos diferenciados** para distinguir commits de frontend a simple vista.

### Tipos (Frontend)

| Tipo | Uso |
|------|-----|
| `feat-ui` | Nuevo componente o vista visual |
| `fix-ui` | Corrección visual (alineación, responsive, etc.) |
| `style-ui` | Cambios de estilos o maquetado (CSS, Tailwind, colores, etc.) |
| `ui` | Ajustes menores de diseño o interacción (hover, animaciones, fuentes, etc.) |
| `assets` | Agregar o modificar imágenes, íconos o recursos gráficos |
| `refactor-ui` | Reorganizar componentes o limpiar código visual |
| `docs-ui` | Documentación visual (guías de estilos, README del frontend) |
| `chore-ui` | Configuración específica del entorno frontend |

---

### Ejemplos (Frontend)

```bash
feat-ui(login): crear interfaz visual de login 🎨
fix-ui(layout): corregir desbordamiento en vista móvil
style-ui(navbar): ajustar colores y espaciado
ui(buttons): mejorar hover y animación de clic
assets: agregar logo blanco y fondo del edificio
refactor-ui(components): separar header y footer
docs-ui(readme): agregar guía de estilos
```

### Alcances Comunes
`nada que si quieren, ahora es menester 🤪`

- `auth` - Autenticación
- `users` - Usuarios
- `projects` - Proyectos
- `students` - Estudiantes
- `db` - Base de datos
- `api` - API general
- `docs` - Documentación

## Flujo de Trabajo

### Branches
```
main          # Código en producción
develop       # Integración de features
feature/*     # Nuevas funcionalidades
fix/*         # Correcciones
```

### Crear Features Backend
```bash
git checkout develop
git pull
git checkout -b feature/nombre-feature
# ... hacer cambios ...
git add .
git commit -m "feat(modulo): descripción"
git push origin feature/nombre-feature
# Crear Pull Request a develop
```


### Crear Features Frontend
```bash
git checkout develop
git pull
git checkout -b feature/nombre-feature
# ... hacer cambios ...
git add .
git commit -m "feat-ui(modulo): descripción"
git push origin feature/nombre-feature
# Crear Pull Request a develop
```
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

### Crear Features
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


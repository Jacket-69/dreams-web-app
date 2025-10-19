# 🏛️ Arquitectura del Sistema

## Patrón Arquitectónico

**Layered Architecture + Modular Monolith**
```
┌─────────────────────────────────────────┐
│           CLIENTE (Navegador)           │
│         React + TypeScript              │
└────────────────┬────────────────────────┘
                 │ HTTP/JSON
                 ▼
┌─────────────────────────────────────────┐
│        BACKEND API (Express)            │
│                                         │
│  ┌────────────────────────────────────┐ │
│  │   Capa de Presentación             │ │
│  │   - Controllers                    │ │
│  │   - Routing                        │ │
│  │   - DTOs + Validación (Zod)        │ │
│  └───────────────┬────────────────────┘ │
│                  │                      │
│  ┌───────────────▼────────────────────┐ │
│  │   Capa de Lógica de Negocio        │ │
│  │   - Services                       │ │
│  │   - Reglas de negocio              │ │
│  │   - Transacciones                  │ │
│  └───────────────┬────────────────────┘ │
│                  │                      │
│  ┌───────────────▼────────────────────┐ │
│  │   Capa de Acceso a Datos           │ │
│  │   - Prisma Client                  │ │
│  │   - Query builder                  │ │
│  └───────────────┬────────────────────┘ │
└──────────────────┼──────────────────────┘
                   │
┌──────────────────▼──────────────────────┐
│           PostgreSQL 14+                │
└─────────────────────────────────────────┘
```

## Stack Tecnológico

| Componente | Tecnología | Versión |
|------------|------------|---------|
| Runtime | Node.js | 18+ |
| Framework Backend | Express | 4.x |
| Lenguaje | TypeScript | 5.x |
| ORM | Prisma | 5.x |
| Base de Datos | PostgreSQL | 14+ |
| Validación | Zod | 3.x |
| Auth | JWT | - |
| Password Hash | Bcrypt | - |
| Framework Frontend | React | 18.x |
| Build Tool | Vite | 5.x |
| Estilos | TailwindCSS | 3.x |

## Módulos del Sistema (Backend)

### Core (Hito 1 - MVP)
- **auth**: Autenticación (login, JWT)
- **users**: Gestión de usuarios y permisos
- **projects**: CRUD de proyectos + aprobación
- **students**: Perfil unificado del estudiante

### Futuros (Hito 2+)
- **practices**: Gestión de prácticas
- **reports**: Dashboards y métricas

## Convenciones

### Naming

**Código (TypeScript):**
- Variables/Funciones: `camelCase`
- Clases/Interfaces: `PascalCase`
- Constantes: `UPPER_SNAKE_CASE`
- Archivos: `kebab-case.ts`

**Base de Datos (PostgreSQL):**
- Tablas: `snake_case`
- Columnas: `snake_case`
- Todo en minúsculas
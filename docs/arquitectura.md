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

### Backend

| Componente | Tecnología | Versión |
|------------|------------|---------|
| **Runtime** | Node.js | 18+ |
| **Framework** | Express | 4.21.2 |
| **Lenguaje** | TypeScript | 5.5.4 |
| **ORM** | Prisma | 5.20.0 |
| **Base de Datos** | PostgreSQL | 14 (Docker) |
| **Validación** | Zod | 3.23.8 |
| **Autenticación** | JWT + Bcrypt | - |
| **Testing** | Jest + Supertest | 29.x + 7.x |
| **Linting** | ESLint + Prettier | 8.57.1 |
| **Rate Limiting** | express-rate-limit | 7.4.1 |

### Frontend (Futuro)


### Infraestructura

| Componente | Tecnología |
|------------|------------|
| Contenedores | Docker + Docker Compose |
| Base de Datos | PostgreSQL 14-alpine |
| Desarrollo | Docker Compose |
| CI/CD | (Pendiente) |
| Hosting | (Pendiente) |


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
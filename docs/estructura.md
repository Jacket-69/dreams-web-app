# 📁 Estructura de Carpetas

## Backend
```
dreams-backend/
│
├── src/                           # Código fuente TypeScript
│   │
│   ├── config/                    # Configuración global
│   │   ├── database.ts            # Prisma client singleton
│   │   └── env.ts                 # Validación de variables de entorno
│   │
│   ├── middlewares/               # Middlewares de Express
│   │   ├── auth.middleware.ts     # Verifica JWT
│   │   ├── authorization.middleware.ts
│   │   ├── error-handler.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   ├── modules/                   # Módulos por dominio
│   │   ├── auth/
│   │   │   ├── dto/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.routes.ts
│   │   ├── users/
│   │   ├── projects/
│   │   └── students/
│   │
│   ├── shared/                    # Código compartido
│   │   ├── types/
│   │   ├── utils/
│   │   ├── constants/
│   │   └── errors/
│   │
│   ├── app.ts                     # Configuración Express
│   └── server.ts                  # Entry point
│
├── prisma/
│   ├── migrations/                # Historial de cambios BD
│   ├── seeds/                     # Datos iniciales
│   ├── schema.prisma              # Definición del modelo
│   └── seed.ts
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Responsabilidad de cada Capa

### `config/`
Configuración que se usa en toda la app.

**Ejemplos:**
- Cliente de Prisma
- Validación de variables de entorno
- Configuración de Swagger (opcional)

### `middlewares/`
Código que se ejecuta ANTES del controller.

**Ejemplos:**
- Verificar JWT
- Validar permisos
- Validar DTOs
- Logging de requests
- Manejo global de errores

### `modules/`
Mini-aplicaciones organizadas por dominio.

**Cada módulo contiene:**
- **dto/**: Schemas de validación con Zod
- **controller.ts**: Maneja HTTP (req/res)
- **service.ts**: Lógica de negocio
- **routes.ts**: Define endpoints

### `shared/`
Código reutilizable entre módulos.

**Ejemplos:**
- Utilidades (hash, JWT, logger)
- Tipos/Interfaces TypeScript
- Errores personalizados
- Constantes

## Frontend (Estamos trabajando para usted)
```
dreams-frontend/
├── src/
│   ├── pages/              # Páginas/Vistas
│   ├── ???
```

## Convenciones

**TypeScript:**
- `src/` contiene código fuente
- `dist/` contiene código compilado (auto-generado, no editar)

**Nombres:**
- Archivos: `kebab-case.ts`
- Clases: `PascalCase`
- Variables: `camelCase`

**Imports:**
```typescript
// 1. Externos
import express from 'express'

// 2. Alias (@/)
import { prisma } from '@/config/database'

// 3. Relativos
import { AuthService } from './auth.service'
```
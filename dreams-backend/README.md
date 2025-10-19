# 🎓 DREAMS Backend

API REST para el sistema de gestión de proyectos y prácticas ICCI.

## 🚀 Setup

### Prerequisitos
- Node.js 18+
- PostgreSQL 14+
- npm o pnpm

### Instalación
```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Crear base de datos
createdb dreams_dev

# Ejecutar migraciones
npm run db:migrate

# Cargar datos iniciales
npm run db:seed

# Iniciar servidor de desarrollo
npm run dev
```

Servidor corriendo en: http://localhost:3000

## 🧪 Testing
```bash
# Ejecutar tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

## 📚 Documentación

Ver documentación completa en `/docs`

## 🛠️ Scripts

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor en modo desarrollo |
| `npm run build` | Compila TypeScript a JavaScript |
| `npm start` | Inicia servidor de producción |
| `npm run db:migrate` | Ejecuta migraciones pendientes |
| `npm run db:seed` | Carga datos iniciales |
| `npm run db:studio` | Abre Prisma Studio |
| `npm run db:reset` | Resetea BD (desarrollo) |
| `npm test` | Ejecuta tests |
| `npm run lint` | Verifica código con ESLint |
| `npm run format` | Formatea código con Prettier |

## 📂 Estructura

Ver [/docs/estructura.md](../docs/estructura.md)
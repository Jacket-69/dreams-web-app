# 🎓 DREAMS Backend

API REST para el sistema de gestión de proyectos y prácticas ICCI.

## 🚀 Setup

Ver [README principal](../README.md#-setup-rápido)

## Estructura
```
src/
├── config/         # Configuración (env, database)
├── middlewares/    # Middlewares (auth, validation)
├── modules/        # Módulos por dominio (auth, projects, users)
├── shared/         # Código compartido (utils, types, errors)
├── app.ts          # Configuración Express
└── server.ts       # Entry point
```

Ver más: [docs/estructura.md](../docs/estructura.md)

## Comandos
```bash
npm run dev          # Desarrollo
npm run db:migrate   # Migraciones
npm run db:studio    # Prisma Studio
npm test             # Tests
```

## Variables de Entorno

Ver `.env.example` para configuración requerida.
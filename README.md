# 🎓 DREAMS

Sistema de gestión de proyectos y prácticas profesionales para ICCI - Universidad Central.

## 📦 Monorepo 🐒

Este proyecto usa un monorepo 🙈 que contiene:

- **dreams-backend**: API REST (Express + TypeScript + Prisma)
- **dreams-frontend**: Interfaz web (React + TypeScript + Vite)

---

## 🚀 Setup

### Con Docker

```bash
# 1. Clonar repositorio
git clone https://github.com/Jacket-69/dreams-web-app.git
cd dreams-web-app/dreams-backend

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus valores (JWT_SECRET)

# 3. Levantar PostgreSQL
docker compose up -d

# 4. Instalar dependencias
npm install

# 5. Ejecutar migraciones
npm run db:migrate

# 6. Cargar datos iniciales
npm run db:seed

# 7. Iniciar servidor
npm run dev
```

**Backend:** http://localhost:3000  
**Prisma Studio:** http://localhost:5555 (`npm run db:studio`)

--- 

## 🛠️ Stack Tecnológico

| Componente | Tecnología |
|------------|------------|
| Backend | Node.js + Express + TypeScript |
| Base de Datos | PostgreSQL 14 (Docker) |
| ORM | Prisma 5.20.0 |
| Validación | Zod |
| Autenticación | JWT + Bcrypt |
| Testing | Jest |
| Linting | ESLint 8.x + Prettier |

**Frontend:**
- React 18 + TypeScript
- Vite
- TailwindCSS

---

## 📚 Documentación

- **[Arquitectura](./docs/arquitectura.md)** - Diseño del sistema
- **[Base de Datos](./docs/database-mvp.md)** - MER del MVP
- **[Estructura](./docs/estructura.md)** - Organización de carpetas
- **[Convenciones](./CONTRIBUTING.md)** - Commits y código

---

## 🧪 Credenciales de Prueba

| Usuario | Email | Password |
|---------|-------|----------|
| Admin | admin@ucentral.cl | Admin123! |
| Docente | mario.ortiz@ucentral.cl | Docente123! |
| Estudiante | fabian.silva@ucentral.cl | Popo123! |

---

## 🐳 Docker

### PostgreSQL
```bash
# Iniciar
docker compose up -d

# Ver logs
docker compose logs -f postgres

# Detener
docker compose down

# Resetear (⚠️ borra datos)
docker compose down -v
```

### Comandos Útiles
```bash
# Entrar a PostgreSQL
docker exec -it dreams-postgres psql -U dreams_user -d dreams_dev

# Ver contenedores
docker ps

# Ver estado
docker compose ps
```

---

## 📦 Scripts npm
```bash
npm run dev          # Desarrollo (hot reload)
npm run build        # Compilar TypeScript
npm start            # Producción

npm run db:migrate   # Ejecutar migraciones
npm run db:seed      # Cargar datos iniciales
npm run db:studio    # Abrir Prisma Studio
npm run db:reset     # Resetear BD (⚠️ borra todo)

npm run lint         # Ejecutar ESLint
npm run format       # Formatear código
npm test             # Ejecutar tests
```

---

## 📄 Licencia

MIT License
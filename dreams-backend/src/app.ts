import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { env } from './config/env' // Importar variables de entorno validadas
import { errorHandler } from './middlewares/error.middleware' // Middleware de errores
import { requestLogger } from './middlewares/logger.middleware' // Middleware de logging
import authRoutes from './modules/auth/auth.routes' // Rutas de autenticación
import userRoutes from './modules/users/users.routes' // Rutas de usuarios
// hola yo del futuro importa futuras rutas aquí (cuando existan)
// import projectRoutes from './modules/projects/projects.routes';
// import studentRoutes from './modules/students/students.routes';

// Crear instancia de Express
const app = express()

// === Middlewares Globales ===

// 1. CORS: Permitir peticiones desde el frontend especificado
app.use(
  cors({
    origin: env.CORS_ORIGIN, // Origen permitido desde .env
    credentials: true, // Si necesitas enviar cookies/headers de autorización
  })
)

// 2. Body Parser: Para parsear JSON en el body de las requests
app.use(express.json())

// 3. Rate Limiting: Limitar el número de peticiones por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limitar cada IP a 100 requests por ventana
  message: 'Demasiadas solicitudes desde esta IP, por favor intente de nuevo después de 15 minutos',
  standardHeaders: true, // Retorna info del rate limit en headers `RateLimit-*`
  legacyHeaders: false, // Deshabilita headers `X-RateLimit-*` (obsoleto)
})
app.use(limiter)

// 4. Request Logger: Registrar cada petición (antes de las rutas)
app.use(requestLogger)

// === Rutas ===

// Health Check Endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Montar Módulos (con prefijo /api/v1)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes);
// app.use('/api/v1/projects', projectRoutes); // Descomentar cuando existan
// app.use('/api/v1/students', studentRoutes); // Descomentar cuando existan

// === Middleware de Manejo de Errores ===
// Debe ser el ÚLTIMO middleware en registrarse
app.use(errorHandler)

export default app
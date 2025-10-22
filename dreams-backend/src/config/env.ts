import { z } from 'zod';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

// Definir schema de validación
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive())
    .default('3000')
    .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val)),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL es requerido'),
  JWT_SECRET: z
    .string()
    .min(32, 'JWT_SECRET debe tener al menos 32 caracteres'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  BCRYPT_ROUNDS: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(z.number().positive())
    .default('10')
    .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val)),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
});

// Validar variables de entorno
const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  console.error('L Error: Variables de entorno inválidas');
  console.error(parseResult.error.format());
  process.exit(1);
}

// Exportar variables validadas con tipos inferidos
export const env = parseResult.data;

// Tipo inferido para usar en otras partes del código
export type Env = z.infer<typeof envSchema>;

// 🦆🔫
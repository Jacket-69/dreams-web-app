import { z } from 'zod';
import { NombreRol, AccionPermiso } from '@prisma/client'; // Importar enums

// Helper para validar RUT chileno 🇨🇱🇨🇱🇨🇱🇨🇱🇨🇱🇨🇱 (formato simple XXXXXXXX-X)
const rutSchema = z.string().regex(/^\d{7,8}-[\dkK]$/, 'Formato de RUT inválido (ej: 12345678-9)');

export const createUserSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  nombre: z.string().min(1, 'El nombre es requerido'),
  rut: rutSchema,
  idRol: z.string().uuid('ID de Rol inválido'),
  // Permisos solo se envían si el rol es DOCENTE, validación en service
  permisos: z.array(z.nativeEnum(AccionPermiso)).optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
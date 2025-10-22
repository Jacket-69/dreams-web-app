import { z } from 'zod';
import { EstadoUsuario, AccionPermiso } from '@prisma/client';

// Schema parcial para actualización
export const updateUserSchema = z.object({
  nombre: z.string().min(1, 'El nombre es requerido').optional(),
  // Email y RUT usualmente no se cambian, pero se podría permitir
  // email: z.string().email('Email inválido').optional(),
  // rut: rutSchema.optional(),
  estado: z.nativeEnum(EstadoUsuario).optional(),
  idRol: z.string().uuid('ID de Rol inválido').optional(),
  // Se actualizan permisos aparte
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

// Schema específico para actualizar permisos de un docente
export const updateUserPermissionsSchema = z.object({
    permisos: z.array(z.nativeEnum(AccionPermiso)).default([]), // Lista de acciones
});

export type UpdateUserPermissionsDto = z.infer<typeof updateUserPermissionsSchema>;
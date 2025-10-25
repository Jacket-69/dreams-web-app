import { z } from 'zod';

// Schema Zod para la validación del recovery
export const recoverySchema = z.object({
  rut: z.string().min(1, 'El RUT es requerido').max(12, 'El RUT es demasiado largo'),
});

// Exportar el tipo inferido del schema
export type RecoveryDto = z.infer<typeof recoverySchema>;

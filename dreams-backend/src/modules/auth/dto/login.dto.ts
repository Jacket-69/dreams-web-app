import { z } from 'zod';

// Schema Zod para la validación del login
export const loginSchema = z.object({
  email: z.string().email('El formato del email no es válido'),
  password: z.string().min(1, 'La contraseña es requerida'), // Ajusta el min si es necesario
});

// Exportar el tipo inferido del schema
export type LoginDto = z.infer<typeof loginSchema>;
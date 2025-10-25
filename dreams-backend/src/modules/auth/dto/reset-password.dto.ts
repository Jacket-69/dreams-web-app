import { z } from 'zod';

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'El token es requerido'),
  newPassword: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .regex(/(?=.*[a-z])/, 'La contraseña debe contener al menos una letra minúscula')
    .regex(/(?=.*[A-Z])/, 'La contraseña debe contener al menos una letra mayúscula')
    .regex(/(?=.*\d)/, 'La contraseña debe contener al menos un número')
    .regex(/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, 'La contraseña debe contener al menos un carácter especial'),
});

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;

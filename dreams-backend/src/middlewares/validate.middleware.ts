import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { ValidationError } from '../shared/errors/app-error';

/**
 * Middleware de validación de datos con Zod
 * Valida el cuerpo de la petición contra un schema de Zod
 *
 * @param schema - Schema de Zod para validar el request body
 * @returns Middleware de Express que valida los datos
 *
 * @example
 * // Definir schema de validación
 * const loginSchema = z.object({
 *   email: z.string().email(),
 *   password: z.string().min(8)
 * });
 *
 * // Usar en ruta
 * router.post('/login', validate(loginSchema), loginController)
 *
 * @example
 * // Con validaciones más complejas
 * const createUserSchema = z.object({
 *   email: z.string().email('Email inválido'),
 *   password: z.string().min(8, 'Contraseña debe tener al menos 8 caracteres'),
 *   nombre: z.string().min(1, 'Nombre es requerido')
 * });
 *
 * router.post('/users', validate(createUserSchema), createUserController)
 */
export const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      // Validar y parsear el body con el schema de Zod
      const parsedData = schema.parse(req.body);

      // Reemplazar req.body con los datos parseados y limpios
      req.body = parsedData;

      // Continuar con el siguiente middleware
      next();
    } catch (error) {
      // Si es un error de Zod, formatear los errores
      if (error instanceof z.ZodError) {
        // Formatear errores como "campo: mensaje"
        const formattedErrors = error.errors
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join(', ');

        throw new ValidationError(formattedErrors);
      }

      // Re-lanzar cualquier otro tipo de error
      throw error;
    }
  };
};

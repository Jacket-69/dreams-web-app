import { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/errors/app-error';
import { env } from '../config/env';

/**
 * Middleware global de manejo de errores
 * Debe ser el último middleware registrado en app.ts
 *
 * Maneja dos tipos de errores:
 * 1. AppError (errores operacionales): Devuelve el statusCode y mensaje específico
 * 2. Errores inesperados: Devuelve 500 y oculta detalles en producción
 *
 * En desarrollo, incluye stack trace para facilitar debugging
 *
 * @example
 * // En app.ts, debe ser el último middleware
 * app.use(routes);
 * app.use(errorHandler); // <-- Último middleware
 */
export const errorHandler = (
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Verificar si es un error operacional (AppError)
  if (err instanceof AppError) {
    // Error conocido y manejado
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
    });
    return;
  }

  // Error inesperado (no es AppError)
  console.error('Error no manejado:', err);

  const statusCode = 500;
  const message =
    env.NODE_ENV === 'development'
      ? err.message || 'Error interno del servidor'
      : 'Error interno del servidor';

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.NODE_ENV === 'development'
      ? {
          originalError: err.message,
          stack: err.stack,
        }
      : {}),
  });
};

import { Request, Response, NextFunction } from 'express';
import { JwtUtil } from '../shared/utils/jwt.util';
import { UnauthorizedError } from '../shared/errors/app-error';

/**
 * Middleware de autenticación JWT
 * Verifica que el usuario esté autenticado mediante un token válido
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Obtener el header de autorización
    const authHeader = req.headers.authorization;

    // Verificar que el header existe
    if (!authHeader) {
      throw new UnauthorizedError('Token no proporcionado');
    }

    // Verificar formato "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new UnauthorizedError('Formato de token inválido');
    }

    const token = parts[1];

    // Verificar y decodificar el token
    const payload = JwtUtil.verify(token);

    // Agregar el payload al objeto request
    req.user = payload;

    // Continuar con el siguiente middleware
    next();
  } catch (error) {
    // Si es un error de jwt (expirado, inválido, etc.)
    if (error instanceof Error && error.name === 'JsonWebTokenError') {
      throw new UnauthorizedError('Token inválido o expirado');
    }
    if (error instanceof Error && error.name === 'TokenExpiredError') {
      throw new UnauthorizedError('Token inválido o expirado');
    }

    // Re-lanzar el error si ya es un UnauthorizedError
    throw error;
  }
};

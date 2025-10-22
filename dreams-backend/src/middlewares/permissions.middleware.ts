import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnauthorizedError } from '../shared/errors/app-error';

/**
 * Middleware de autorización basado en permisos
 * Verifica que el usuario autenticado tenga al menos uno de los permisos requeridos
 *
 * @param requiredPermissions - Array de permisos requeridos (basta con tener uno)
 * @returns Middleware de Express que verifica permisos
 *
 * @example
 * // Requiere autenticación previa con authenticate middleware
 * router.get('/admin', authenticate, requirePermissions(['ADMINISTRAR_USUARIOS']), controller)
 *
 * @example
 * // Permitir acceso si tiene cualquiera de los permisos
 * router.post('/projects', authenticate, requirePermissions(['GESTIONAR_PROYECTOS', 'GESTIONAR_PRACTICAS']), controller)
 */
export const requirePermissions = (requiredPermissions: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Verificar que el usuario está autenticado
    if (!req.user) {
      throw new UnauthorizedError('Usuario no autenticado');
    }

    // Verificar que el usuario tiene un array de permisos
    if (!Array.isArray(req.user.permissions)) {
      throw new ForbiddenError('No tienes permisos para esta acción');
    }

    // Comprobar si el usuario tiene al menos uno de los permisos requeridos
    const hasPermission = requiredPermissions.some((permission) =>
      req.user!.permissions.includes(permission)
    );

    if (!hasPermission) {
      throw new ForbiddenError('No tienes permisos para esta acción');
    }

    // Usuario autorizado, continuar
    next();
  };
};

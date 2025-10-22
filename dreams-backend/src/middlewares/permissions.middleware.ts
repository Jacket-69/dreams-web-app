import { Request, Response, NextFunction } from 'express'
import { ForbiddenError, UnauthorizedError } from '../shared/errors/app-error'
import { NombreRol, AccionPermiso } from '@prisma/client' // Importar los enums

/**
 * Middleware de autorización basado en permisos.
 * Verifica que el usuario autenticado tenga al menos uno de los permisos requeridos.
 * El rol ADMIN siempre tiene acceso.
 *
 * @param requiredPermissions - Array de AccionPermiso requeridos (basta con tener uno)
 * @returns Middleware de Express
 */
export const requirePermissions = (requiredPermissions: AccionPermiso[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Verificar que el usuario está autenticado y tiene payload
    if (!req.user) {
      // Este error debería ser lanzado por 'authenticate' primero, pero es bueno tenerlo
      throw new UnauthorizedError('Usuario no autenticado')
    }

    // El rol ADMIN siempre tiene acceso
    if (req.user.role === NombreRol.ADMIN) {
      return next() // Pasa directamente si es ADMIN
    }

    // Verificar que el usuario tiene un array de permisos en su payload
    if (!Array.isArray(req.user.permissions)) {
      console.error('Error: req.user.permissions no es un array o no existe en el payload JWT')
      throw new ForbiddenError('No tienes permisos válidos para esta acción')
    }

    // Comprobar si el usuario tiene al menos uno de los permisos requeridos
    const hasPermission = requiredPermissions.some(permission =>
      req.user!.permissions.includes(permission)
    )

    if (!hasPermission) {
      throw new ForbiddenError(
        `Acción no permitida. Requiere uno de los siguientes permisos: ${requiredPermissions.join(', ')}`
      )
    }

    // Usuario autorizado, continuar
    next()
  }
}

/**
 * Middleware de autorización basado en roles.
 * Verifica que el usuario autenticado tenga al menos uno de los roles requeridos.
 * El rol ADMIN siempre tiene acceso (implícito si ADMIN está en requiredRoles o explícito).
 *
 * @param requiredRoles - Array de NombreRol requeridos (basta con tener uno)
 * @returns Middleware de Express
 */
export const requireRole = (requiredRoles: NombreRol[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Verificar que el usuario está autenticado y tiene payload
    if (!req.user || !req.user.role) {
      throw new UnauthorizedError('Usuario no autenticado o rol no definido en token')
    }

    // El rol ADMIN siempre tiene acceso si está explícitamente permitido o si se quiere un chequeo general
    // Si quieres que ADMIN *siempre* pase sin importar `requiredRoles`, descomenta la siguiente línea:
    // if (req.user.role === NombreRol.ADMIN) return next();

    // Comprobar si el rol del usuario está en la lista de roles requeridos
    const hasRole = requiredRoles.includes(req.user.role as NombreRol)

    if (!hasRole) {
      // Opcional: Permitir ADMIN incluso si no está en la lista explícita
      if (req.user.role === NombreRol.ADMIN) {
         return next();
      }
      throw new ForbiddenError(
        `Acción no permitida. Requiere uno de los siguientes roles: ${requiredRoles.join(', ')}`
      )
    }

    // Usuario autorizado, continuar
    next()
  }
}
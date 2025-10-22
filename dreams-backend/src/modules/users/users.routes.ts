// src/modules/users/users.routes.ts
import { Router } from 'express';
import { UsersController } from './users.controller';
import { authenticate } from '@/middlewares/auth.middleware';
import { requirePermissions } from '@/middlewares/permissions.middleware'; // O requireRole
import { validate } from '@/middlewares/validate.middleware';
import { createUserSchema, updateUserSchema, updateUserPermissionsSchema } from './dto';
import { AccionPermiso, NombreRol } from '@prisma/client'; // Importar enums

const router = Router();
const usersController = new UsersController();

// Todas las rutas de usuarios requieren autenticación
router.use(authenticate);

// Crear Usuario: Solo ADMIN
router.post(
  '/',
  requirePermissions([AccionPermiso.ADMINISTRAR_USUARIOS]), // Solo Admin tiene este permiso por defecto
  validate(createUserSchema),
  usersController.create
);

// Listar Usuarios: Solo ADMIN (o GESTOR/DOCENTE si se requiere)
router.get(
  '/',
  requirePermissions([AccionPermiso.ADMINISTRAR_USUARIOS, AccionPermiso.VER_ALUMNOS]), // Permitir a Admin y quien pueda ver alumnos
  usersController.findAll
);

// Obtener Usuario Específico: Solo ADMIN (o GESTOR/DOCENTE)
router.get(
  '/:id',
   requirePermissions([AccionPermiso.ADMINISTRAR_USUARIOS, AccionPermiso.VER_ALUMNOS]),
  usersController.findOne
);

// Actualizar Datos Básicos Usuario: Solo ADMIN
router.patch(
  '/:id',
  requirePermissions([AccionPermiso.ADMINISTRAR_USUARIOS]),
  validate(updateUserSchema),
  usersController.update
);


// Actualizar Permisos de un Docente: Solo ADMIN
router.patch(
  '/:id/permisos',
  requirePermissions([AccionPermiso.ADMINISTRAR_USUARIOS]),
  validate(updateUserPermissionsSchema),
  usersController.updatePermissions
);

// Eliminar Usuario (Borrado Lógico): Solo ADMIN
router.delete(
  '/:id',
  requirePermissions([AccionPermiso.ADMINISTRAR_USUARIOS]),
  usersController.remove
);

// Restaurar Usuario (Deshacer Borrado Lógico): Solo ADMIN
router.patch(
  '/:id/restore', // Usamos PATCH porque estamos modificando el estado del recurso
  requirePermissions([AccionPermiso.ADMINISTRAR_USUARIOS]),
  usersController.restore
);


export default router;
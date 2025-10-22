import { prisma } from '@/config/database';
import { BcryptUtil } from '@/shared/utils/bcrypt.util';
import { CreateUserDto, UpdateUserDto, UpdateUserPermissionsDto } from './dto';
import { BadRequestError, NotFoundError, ForbiddenError, InternalServerError } from '@/shared/errors/app-error';
import { NombreRol, Prisma, Usuario, Rol, PerfilEstudiante, Permiso, EstadoUsuario } from '@prisma/client'; //malditas importaciones 😭🔫

// --- Tipos para Retorno ---

// Tipo base del usuario sin contraseña y sin relaciones anidadas directas de permisos
type BaseUserOutput = Omit<Usuario, 'password'>;

// Tipo completo del perfil de usuario (usado en findOne y updatePermissions)
type UserProfile = Omit<BaseUserOutput, 'permisosAsignados'> & {
  rol: Rol;
  perfilEstudiante: PerfilEstudiante | null;
  permisos: { accion: string; descripcion: string }[]; // Formato aplanadinho
};

// --- Servicio ---

export class UsersService {

  /**
   * Crea un fokin nuevo usuario.
   * @param dto - Datos del usuario a crear
   * @param creadorId - ID del fokin usuario que realiza la acción (para auditoría y los dasbors)
   * @returns El usuario creado (sin contraseña ni relaciones complejas)
   */
  async create(dto: CreateUserDto, creadorId: string): Promise<BaseUserOutput> {
    const rol = await prisma.rol.findUnique({ where: { id: dto.idRol } });
    if (!rol) {
      throw new BadRequestError(`El rol con ID ${dto.idRol} no existe.`);
    }

    const hashedPassword = await BcryptUtil.hash(dto.password);

    try {
      const newUser = await prisma.$transaction(async (tx) => {
        const createdUser = await tx.usuario.create({
          data: {
            email: dto.email,
            password: hashedPassword,
            nombre: dto.nombre,
            rut: dto.rut,
            idRol: dto.idRol,
          },
        });

        if (rol.nombre === NombreRol.DOCENTE && dto.permisos && dto.permisos.length > 0) {
          const permisosDb = await tx.permiso.findMany({
            where: { accion: { in: dto.permisos } },
            select: { id: true },
          });
          if (permisosDb.length !== dto.permisos.length) {
            throw new BadRequestError('Uno o más permisos proporcionados son inválidos.');
          }
          await tx.usuarioPermiso.createMany({
            data: permisosDb.map(p => ({
              idUsuario: createdUser.id,
              idPermiso: p.id,
              idAsignadoPor: creadorId,
            })),
          });
        }

        if(rol.nombre === NombreRol.ESTUDIANTE) {
            // Buscar la malla curricular activa (sin fecha de fin)
            const mallaActiva = await tx.malla.findFirst({
                where: { fechaVigenciaFin: null }, // Buscar la que no tiene fecha de fin
                orderBy: { fechaVigenciaInicio: 'desc' } // Por si acaso hubiera más de una, tomar la más reciente
            });

            if (!mallaActiva) {
                // Esto sería un problema de configuración grave si no hay malla activa
                console.error('Error Crítico: No se encontró ninguna malla curricular activa en la base de datos.');
                throw new InternalServerError('No se pudo determinar la malla curricular activa para asignar al estudiante.');
            }

            // Crear el perfil del estudiante con la malla activa encontrada
            await tx.perfilEstudiante.create({
                data: {
                    idUsuario: createdUser.id,
                    idMalla: mallaActiva.id, // Usar el ID de la malla activa
                }
            });
        }

        return createdUser;
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = newUser;
      return userWithoutPassword; // Devuelve el tipo BaseUserOutput

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        const target = (error.meta?.target as string[]) || [];
        if (target.includes('email')) throw new BadRequestError(`El email '${dto.email}' ya está registrado.`);
        if (target.includes('rut')) throw new BadRequestError(`El RUT '${dto.rut}' ya está registrado.`);
      }
      if (error instanceof BadRequestError || error instanceof InternalServerError) throw error; // Re-lanzar errores conocidos
      console.error("Error no manejado en UsersService.create:", error);
      throw new InternalServerError("Ocurrió un error al crear el usuario."); // Error genérico para el cliente
    }
  }

/**
   * Obtiene todos los usuarios activos (no eliminados lógicamente), incluyendo su rol.
   * @returns Lista de usuarios (sin contraseña)
   */
  async findAll(): Promise<(Omit<BaseUserOutput, 'password'> & { rol: Rol })[]> {
     const users = await prisma.usuario.findMany({
      where: { deletedAt: null }, // Excluir eliminados lógicamente
      include: {
        rol: true // Incluir la relación completa del rol
      },
      orderBy: { nombre: 'asc' }
    });

    // Mapear para excluir explícitamente la contraseña del resultado final
    return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword);
  }

  /**
   * Obtiene el perfil completo de un usuario específico por ID.
   * @param id - ID del usuario
   * @returns El perfil del usuario encontrado o null si no existe/está inactivo
   */
  async findOne(id: string): Promise<UserProfile | null> {
    const user = await prisma.usuario.findUnique({
      where: { id, deletedAt: null, estado: EstadoUsuario.ACTIVO }, // Solo activos
      include: {
        rol: true,
        permisosAsignados: {
          include: { permiso: { select: { accion: true, descripcion: true } } }
        },
        perfilEstudiante: true
      },
    });

    if (!user) {
        // Podríamos diferenciar entre no encontrado y eliminado/inactivo si fuera necesario
        throw new NotFoundError(`Usuario activo con ID ${id} no encontrado.`);
    }

    const permissions = user.permisosAsignados.map(p => ({
        accion: p.permiso.accion,
        descripcion: p.permiso.descripcion,
    }));

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, permisosAsignados, ...userData } = user;

    return {
      ...userData,
      permisos: permissions,
    };
  }

  /**
   * Actualiza datos básicos de un usuario.
   * NO actualiza contraseña. Para permisos, usar updatePermissions.
   * @param id - ID del usuario a actualizar
   * @param dto - Datos a actualizar
   * @returns El usuario actualizado (formato base, sin relaciones complejas)
   */
  async update(id: string, dto: UpdateUserDto): Promise<BaseUserOutput> {
    // Verificar que el usuario existe (activo o inactivo, pero no eliminado)
    const existingUser = await prisma.usuario.findUnique({
      where: { id, deletedAt: null }
    });
    if (!existingUser) {
      throw new NotFoundError(`Usuario con ID ${id} no encontrado.`);
    }

    if (dto.idRol) {
      const rol = await prisma.rol.findUnique({ where: { id: dto.idRol } });
      if (!rol) {
        throw new BadRequestError(`El rol con ID ${dto.idRol} no existe.`);
      }
      // TODO: Considerar limpiar permisos si cambia de DOCENTE a otro rol
    }

    try {
        const updatedUser = await prisma.usuario.update({
            where: { id },
            data: {
                nombre: dto.nombre,
                estado: dto.estado,
                idRol: dto.idRol,
            },
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword; // Devuelve tipo BaseUserOutput

    } catch (error) {
         if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
             throw new BadRequestError(`Conflicto al actualizar. Verifica los datos únicos.`);
         }
         console.error("Error no manejado en UsersService.update:", error);
         throw new InternalServerError("Ocurrió un error al actualizar el usuario.");
    }
  }

  /**
   * Actualiza los permisos de un usuario DOCENTE.
   * @param userId - ID del usuario a modificar
   * @param dto - Objeto con la nueva lista de permisos (acciones)
   * @param modificadorId - ID del usuario que realiza la modificación
   * @returns El perfil completo del usuario actualizado
   */
  async updatePermissions(userId: string, dto: UpdateUserPermissionsDto, modificadorId: string): Promise<UserProfile> {
    const user = await prisma.usuario.findUnique({
      where: { id: userId, deletedAt: null },
      include: { rol: true },
    });

    if (!user) {
      throw new NotFoundError(`Usuario con ID ${userId} no encontrado.`);
    }
    if (user.rol.nombre !== NombreRol.DOCENTE) {
      throw new BadRequestError('Solo se pueden asignar permisos específicos a usuarios con rol DOCENTE.');
    }

    const nuevosPermisosDb = await prisma.permiso.findMany({
      where: { accion: { in: dto.permisos } },
      select: { id: true },
    });

    if (nuevosPermisosDb.length !== dto.permisos.length) {
      throw new BadRequestError('Uno o más permisos proporcionados son inválidos.');
    }
    const nuevosPermisoIds = nuevosPermisosDb.map(p => p.id);

    await prisma.$transaction(async (tx) => {
      await tx.usuarioPermiso.deleteMany({ where: { idUsuario: userId } });
      if (nuevosPermisoIds.length > 0) {
        await tx.usuarioPermiso.createMany({
          data: nuevosPermisoIds.map(permisoId => ({
            idUsuario: userId,
            idPermiso: permisoId,
            idAsignadoPor: modificadorId,
          })),
        });
      }
    });

    // findOne maneja el error si el usuario fue eliminado mientras tanto
    const updatedUserProfile = await this.findOne(userId);
     if (!updatedUserProfile) {
        // Esto es muy improbable si la transacción fue exitosa
         throw new InternalServerError("No se pudo recuperar el perfil del usuario actualizado.");
    }
    return updatedUserProfile; // Devuelve el perfil completo
  }

  /**
   * Realiza un borrado lógico de un usuario.
   * @param id - ID del usuario a eliminar
   */
  async remove(id: string): Promise<void> {
      const user = await prisma.usuario.findUnique({
          where: { id, deletedAt: null } // Buscar solo los no eliminados
      });
      // Si no existe o ya está eliminado, lanzamos NotFound para idempotencia
      if (!user) {
          throw new NotFoundError(`Usuario con ID ${id} no encontrado o ya eliminado.`);
      }

      // Marcar como eliminado y desactivar
      await prisma.usuario.update({
          where: { id },
          data: {
              deletedAt: new Date(),
              estado: EstadoUsuario.INACTIVO, // <-- Aquí se usa EstadoUsuario
          }
      });
  }

  /**
   * Restaura un usuario eliminado lógicamente.
   * Establece deletedAt a null y el estado a ACTIVO.
   * @param id - ID del usuario a restaurar
   * @returns El usuario restaurado (formato base)
   */
  async restore(id: string): Promise<BaseUserOutput> {
      // Buscar usuario, incluyendo los ya eliminados lógicamente
      const user = await prisma.usuario.findUnique({
          where: { id } // No filtramos por deletedAt aquí
      });

      // Verificar si existe y si realmente está eliminado
      if (!user) {
          throw new NotFoundError(`Usuario con ID ${id} no encontrado.`);
      }
      if (!user.deletedAt) {
          throw new BadRequestError(`El usuario con ID ${id} no está eliminado.`);
      }

      // Restaurar usuario
      const restoredUser = await prisma.usuario.update({
          where: { id },
          data: {
              deletedAt: null, // Quitar la marca de eliminación
              estado: EstadoUsuario.ACTIVO, // Volver a activar
          }
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = restoredUser;
      return userWithoutPassword;
  }
  
}
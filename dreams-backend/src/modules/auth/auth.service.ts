import { prisma } from '@/config/database';
import { BcryptUtil } from '@/shared/utils/bcrypt.util';
import { JwtUtil, JwtPayload } from '@/shared/utils/jwt.util';
import { LoginDto } from './dto/login.dto';
import { RecoveryDto } from './dto/recovery.dto';
import { UnauthorizedError, NotFoundError } from '@/shared/errors/app-error';
import { EstadoUsuario, Usuario } from '@prisma/client';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/shared/services/email.service';

export class AuthService {
  /**
   * Autentica un usuario y genera un token JWT.
   * @param dto - Datos de login (email, password)
   * @returns Objeto con token y datos del usuario
   * @throws {NotFoundError} Si el usuario no existe.
   * @throws {UnauthorizedError} Si la contraseña es incorrecta o el usuario está inactivo.
   */
  async login(dto: LoginDto): Promise<{ token: string; user: Omit<Usuario, 'password'> }> {
    const { email, password } = dto;

    // 1. Buscar usuario por email
    const user = await prisma.usuario.findUnique({
      where: { email },
      include: {
        rol: true, // Incluir rol
        permisosAsignados: { // Incluir permisos asignados
          include: {
            permiso: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundError('Usuario no encontrado');
    }

    // 2. Verificar estado ACTIVO
    if (user.estado !== EstadoUsuario.ACTIVO || user.deletedAt) {
      throw new UnauthorizedError('La cuenta de usuario está inactiva o eliminada');
    }

    // 3. Comparar password con bcrypt
    const isPasswordValid = await BcryptUtil.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Credenciales inválidas'); // Mensaje genérico por seguridad [cite: 139]
    }

    // 4. Preparar payload para JWT
    const permissions = user.permisosAsignados.map(up => up.permiso.accion);
    const jwtPayload: JwtPayload = {
      userId: user.id,
      email: user.email,
      role: user.rol.nombre,
      permissions: permissions, // Incluimos los permisos
    };

    // 5. Generar token JWT
    const token = JwtUtil.sign(jwtPayload);

    // 6. Retornar token + datos usuario (sin password)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }

  /**
   * Obtiene el perfil completo de un usuario por su ID.
   * @param userId - ID del usuario
   * @returns Perfil completo del usuario (incluyendo rol y permisos)
   * @throws {NotFoundError} Si el usuario no se encuentra.
   */
  async getProfile(userId: string): Promise<any> { // Ajusta 'any' al tipo de retorno deseado
    // Buscar usuario con rol y permisos
    const userProfile = await prisma.usuario.findUnique({
      where: { id: userId, deletedAt: null, estado: EstadoUsuario.ACTIVO },
      include: {
        rol: true,
        permisosAsignados: {
          include: {
            permiso: {
              select: { accion: true, descripcion: true }, // Seleccionar solo lo necesario del permiso
            },
          },
        },
        perfilEstudiante: true, // Incluir perfilEstudiante si aplica
      },
    });

    if (!userProfile) {
      throw new NotFoundError('Perfil de usuario no encontrado o inactivo');
    }

    // Formatear la respuesta para que sea más limpia
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...profileData } = userProfile;
    const permissions = profileData.permisosAsignados.map(p => ({
        accion: p.permiso.accion,
        descripcion: p.permiso.descripcion,
    }));

    return {
        ...profileData,
        permisosAsignados: undefined, // Remover la estructura anidada original
        permisos: permissions, // Agregar la lista plana de permisos
    };
  }

  /**
   * Procesa la recuperación de contraseña por RUT.
   * @param dto - Datos de recovery (rut)
   * @returns Objeto con el email al que se envió la recuperación
   * @throws {NotFoundError} Si el RUT no existe en la base de datos.
   */
  async recovery(dto: RecoveryDto): Promise<{ email: string }> {
    const { rut } = dto;
    const cleanRut = rut.replace(/\./g, '').trim();

    // 1. Buscar usuario por RUT
    const user = await prisma.usuario.findFirst({
      where: { rut: cleanRut },
      select: {
        id: true,
        email: true,
        nombre: true,
        estado: true,
        deletedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError('RUT no encontrado en el sistema');
    }

    // 2. Verificar que el usuario esté activo
    if (user.estado !== EstadoUsuario.ACTIVO || user.deletedAt) {
      throw new NotFoundError('RUT no encontrado en el sistema'); // Mensaje genérico por seguridad
    }

    // 3. Generar token de reseteo de contraseña
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    // 4. Guardar el token en la base de datos
    await prisma.passwordResetToken.create({
      data: {
        token: resetToken,
        expiresAt: expiresAt,
        userId: user.id
      }
    });

    // 5. Enviar email de recuperación
    await sendPasswordResetEmail(user.email, resetToken);

    // 6. Retornar el email al que se envió la recuperación
    return { email: user.email };
  }
}
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

const authService = new AuthService();

export class AuthController {
  /**
   * Maneja la solicitud de login.
   */
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const loginDto = req.body as LoginDto; // El DTO ya fue validado por el middleware
      const result = await authService.login(loginDto);
      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error); // Pasa el error al middleware de errores
    }
  }

  /**
   * Maneja la solicitud para obtener el perfil del usuario autenticado.
   */
  async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // El middleware 'authenticate' ya puso el payload en req.user
      const userId = req.user?.userId;
      if (!userId) {
         // Esto no debería pasar si 'authenticate' se usó correctamente
        throw new Error('Usuario no autenticado en la request');
      }
      const profile = await authService.getProfile(userId);
      res.status(200).json({
        status: 'success',
        data: profile,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Maneja la solicitud de logout (simbólica para JWT).
   */
  logout(_req: Request, res: Response): void {
    // Para JWT stateless, el logout es principalmente en el cliente (eliminar token).
    // Se puede añadir lógica de blacklist si es necesario, pero no está en el plan inicial.
    res.status(200).json({
      status: 'success',
      message: 'Logout exitoso (token invalidado en el cliente)',
    });
  }
}
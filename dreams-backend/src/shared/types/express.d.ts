import { JwtPayload } from '../utils/jwt.util';

/**
 * Extensión de tipos de Express para incluir información del usuario autenticado
 */
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
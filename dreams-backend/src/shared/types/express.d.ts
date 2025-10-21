import { JwtPayload } from '../utils/jwt.util';

/**
 * Extensi�n de tipos de Express para incluir informaci�n del usuario autenticado
 */
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

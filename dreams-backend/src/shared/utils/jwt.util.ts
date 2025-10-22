import jwt from 'jsonwebtoken';
import { env } from '../../config/env';

/**
 * Interface para el payload del JWT
 */
export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  permissions: string[]
}

/**
 * Utilidad para manejar JSON Web Tokens
 */
export class JwtUtil {
  /**
   * Genera un token JWT con el payload proporcionado
   * @param payload - Datos a incluir en el token (userId, email, role)
   * @returns Token JWT como string
   */
  static sign(payload: JwtPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
  }

  /**
   * Verifica y decodifica un token JWT
   * @param token - Token JWT a verificar
   * @returns Payload decodificado del token
   * @throws Error si el token es inv�lido o ha expirado
   */
  static verify(token: string): JwtPayload {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    return decoded as JwtPayload;
  }

  /**
   * Decodifica un token JWT sin verificar la firma
   * @param token - Token JWT a decodificar
   * @returns Payload decodificado o null si falla
   */
  static decode(token: string): JwtPayload | null {
    const decoded = jwt.decode(token);
    return decoded as JwtPayload | null;
  }
}

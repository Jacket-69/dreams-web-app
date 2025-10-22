import bcrypt from 'bcrypt';
import { env } from '../../config/env';

/**
 * Utilidad para manejar el hashing de contraseñas con bcrypt
 */
export class BcryptUtil {
  /**
   * Hashea una contraseña usando bcrypt
   * @param password - Contraseña en texto plano a hashear
   * @returns Promise con el hash de la contraseña
   */
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, env.BCRYPT_ROUNDS);
  }

  /**
   * Compara una contraseña en texto plano con un hash
   * @param password - Contraseña en texto plano
   * @param hash - Hash de la contraseña a comparar
   * @returns Promise<boolean> - true si coinciden, false si no
   */
  static async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

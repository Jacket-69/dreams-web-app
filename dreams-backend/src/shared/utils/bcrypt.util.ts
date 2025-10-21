import bcrypt from 'bcrypt';
import { env } from '../../config/env';

/**
 * Utilidad para manejar el hashing de contrase�as con bcrypt
 */
export class BcryptUtil {
  /**
   * Hashea una contrase�a usando bcrypt
   * @param password - Contrase�a en texto plano a hashear
   * @returns Promise con el hash de la contrase�a
   */
  static async hash(password: string): Promise<string> {
    return bcrypt.hash(password, env.BCRYPT_ROUNDS);
  }

  /**
   * Compara una contrase�a en texto plano con un hash
   * @param password - Contrase�a en texto plano
   * @param hash - Hash de la contrase�a a comparar
   * @returns Promise<boolean> - true si coinciden, false si no
   */
  static async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

import { Request, Response, NextFunction } from 'express';

/**
 * Códigos ANSI para colores en consola
 */
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
};

/**
 * Obtiene el color apropiado según el código de estado HTTP
 * @param statusCode - Código de estado HTTP
 * @returns Color ANSI correspondiente
 */
const getStatusColor = (statusCode: number): string => {
  if (statusCode >= 200 && statusCode < 300) return colors.green;
  if (statusCode >= 300 && statusCode < 400) return colors.cyan;
  if (statusCode >= 400 && statusCode < 500) return colors.yellow;
  if (statusCode >= 500) return colors.red;
  return colors.reset;
};

/**
 * Middleware de logging de peticiones HTTP
 * Registra cada request con método, URL, status code y tiempo de respuesta
 *
 * Formato de salida:
 * - Al iniciar: [timestamp] → método URL
 * - Al finalizar: [timestamp] ← método URL statusCode (duración ms)
 *
 * Colores por status code:
 * - 2xx: verde (éxito)
 * - 3xx: cyan (redirección)
 * - 4xx: amarillo (error del cliente)
 * - 5xx: rojo (error del servidor)
 *
 * @example
 * // En app.ts, antes de las rutas
 * app.use(requestLogger);
 * app.use('/api', routes);
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Capturar tiempo de inicio
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  // Log de request entrante
  console.log(
    `${colors.gray}[${timestamp}]${colors.reset} → ${req.method} ${req.url}`
  );

  // Escuchar el evento 'finish' de la respuesta
  res.on('finish', () => {
    // Calcular duración
    const duration = Date.now() - startTime;
    const finishTimestamp = new Date().toISOString();

    // Obtener color según status code
    const statusColor = getStatusColor(res.statusCode);

    // Log de respuesta completada
    console.log(
      `${colors.gray}[${finishTimestamp}]${colors.reset} ← ${req.method} ${req.url} ${statusColor}${res.statusCode}${colors.reset} ${colors.gray}(${duration}ms)${colors.reset}`
    );
  });

  // Continuar con el siguiente middleware
  next();
};

import { PrismaClient } from '@prisma/client';
import { env } from './env';

// Declarar variable global para el cliente Prisma en desarrollo
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Función para crear instancia de PrismaClient
const createPrismaClient = () => {
  return new PrismaClient({
    log:
      env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });
};

// Implementar patrón singleton
// En desarrollo: usar globalThis.prisma para evitar múltiples instancias con hot reload
// En producción: crear nueva instancia siempre
export const prisma = globalThis.prisma ?? createPrismaClient();

if (env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma;
}

// Hook para desconectar en señal SIGINT/SIGTERM
const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

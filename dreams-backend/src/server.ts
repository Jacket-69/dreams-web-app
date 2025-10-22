import app from './app' // Importar la aplicación Express configurada
import { env } from './config/env' // Importar variables de entorno
import { prisma } from './config/database' // Importar instancia de Prisma

const PORT = env.PORT

// Función para iniciar el servidor
const startServer = async () => {
  try {
    // Verificar conexión a la base de datos (opcional pero recomendado)
    await prisma.$connect()
    console.log('🐘 Conectado exitosamente a la base de datos.')

    // Iniciar el servidor Express
    const server = app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
      console.log(`🌱 Entorno actual: ${env.NODE_ENV}`)
    })

    // Manejo de señales para cierre grácil (graceful shutdown)
    const shutdown = async (signal: string) => {
      console.log(`\n🚦 Recibida señal ${signal}. Cerrando servidor...`)
      server.close(async () => {
        console.log('🔌 Servidor HTTP cerrado.')
        try {
          await prisma.$disconnect()
          console.log('🐘 Desconectado de la base de datos.')
          process.exit(0) // Salir exitosamente
        } catch (e) {
          console.error('❌ Error al desconectar de la base de datos:', e)
          process.exit(1) // Salir con error
        }
      })
    }

    process.on('SIGTERM', () => shutdown('SIGTERM')) // Señal de terminación (ej: Docker stop)
    process.on('SIGINT', () => shutdown('SIGINT')) // Señal de interrupción (ej: Ctrl+C)

  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error)
    await prisma.$disconnect().catch(e => console.error('Error al desconectar DB en fallo:', e)); // Intentar desconectar DB
    process.exit(1) // Salir con código de error
  }
}

// Ejecutar la función de inicio
startServer()
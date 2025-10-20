import { PrismaClient } from '@prisma/client'
import { seedRoles } from './seeds/01-roles.seed'
import { seedPermisos } from './seeds/02-permisos.seed'
import { seedMallas } from './seeds/03-mallas.seed'
import { seedAsignaturas } from './seeds/04-asignaturas.seed'
import { seedUsuarios } from './seeds/05-usuarios.seed'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...')
  console.log('')

  try {
    await seedRoles(prisma)
    await seedPermisos(prisma)
    await seedMallas(prisma)
    await seedAsignaturas(prisma)
    await seedUsuarios(prisma)

    console.log('')
    console.log('✅ Seed completado exitosamente!')
  } catch (error) {
    console.error('❌ Error en seed:', error)
    throw error
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
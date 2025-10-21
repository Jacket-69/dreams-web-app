import { PrismaClient, NombreRol } from '@prisma/client'

export async function seedRoles(prisma: PrismaClient) {
  console.log('📝 Creando roles...')

  const roles = [
    {
      nombre: NombreRol.ADMIN,
      descripcion: 'Administrador del sistema con acceso total',
    },
    {
      nombre: NombreRol.GESTOR,
      descripcion: 'Gestor académico con acceso a reportes y métricas',
    },
    {
      nombre: NombreRol.DOCENTE,
      descripcion: 'Docente de la carrera',
    },
    {
      nombre: NombreRol.ESTUDIANTE,
      descripcion: 'Estudiante de la carrera',
    },
  ]

  for (const rol of roles) {
    await prisma.rol.upsert({
      where: { nombre: rol.nombre },
      update: {},
      create: rol,
    })
  }

  console.log('✅ Roles creados: ADMIN, GESTOR, DOCENTE, ESTUDIANTE')
}
import { PrismaClient, AccionPermiso } from '@prisma/client'

export async function seedPermisos(prisma: PrismaClient) {
  console.log('📝 Creando permisos...')

  const permisos = [
    {
      accion: AccionPermiso.GESTIONAR_PROYECTOS,
      descripcion: 'Crear proyectos externos, aprobar proyectos de asignatura',
    },
    {
      accion: AccionPermiso.GESTIONAR_PRACTICAS,
      descripcion: 'Publicar ofertas, aprobar prácticas, gestionar proceso completo',
    },
    {
      accion: AccionPermiso.VER_REPORTES,
      descripcion: 'Acceder a dashboards y métricas del sistema',
    },
    {
      accion: AccionPermiso.ADMINISTRAR_USUARIOS,
      descripcion: 'Crear, editar y eliminar usuarios del sistema',
    },
    {
      accion: AccionPermiso.GESTIONAR_ASIGNATURAS,
      descripcion: 'CRUD del catálogo de asignaturas',
    },
    {
      accion: AccionPermiso.GESTIONAR_MALLAS,
      descripcion: 'CRUD de mallas curriculares',
    },
  ]

  for (const permiso of permisos) {
    await prisma.permiso.upsert({
      where: { accion: permiso.accion },
      update: {},
      create: permiso,
    })
  }

  console.log('✅ Permisos creados: 6 permisos')
}
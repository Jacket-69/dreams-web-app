// prisma/seeds/02-permisos.seed.ts
import { PrismaClient, AccionPermiso } from '@prisma/client'

export async function seedPermisos(prisma: PrismaClient) {
  console.log('📝 Creando permisos...')

  const permisos = [
    // Proyectos - Visualización
    { accion: AccionPermiso.VER_MIS_PROYECTOS, descripcion: 'Ver proyectos donde es miembro' },
    { accion: AccionPermiso.VER_TODOS_PROYECTOS, descripcion: 'Ver todos los proyectos del sistema' },
    { accion: AccionPermiso.VER_PROYECTOS_ASIGNATURA, descripcion: 'Ver proyectos de asignaturas que imparte' },
    
    // Proyectos - Creación
    { accion: AccionPermiso.CREAR_PROYECTO_ASIGNATURA, descripcion: 'Crear proyectos de asignatura' },
    { accion: AccionPermiso.CREAR_PROYECTO_PERSONAL, descripcion: 'Crear proyectos personales' },
    { accion: AccionPermiso.CREAR_PROYECTO_EXTERNO, descripcion: 'Crear proyectos externos/empresariales' },
    
    // Proyectos - Gestión
    { accion: AccionPermiso.APROBAR_PROYECTO_ASIGNATURA, descripcion: 'Aprobar/rechazar proyectos de asignatura' },
    { accion: AccionPermiso.CALIFICAR_PROYECTO_ASIGNATURA, descripcion: 'Calificar proyectos de asignatura' },
    { accion: AccionPermiso.EDITAR_CUALQUIER_PROYECTO, descripcion: 'Editar cualquier proyecto' },
    { accion: AccionPermiso.ELIMINAR_CUALQUIER_PROYECTO, descripcion: 'Eliminar cualquier proyecto' },
    
    // Prácticas - Estudiante
    { accion: AccionPermiso.VER_OFERTAS_PRACTICAS, descripcion: 'Ver ofertas de prácticas disponibles' },
    { accion: AccionPermiso.VER_MI_PRACTICA, descripcion: 'Ver estado de su propia práctica' },
    { accion: AccionPermiso.POSTULAR_PRACTICA, descripcion: 'Postular a ofertas de práctica' },
    
    // Prácticas - Gestión
    { accion: AccionPermiso.GESTIONAR_PRACTICAS, descripcion: 'Gestionar todo el proceso de prácticas' },
    
    // Usuarios
    { accion: AccionPermiso.VER_ALUMNOS, descripcion: 'Ver lista de estudiantes' },
    { accion: AccionPermiso.ADMINISTRAR_USUARIOS, descripcion: 'CRUD de usuarios' },
    
    // Reportes y Académico
    { accion: AccionPermiso.VER_REPORTES, descripcion: 'Acceder a reportes y métricas' },
    { accion: AccionPermiso.GESTIONAR_ASIGNATURAS, descripcion: 'CRUD de asignaturas' },
    { accion: AccionPermiso.GESTIONAR_MALLAS, descripcion: 'CRUD de mallas' },
  ]

  for (const permiso of permisos) {
    await prisma.permiso.upsert({
      where: { accion: permiso.accion },
      update: {},
      create: permiso,
    })
  }

  console.log('✅ Permisos creados: 19 permisos')
}
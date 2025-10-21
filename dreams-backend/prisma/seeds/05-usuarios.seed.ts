import { PrismaClient, NombreRol, AccionPermiso } from '@prisma/client'
import bcrypt from 'bcrypt'

export async function seedUsuarios(prisma: PrismaClient) {
  console.log('📝 Creando usuarios...')

  // Buscar roles
  const roles = {
    admin: await prisma.rol.findUnique({ where: { nombre: NombreRol.ADMIN } }),
    gestor: await prisma.rol.findUnique({ where: { nombre: NombreRol.GESTOR } }),
    docente: await prisma.rol.findUnique({ where: { nombre: NombreRol.DOCENTE } }),
    estudiante: await prisma.rol.findUnique({
      where: { nombre: NombreRol.ESTUDIANTE },
    }),
  }

  if (!roles.admin || !roles.gestor || !roles.docente || !roles.estudiante) {
    throw new Error('Roles no encontrados. Ejecuta seed de roles primero.')
  }

  // Buscar malla 2023
  const malla2023 = await prisma.malla.findUnique({
    where: { codigoVersion: '2023' },
  })

  if (!malla2023) {
    throw new Error('Malla 2023 no encontrada')
  }

  // Buscar TODOS los permisos
  const todosLosPermisos = await prisma.permiso.findMany()

  // Helper para asignar permisos
  const asignarPermisos = async (
    usuarioId: string,
    acciones: AccionPermiso[],
    asignadoPorId: string
  ) => {
    for (const accion of acciones) {
      const permiso = todosLosPermisos.find(p => p.accion === accion)
      if (permiso) {
        await prisma.usuarioPermiso.upsert({
          where: {
            idUsuario_idPermiso: {
              idUsuario: usuarioId,
              idPermiso: permiso.id,
            },
          },
          update: {},
          create: {
            idUsuario: usuarioId,
            idPermiso: permiso.id,
            idAsignadoPor: asignadoPorId,
          },
        })
      }
    }
  }

  const saltRounds = 10

  // ============================================
  // 1. ADMIN
  // ============================================
  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@ucentral.cl' },
    update: {},
    create: {
      email: 'admin@ucentral.cl',
      password: await bcrypt.hash('Admin123!', saltRounds),
      nombre: 'Administrador Sistema',
      rut: '11111111-1',
      idRol: roles.admin.id,
    },
  })

  // Admin tiene TODOS los permisos
  await asignarPermisos(
    admin.id,
    [
      AccionPermiso.VER_MIS_PROYECTOS,
      AccionPermiso.VER_TODOS_PROYECTOS,
      AccionPermiso.VER_PROYECTOS_ASIGNATURA,
      AccionPermiso.CREAR_PROYECTO_ASIGNATURA,
      AccionPermiso.CREAR_PROYECTO_PERSONAL,
      AccionPermiso.CREAR_PROYECTO_EXTERNO,
      AccionPermiso.APROBAR_PROYECTO_ASIGNATURA,
      AccionPermiso.CALIFICAR_PROYECTO_ASIGNATURA,
      AccionPermiso.EDITAR_CUALQUIER_PROYECTO,
      AccionPermiso.ELIMINAR_CUALQUIER_PROYECTO,
      AccionPermiso.VER_OFERTAS_PRACTICAS,
      AccionPermiso.GESTIONAR_PRACTICAS,
      AccionPermiso.VER_ALUMNOS,
      AccionPermiso.ADMINISTRAR_USUARIOS,
      AccionPermiso.VER_REPORTES,
      AccionPermiso.GESTIONAR_ASIGNATURAS,
      AccionPermiso.GESTIONAR_MALLAS,
    ],
    admin.id
  )

  // ============================================
  // 2. GESTOR
  // ============================================
  const gestor = await prisma.usuario.upsert({
    where: { email: 'gonzalo.honores@ucentral.cl' },
    update: {},
    create: {
      email: 'gonzalo.honores@ucentral.cl',
      password: await bcrypt.hash('Gestor123!', saltRounds),
      nombre: 'Gonzalo Honores',
      rut: '22222222-2',
      idRol: roles.gestor.id,
    },
  })

  // Gestor: Ver todos, crear externos, gestionar prácticas, reportes, académico
  await asignarPermisos(
    gestor.id,
    [
      AccionPermiso.VER_TODOS_PROYECTOS,
      AccionPermiso.CREAR_PROYECTO_EXTERNO,
      AccionPermiso.VER_OFERTAS_PRACTICAS,
      AccionPermiso.GESTIONAR_PRACTICAS,
      AccionPermiso.VER_ALUMNOS,
      AccionPermiso.VER_REPORTES,
      AccionPermiso.GESTIONAR_ASIGNATURAS,
      AccionPermiso.GESTIONAR_MALLAS,
    ],
    admin.id
  )

  // ============================================
  // 3. DOCENTE BASE - Mario (Solo Asignaturas)
  // ============================================
  const mario = await prisma.usuario.upsert({
    where: { email: 'mario.ortiz@ucentral.cl' },
    update: {},
    create: {
      email: 'mario.ortiz@ucentral.cl',
      password: await bcrypt.hash('Docente123!', saltRounds),
      nombre: 'Mario Ortiz',
      rut: '33333333-3',
      idRol: roles.docente.id,
    },
  })

  // Mario: Solo proyectos de asignatura
  await asignarPermisos(
    mario.id,
    [
      AccionPermiso.VER_MIS_PROYECTOS,
      AccionPermiso.VER_PROYECTOS_ASIGNATURA,
      AccionPermiso.CREAR_PROYECTO_ASIGNATURA,
      AccionPermiso.CREAR_PROYECTO_PERSONAL,
      AccionPermiso.APROBAR_PROYECTO_ASIGNATURA,
      AccionPermiso.CALIFICAR_PROYECTO_ASIGNATURA,
      AccionPermiso.VER_OFERTAS_PRACTICAS,
      AccionPermiso.VER_ALUMNOS,
    ],
    admin.id
  )

  // ============================================
  // 4. DOCENTE AVANZADO - Hans (Asignaturas + Externos + Prácticas)
  // ============================================
  const hans = await prisma.usuario.upsert({
    where: { email: 'hans.guerrero@ucentral.cl' },
    update: {},
    create: {
      email: 'hans.guerrero@ucentral.cl',
      password: await bcrypt.hash('Docente123!', saltRounds),
      nombre: 'Hans Guerrero',
      rut: '44444444-4',
      idRol: roles.docente.id,
    },
  })

  // Hans: Todo lo de docente + externos + prácticas
  await asignarPermisos(
    hans.id,
    [
      AccionPermiso.VER_MIS_PROYECTOS,
      AccionPermiso.VER_TODOS_PROYECTOS,
      AccionPermiso.VER_PROYECTOS_ASIGNATURA,
      AccionPermiso.CREAR_PROYECTO_ASIGNATURA,
      AccionPermiso.CREAR_PROYECTO_PERSONAL,
      AccionPermiso.CREAR_PROYECTO_EXTERNO,
      AccionPermiso.APROBAR_PROYECTO_ASIGNATURA,
      AccionPermiso.CALIFICAR_PROYECTO_ASIGNATURA,
      AccionPermiso.VER_OFERTAS_PRACTICAS,
      AccionPermiso.GESTIONAR_PRACTICAS,
      AccionPermiso.VER_ALUMNOS,
    ],
    admin.id
  )

  // ============================================
  // 5. ESTUDIANTE
  // ============================================
  const estudiante = await prisma.usuario.upsert({
    where: { email: 'fabian.silva@ucentral.cl' },
    update: {},
    create: {
      email: 'fabian.silva@ucentral.cl',
      password: await bcrypt.hash('Popo123!', saltRounds),
      nombre: 'Fabián Silva',
      rut: '55555555-5',
      idRol: roles.estudiante.id,
    },
  })

  // Estudiante: Ver mis proyectos, crear, ver prácticas
  await asignarPermisos(
    estudiante.id,
    [
      AccionPermiso.VER_MIS_PROYECTOS,
      AccionPermiso.CREAR_PROYECTO_ASIGNATURA,
      AccionPermiso.CREAR_PROYECTO_PERSONAL,
      AccionPermiso.VER_OFERTAS_PRACTICAS,
      AccionPermiso.VER_MI_PRACTICA,
      AccionPermiso.POSTULAR_PRACTICA,
    ],
    admin.id
  )

  // Crear perfil estudiante
  await prisma.perfilEstudiante.upsert({
    where: { idUsuario: estudiante.id },
    update: {},
    create: {
      idUsuario: estudiante.id,
      idMalla: malla2023.id,
      buscandoPractica: false,
    },
  })

  console.log('✅ Usuarios creados: 5 usuarios')
  console.log('')
  console.log('📧 Credenciales de prueba:')
  console.log('   Admin:      admin@ucentral.cl / Admin123!')
  console.log('   Gestor:     gonzalo.honores@ucentral.cl / Gestor123!')
  console.log('   Docente 1:  mario.ortiz@ucentral.cl / Docente123!')
  console.log('   Docente 2:  hans.guerrero@ucentral.cl / Docente123!')
  console.log('   Estudiante: fabian.silva@ucentral.cl / Popo123!')
  console.log('')
  console.log('🔑 Permisos asignados según matriz:')
  console.log('   Admin:      17 permisos (todos)')
  console.log('   Gestor:     8 permisos')
  console.log('   Mario:      8 permisos (docente base)')
  console.log('   Hans:       11 permisos (docente avanzado)')
  console.log('   Estudiante: 6 permisos')
}
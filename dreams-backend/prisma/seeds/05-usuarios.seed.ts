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

  // Buscar permisos
  const permisos = {
    gestionarProyectos: await prisma.permiso.findUnique({
      where: { accion: AccionPermiso.GESTIONAR_PROYECTOS },
    }),
    gestionarPracticas: await prisma.permiso.findUnique({
      where: { accion: AccionPermiso.GESTIONAR_PRACTICAS },
    }),
    verReportes: await prisma.permiso.findUnique({
      where: { accion: AccionPermiso.VER_REPORTES },
    }),
    administrarUsuarios: await prisma.permiso.findUnique({
      where: { accion: AccionPermiso.ADMINISTRAR_USUARIOS },
    }),
  }

  // Buscar malla 2023
  const malla2023 = await prisma.malla.findUnique({
    where: { codigoVersion: '2023' },
  })

  if (!malla2023) {
    throw new Error('Malla 2023 no encontrada')
  }

  // Rounds de bcrypt
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

  // Asignar TODOS los permisos al admin
  for (const permiso of Object.values(permisos)) {
    if (permiso) {
      await prisma.usuarioPermiso.upsert({
        where: {
          idUsuario_idPermiso: {
            idUsuario: admin.id,
            idPermiso: permiso.id,
          },
        },
        update: {},
        create: {
          idUsuario: admin.id,
          idPermiso: permiso.id,
          idAsignadoPor: admin.id,
        },
      })
    }
  }

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

  if (permisos.verReportes) {
    await prisma.usuarioPermiso.upsert({
      where: {
        idUsuario_idPermiso: {
          idUsuario: gestor.id,
          idPermiso: permisos.verReportes.id,
        },
      },
      update: {},
      create: {
        idUsuario: gestor.id,
        idPermiso: permisos.verReportes.id,
        idAsignadoPor: admin.id,
      },
    })
  }

  // ============================================
  // 3. DOCENTE - Mario (Solo Proyectos)
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

  if (permisos.gestionarProyectos) {
    await prisma.usuarioPermiso.upsert({
      where: {
        idUsuario_idPermiso: {
          idUsuario: mario.id,
          idPermiso: permisos.gestionarProyectos.id,
        },
      },
      update: {},
      create: {
        idUsuario: mario.id,
        idPermiso: permisos.gestionarProyectos.id,
        idAsignadoPor: admin.id,
      },
    })
  }

  // ============================================
  // 4. DOCENTE - Hans (Proyectos Y Prácticas)
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

  if (permisos.gestionarProyectos && permisos.gestionarPracticas) {
    await prisma.usuarioPermiso.upsert({
      where: {
        idUsuario_idPermiso: {
          idUsuario: hans.id,
          idPermiso: permisos.gestionarProyectos.id,
        },
      },
      update: {},
      create: {
        idUsuario: hans.id,
        idPermiso: permisos.gestionarProyectos.id,
        idAsignadoPor: admin.id,
      },
    })

    await prisma.usuarioPermiso.upsert({
      where: {
        idUsuario_idPermiso: {
          idUsuario: hans.id,
          idPermiso: permisos.gestionarPracticas.id,
        },
      },
      update: {},
      create: {
        idUsuario: hans.id,
        idPermiso: permisos.gestionarPracticas.id,
        idAsignadoPor: admin.id,
      },
    })
  }

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
      rut: '69.696.696-9',
      idRol: roles.estudiante.id,
    },
  })

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
}
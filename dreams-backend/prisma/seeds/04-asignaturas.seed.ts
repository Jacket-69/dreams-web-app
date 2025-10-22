import { PrismaClient } from '@prisma/client'

export async function seedAsignaturas(prisma: PrismaClient) {
  console.log('📝 Creando asignaturas...')

  // Buscar malla 2023
  const malla2023 = await prisma.malla.findUnique({
    where: { codigoVersion: '2023' },
  })

  if (!malla2023) {
    throw new Error('Malla 2023 no encontrada. Ejecuta seed de mallas primero.')
  }

  const asignaturas = [
    { codigo: 'ICI-131', nombre: 'Introducción a la Programación', semestre: 1 },
    { codigo: 'ICI-142', nombre: 'Algoritmos y Estructuras de Datos', semestre: 2 },
    { codigo: 'ICI-241', nombre: 'Base de Datos', semestre: 3 },
    { codigo: 'ICI-344', nombre: 'Ingeniería de Software', semestre: 5 },
    { codigo: 'ICI-445', nombre: 'Inteligencia Artificial', semestre: 8 },
    { codigo: 'ICI-446', nombre: 'Proyecto de Título', semestre: 10 },
  ]

  for (const asig of asignaturas) {
    await prisma.asignatura.upsert({
      where: { codigo: asig.codigo },
      update: {},
      create: {
        ...asig,
        idMalla: malla2023.id,
        activa: true,
      },
    })
  }

  console.log('✅ Asignaturas creadas: 6 asignaturas')
}
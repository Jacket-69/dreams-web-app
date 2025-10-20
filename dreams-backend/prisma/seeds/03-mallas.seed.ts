import { PrismaClient } from '@prisma/client'

export async function seedMallas(prisma: PrismaClient) {
  console.log('📝 Creando mallas...')

  const mallas = [
    {
      codigoVersion: '2018',
      descripcion: 'Malla antigua de ICCI',
      fechaVigenciaInicio: new Date('2018-01-01'),
      fechaVigenciaFin: new Date('2022-12-31'),
    },
    {
      codigoVersion: '2023',
      descripcion: 'Malla actual de ICCI con enfoque en IA y datos',
      fechaVigenciaInicio: new Date('2023-01-01'),
      fechaVigenciaFin: null, // Malla vigente
    },
  ]

  for (const malla of mallas) {
    await prisma.malla.upsert({
      where: { codigoVersion: malla.codigoVersion },
      update: {},
      create: malla,
    })
  }

  console.log('✅ Mallas creadas: 2018, 2023')
}
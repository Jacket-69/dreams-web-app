/*
  Warnings:

  - The values [GESTIONAR_PROYECTOS] on the enum `AccionPermiso` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `miembro_proyecto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tipo_miembro` on the `miembro_proyecto` table. All the data in the column will be lost.
  - The required column `id` was added to the `miembro_proyecto` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccionPermiso_new" AS ENUM ('VER_MIS_PROYECTOS', 'VER_TODOS_PROYECTOS', 'VER_PROYECTOS_ASIGNATURA', 'CREAR_PROYECTO_ASIGNATURA', 'CREAR_PROYECTO_PERSONAL', 'CREAR_PROYECTO_EXTERNO', 'APROBAR_PROYECTO_ASIGNATURA', 'CALIFICAR_PROYECTO_ASIGNATURA', 'EDITAR_CUALQUIER_PROYECTO', 'ELIMINAR_CUALQUIER_PROYECTO', 'VER_OFERTAS_PRACTICAS', 'VER_MI_PRACTICA', 'POSTULAR_PRACTICA', 'GESTIONAR_PRACTICAS', 'VER_ALUMNOS', 'ADMINISTRAR_USUARIOS', 'VER_REPORTES', 'GESTIONAR_ASIGNATURAS', 'GESTIONAR_MALLAS');
ALTER TABLE "permiso" ALTER COLUMN "accion" TYPE "AccionPermiso_new" USING ("accion"::text::"AccionPermiso_new");
ALTER TYPE "AccionPermiso" RENAME TO "AccionPermiso_old";
ALTER TYPE "AccionPermiso_new" RENAME TO "AccionPermiso";
DROP TYPE "AccionPermiso_old";
COMMIT;

-- AlterTable
ALTER TABLE "miembro_proyecto" DROP CONSTRAINT "miembro_proyecto_pkey",
DROP COLUMN "tipo_miembro",
ADD COLUMN     "email_externo" TEXT,
ADD COLUMN     "empresa_externo" TEXT,
ADD COLUMN     "es_externo" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "nombre_externo" TEXT,
ALTER COLUMN "id_usuario" DROP NOT NULL,
ADD CONSTRAINT "miembro_proyecto_pkey" PRIMARY KEY ("id");

-- DropEnum
DROP TYPE "TipoMiembro";

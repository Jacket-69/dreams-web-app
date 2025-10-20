-- CreateEnum
CREATE TYPE "NombreRol" AS ENUM ('ESTUDIANTE', 'DOCENTE', 'GESTOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "AccionPermiso" AS ENUM ('GESTIONAR_PROYECTOS', 'GESTIONAR_PRACTICAS', 'VER_REPORTES', 'ADMINISTRAR_USUARIOS', 'GESTIONAR_ASIGNATURAS', 'GESTIONAR_MALLAS');

-- CreateEnum
CREATE TYPE "EstadoUsuario" AS ENUM ('ACTIVO', 'INACTIVO');

-- CreateEnum
CREATE TYPE "TipoProyecto" AS ENUM ('ASIGNATURA', 'PERSONAL', 'EXTERNO');

-- CreateEnum
CREATE TYPE "EstadoProyecto" AS ENUM ('PENDIENTE_APROBACION', 'EN_PROCESO', 'APROBADO', 'REPROBADO', 'EN_PAUSA', 'CANCELADO', 'FINALIZADO', 'RECHAZADO');

-- CreateEnum
CREATE TYPE "TipoMiembro" AS ENUM ('ESTUDIANTE', 'DOCENTE', 'EXTERNO');

-- CreateEnum
CREATE TYPE "EstadoInvitacion" AS ENUM ('PENDIENTE', 'ACEPTADA', 'RECHAZADA');

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "rut" TEXT NOT NULL,
    "estado" "EstadoUsuario" NOT NULL DEFAULT 'ACTIVO',
    "id_rol" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rol" (
    "id" TEXT NOT NULL,
    "nombre" "NombreRol" NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permiso" (
    "id" TEXT NOT NULL,
    "accion" "AccionPermiso" NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "permiso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario_permiso" (
    "id_usuario" TEXT NOT NULL,
    "id_permiso" TEXT NOT NULL,
    "asignado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_asignado_por" TEXT,

    CONSTRAINT "usuario_permiso_pkey" PRIMARY KEY ("id_usuario","id_permiso")
);

-- CreateTable
CREATE TABLE "perfil_estudiante" (
    "id_usuario" TEXT NOT NULL,
    "id_malla" TEXT NOT NULL,
    "buscando_practica" BOOLEAN NOT NULL DEFAULT false,
    "fecha_busqueda_activada" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "perfil_estudiante_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "malla" (
    "id" TEXT NOT NULL,
    "codigo_version" TEXT NOT NULL,
    "descripcion" TEXT,
    "fecha_vigencia_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_vigencia_fin" TIMESTAMP(3),

    CONSTRAINT "malla_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asignatura" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "semestre" INTEGER NOT NULL,
    "id_malla" TEXT NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "asignatura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proyecto" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen_url" TEXT,
    "tipo" "TipoProyecto" NOT NULL,
    "estado" "EstadoProyecto" NOT NULL,
    "comentario_final" TEXT,
    "id_creador" TEXT NOT NULL,
    "ultima_actividad" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "proyecto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_proyecto_asignatura" (
    "id_proyecto" TEXT NOT NULL,
    "id_asignatura" TEXT NOT NULL,
    "id_docente_asignatura" TEXT NOT NULL,

    CONSTRAINT "detalle_proyecto_asignatura_pkey" PRIMARY KEY ("id_proyecto")
);

-- CreateTable
CREATE TABLE "historial_estado_proyecto" (
    "id" TEXT NOT NULL,
    "id_proyecto" TEXT NOT NULL,
    "estado_anterior" TEXT NOT NULL,
    "estado_nuevo" TEXT NOT NULL,
    "fecha_cambio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_usuario_modificador" TEXT,
    "motivo" TEXT,
    "es_automatico" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "historial_estado_proyecto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "miembro_proyecto" (
    "id_usuario" TEXT NOT NULL,
    "id_proyecto" TEXT NOT NULL,
    "tipo_miembro" "TipoMiembro" NOT NULL,
    "rol_en_proyecto" TEXT NOT NULL,
    "es_propietario" BOOLEAN NOT NULL DEFAULT false,
    "calificacion" DECIMAL(2,1),
    "comentario_calificacion" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "miembro_proyecto_pkey" PRIMARY KEY ("id_usuario","id_proyecto")
);

-- CreateTable
CREATE TABLE "invitacion_proyecto" (
    "id" TEXT NOT NULL,
    "id_proyecto" TEXT NOT NULL,
    "id_invitado" TEXT NOT NULL,
    "id_invitador" TEXT NOT NULL,
    "estado" "EstadoInvitacion" NOT NULL DEFAULT 'PENDIENTE',
    "mensaje" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "respondida_at" TIMESTAMP(3),

    CONSTRAINT "invitacion_proyecto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_rut_key" ON "usuario"("rut");

-- CreateIndex
CREATE INDEX "usuario_email_idx" ON "usuario"("email");

-- CreateIndex
CREATE INDEX "usuario_rut_idx" ON "usuario"("rut");

-- CreateIndex
CREATE INDEX "usuario_id_rol_idx" ON "usuario"("id_rol");

-- CreateIndex
CREATE INDEX "usuario_estado_deleted_at_idx" ON "usuario"("estado", "deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "rol_nombre_key" ON "rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "permiso_accion_key" ON "permiso"("accion");

-- CreateIndex
CREATE INDEX "usuario_permiso_id_usuario_idx" ON "usuario_permiso"("id_usuario");

-- CreateIndex
CREATE INDEX "perfil_estudiante_id_malla_idx" ON "perfil_estudiante"("id_malla");

-- CreateIndex
CREATE UNIQUE INDEX "malla_codigo_version_key" ON "malla"("codigo_version");

-- CreateIndex
CREATE UNIQUE INDEX "asignatura_codigo_key" ON "asignatura"("codigo");

-- CreateIndex
CREATE INDEX "asignatura_id_malla_activa_idx" ON "asignatura"("id_malla", "activa");

-- CreateIndex
CREATE INDEX "asignatura_codigo_idx" ON "asignatura"("codigo");

-- CreateIndex
CREATE INDEX "proyecto_id_creador_idx" ON "proyecto"("id_creador");

-- CreateIndex
CREATE INDEX "proyecto_tipo_estado_idx" ON "proyecto"("tipo", "estado");

-- CreateIndex
CREATE INDEX "proyecto_ultima_actividad_idx" ON "proyecto"("ultima_actividad");

-- CreateIndex
CREATE INDEX "detalle_proyecto_asignatura_id_asignatura_idx" ON "detalle_proyecto_asignatura"("id_asignatura");

-- CreateIndex
CREATE INDEX "detalle_proyecto_asignatura_id_docente_asignatura_idx" ON "detalle_proyecto_asignatura"("id_docente_asignatura");

-- CreateIndex
CREATE INDEX "historial_estado_proyecto_id_proyecto_idx" ON "historial_estado_proyecto"("id_proyecto");

-- CreateIndex
CREATE INDEX "historial_estado_proyecto_fecha_cambio_idx" ON "historial_estado_proyecto"("fecha_cambio");

-- CreateIndex
CREATE INDEX "miembro_proyecto_id_proyecto_idx" ON "miembro_proyecto"("id_proyecto");

-- CreateIndex
CREATE INDEX "miembro_proyecto_id_usuario_idx" ON "miembro_proyecto"("id_usuario");

-- CreateIndex
CREATE INDEX "invitacion_proyecto_id_proyecto_idx" ON "invitacion_proyecto"("id_proyecto");

-- CreateIndex
CREATE INDEX "invitacion_proyecto_id_invitado_estado_idx" ON "invitacion_proyecto"("id_invitado", "estado");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_permiso" ADD CONSTRAINT "usuario_permiso_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_permiso" ADD CONSTRAINT "usuario_permiso_id_permiso_fkey" FOREIGN KEY ("id_permiso") REFERENCES "permiso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_permiso" ADD CONSTRAINT "usuario_permiso_id_asignado_por_fkey" FOREIGN KEY ("id_asignado_por") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfil_estudiante" ADD CONSTRAINT "perfil_estudiante_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfil_estudiante" ADD CONSTRAINT "perfil_estudiante_id_malla_fkey" FOREIGN KEY ("id_malla") REFERENCES "malla"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asignatura" ADD CONSTRAINT "asignatura_id_malla_fkey" FOREIGN KEY ("id_malla") REFERENCES "malla"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proyecto" ADD CONSTRAINT "proyecto_id_creador_fkey" FOREIGN KEY ("id_creador") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_proyecto_asignatura" ADD CONSTRAINT "detalle_proyecto_asignatura_id_proyecto_fkey" FOREIGN KEY ("id_proyecto") REFERENCES "proyecto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_proyecto_asignatura" ADD CONSTRAINT "detalle_proyecto_asignatura_id_asignatura_fkey" FOREIGN KEY ("id_asignatura") REFERENCES "asignatura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_proyecto_asignatura" ADD CONSTRAINT "detalle_proyecto_asignatura_id_docente_asignatura_fkey" FOREIGN KEY ("id_docente_asignatura") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_estado_proyecto" ADD CONSTRAINT "historial_estado_proyecto_id_proyecto_fkey" FOREIGN KEY ("id_proyecto") REFERENCES "proyecto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_estado_proyecto" ADD CONSTRAINT "historial_estado_proyecto_id_usuario_modificador_fkey" FOREIGN KEY ("id_usuario_modificador") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "miembro_proyecto" ADD CONSTRAINT "miembro_proyecto_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "miembro_proyecto" ADD CONSTRAINT "miembro_proyecto_id_proyecto_fkey" FOREIGN KEY ("id_proyecto") REFERENCES "proyecto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitacion_proyecto" ADD CONSTRAINT "invitacion_proyecto_id_proyecto_fkey" FOREIGN KEY ("id_proyecto") REFERENCES "proyecto"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitacion_proyecto" ADD CONSTRAINT "invitacion_proyecto_id_invitado_fkey" FOREIGN KEY ("id_invitado") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitacion_proyecto" ADD CONSTRAINT "invitacion_proyecto_id_invitador_fkey" FOREIGN KEY ("id_invitador") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

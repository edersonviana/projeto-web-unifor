-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ESTUDANTE', 'FUNCIONARIO', 'ADMIN');

-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('ESTUDANTE', 'FUNCIONARIO');

-- CreateEnum
CREATE TYPE "DiasSemana" AS ENUM ('DOMINGO', 'SEGUNDA_FEIRA', 'TERCA_FEIRA', 'QUARTA_FEIRA', 'QUINTA_FEIRA', 'SEXTA_FEIRA', 'SABADO');

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT,
    "role" "Role" NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evento" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "hora_inicio" TIMESTAMP(3) NOT NULL,
    "hora_fim" TIMESTAMP(3) NOT NULL,
    "local" TEXT NOT NULL,
    "dia_semana" "DiasSemana" NOT NULL,
    "tipo_usuario" "TipoUsuario" NOT NULL,

    CONSTRAINT "evento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_matricula_key" ON "usuario"("matricula");

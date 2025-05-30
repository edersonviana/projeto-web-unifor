/*
  Warnings:

  - You are about to drop the column `datasCancelamento` on the `evento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "evento" DROP COLUMN "datasCancelamento",
ADD COLUMN     "datas_cancelamento" TIMESTAMP(3)[];

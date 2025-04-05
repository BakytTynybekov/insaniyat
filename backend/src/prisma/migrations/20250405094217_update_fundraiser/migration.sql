/*
  Warnings:

  - You are about to drop the column `program` on the `FundRaiser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FundRaiser" DROP COLUMN "program",
ADD COLUMN     "direction" "DIRECTION" NOT NULL DEFAULT 'MEDICAL';

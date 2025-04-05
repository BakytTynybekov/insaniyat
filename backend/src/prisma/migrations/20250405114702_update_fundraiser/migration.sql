/*
  Warnings:

  - You are about to drop the column `programId` on the `FundRaiser` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "FundRaiser" DROP CONSTRAINT "FundRaiser_programId_fkey";

-- AlterTable
ALTER TABLE "FundRaiser" DROP COLUMN "programId",
ADD COLUMN     "programTitle" TEXT;

-- AddForeignKey
ALTER TABLE "FundRaiser" ADD CONSTRAINT "FundRaiser_programTitle_fkey" FOREIGN KEY ("programTitle") REFERENCES "Program"("title") ON DELETE SET NULL ON UPDATE CASCADE;

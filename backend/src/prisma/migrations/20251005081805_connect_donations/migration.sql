/*
  Warnings:

  - Made the column `fundRaiserId` on table `Donation` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_fundRaiserId_fkey";

-- AlterTable
ALTER TABLE "Donation" ALTER COLUMN "fundRaiserId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_fundRaiserId_fkey" FOREIGN KEY ("fundRaiserId") REFERENCES "FundRaiser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

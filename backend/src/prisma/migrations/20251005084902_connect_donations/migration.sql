-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_fundRaiserId_fkey";

-- AlterTable
ALTER TABLE "Donation" ALTER COLUMN "fundRaiserId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_fundRaiserId_fkey" FOREIGN KEY ("fundRaiserId") REFERENCES "FundRaiser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

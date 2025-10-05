-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "fundRaiserId" TEXT;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_fundRaiserId_fkey" FOREIGN KEY ("fundRaiserId") REFERENCES "FundRaiser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

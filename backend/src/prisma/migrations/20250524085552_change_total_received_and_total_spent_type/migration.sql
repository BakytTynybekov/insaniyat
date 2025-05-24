/*
  Warnings:

  - Changed the type of `totalReceived` on the `IncomeReport` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `totalReceived` on the `SpendinsReport` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `totalSpent` on the `SpendinsReport` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "IncomeReport" DROP COLUMN "totalReceived",
ADD COLUMN     "totalReceived" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "SpendinsReport" DROP COLUMN "totalReceived",
ADD COLUMN     "totalReceived" DOUBLE PRECISION NOT NULL,
DROP COLUMN "totalSpent",
ADD COLUMN     "totalSpent" DOUBLE PRECISION NOT NULL;

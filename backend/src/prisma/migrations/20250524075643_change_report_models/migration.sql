/*
  Warnings:

  - A unique constraint covering the columns `[year,month]` on the table `IncomeReport` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[year,month]` on the table `SpendinsReport` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "IncomeReport_year_month_key" ON "IncomeReport"("year", "month");

-- CreateIndex
CREATE UNIQUE INDEX "SpendinsReport_year_month_key" ON "SpendinsReport"("year", "month");

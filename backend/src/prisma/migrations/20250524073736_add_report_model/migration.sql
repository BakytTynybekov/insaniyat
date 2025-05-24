-- CreateTable
CREATE TABLE "IncomeReport" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "totalReceived" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IncomeReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpendinsReport" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "totalReceived" TEXT NOT NULL,
    "totalSpent" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "beneficiariesCount" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpendinsReport_pkey" PRIMARY KEY ("id")
);

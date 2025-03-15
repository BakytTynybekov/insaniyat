-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('ACTIVE', 'COMPLETED');

-- CreateTable
CREATE TABLE "FundRaiser" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "raised" DOUBLE PRECISION NOT NULL,
    "status" "StatusType" NOT NULL DEFAULT 'ACTIVE',
    "image" TEXT NOT NULL,
    "images" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FundRaiser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FundRaiser_title_key" ON "FundRaiser"("title");

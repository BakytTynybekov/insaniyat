-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('ACTIVE', 'COMPLETED', 'SUCCESSFUL');

-- CreateEnum
CREATE TYPE "DIRECTION" AS ENUM ('MEDICAL', 'EDUCATION', 'SOCIAL');

-- CreateEnum
CREATE TYPE "paymentType" AS ENUM ('ONE_TIME', 'MONTHLY');

-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('LOADING', 'ERROR', 'SUCCESS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donation" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentType" "paymentType" NOT NULL DEFAULT 'ONE_TIME',
    "status" "paymentStatus" NOT NULL DEFAULT 'LOADING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

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
    "programTitle" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FundRaiser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncomeReport" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "totalReceived" DOUBLE PRECISION NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IncomeReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpendinsReport" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "totalReceived" DOUBLE PRECISION NOT NULL,
    "totalSpent" DOUBLE PRECISION NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "beneficiariesCount" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpendinsReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Program_title_key" ON "Program"("title");

-- CreateIndex
CREATE UNIQUE INDEX "FundRaiser_title_key" ON "FundRaiser"("title");

-- CreateIndex
CREATE UNIQUE INDEX "IncomeReport_year_month_key" ON "IncomeReport"("year", "month");

-- CreateIndex
CREATE UNIQUE INDEX "SpendinsReport_year_month_key" ON "SpendinsReport"("year", "month");

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FundRaiser" ADD CONSTRAINT "FundRaiser_programTitle_fkey" FOREIGN KEY ("programTitle") REFERENCES "Program"("title") ON DELETE SET NULL ON UPDATE CASCADE;

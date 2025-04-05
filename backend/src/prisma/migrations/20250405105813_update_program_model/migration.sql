/*
  Warnings:

  - You are about to drop the column `contetn` on the `Program` table. All the data in the column will be lost.
  - Added the required column `content` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Program" DROP COLUMN "contetn",
ADD COLUMN     "content" TEXT NOT NULL;

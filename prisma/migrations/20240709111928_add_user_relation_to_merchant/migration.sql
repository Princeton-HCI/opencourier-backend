/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Merchant` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_userId_key" ON "Merchant"("userId");

-- AddForeignKey
ALTER TABLE "Merchant" ADD CONSTRAINT "Merchant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

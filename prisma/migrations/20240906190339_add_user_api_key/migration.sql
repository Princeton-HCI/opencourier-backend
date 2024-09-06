/*
  Warnings:

  - A unique constraint covering the columns `[apiKey]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Delivery" ALTER COLUMN "dropoffDeadlineAt" DROP NOT NULL,
ALTER COLUMN "dropoffReadyAt" DROP NOT NULL,
ALTER COLUMN "pickupDeadlineAt" DROP NOT NULL,
ALTER COLUMN "pickupReadyAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DeliveryQuote" ALTER COLUMN "pickupReadyAt" DROP NOT NULL,
ALTER COLUMN "dropoffReadyAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "apiKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_apiKey_key" ON "User"("apiKey");

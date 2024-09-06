/*
  Warnings:

  - The values [MERCHANT] on the enum `EnumUserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `merchantId` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `merchantId` on the `DeliveryQuote` table. All the data in the column will be lost.
  - You are about to drop the `Merchant` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[idempotencyKey,partnerId]` on the table `Delivery` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EnumUserRole_new" AS ENUM ('ADMIN', 'COURIER', 'PARTNER');
ALTER TABLE "User" ALTER COLUMN "role" TYPE "EnumUserRole_new"[] USING ("role"::text::"EnumUserRole_new"[]);
ALTER TYPE "EnumUserRole" RENAME TO "EnumUserRole_old";
ALTER TYPE "EnumUserRole_new" RENAME TO "EnumUserRole";
DROP TYPE "EnumUserRole_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Delivery" DROP CONSTRAINT "Delivery_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "DeliveryQuote" DROP CONSTRAINT "DeliveryQuote_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "Merchant" DROP CONSTRAINT "Merchant_userId_fkey";

-- DropIndex
DROP INDEX "Delivery_idempotencyKey_merchantId_key";

-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "merchantId",
ADD COLUMN     "partnerId" TEXT;

-- AlterTable
ALTER TABLE "DeliveryQuote" DROP COLUMN "merchantId",
ADD COLUMN     "partnerId" TEXT;

-- DropTable
DROP TABLE "Merchant";

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "logo" VARCHAR(255),
    "phoneNumber" VARCHAR(255),
    "webhookUrl" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partner_userId_key" ON "Partner"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_idempotencyKey_partnerId_key" ON "Delivery"("idempotencyKey", "partnerId");

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryQuote" ADD CONSTRAINT "DeliveryQuote_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `courierNotes` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `customerPhoneNumber` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryTime` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `items` on the `Delivery` table. All the data in the column will be lost.
  - The `undeliverableAction` column on the `Delivery` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `DeliveryLocation` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[idempotencyKey]` on the table `Delivery` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[deliveryQuoteId]` on the table `Delivery` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deliveryQuoteId` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dropoffDeadlineAt` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dropoffLocationId` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dropoffName` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dropoffPhoneNumber` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dropoffReadyAt` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupBusinessName` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupDeadlineAt` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLocationId` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupName` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupPhoneNumber` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupReadyAt` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Made the column `pickupLocationId` on table `DeliveryQuote` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dropoffLocationId` on table `DeliveryQuote` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "EnumUndeliverableAction" AS ENUM ('LEAVE_AT_DOOR', 'RETURN', 'DISCARD');

-- CreateEnum
CREATE TYPE "EnumDeliverableAction" AS ENUM ('MEET_AT_DOOR', 'LEAVE_AT_DOOR');

-- DropForeignKey
ALTER TABLE "DeliveryLocation" DROP CONSTRAINT "DeliveryLocation_deliveryId_fkey";

-- DropForeignKey
ALTER TABLE "DeliveryLocation" DROP CONSTRAINT "DeliveryLocation_locationId_fkey";

-- DropForeignKey
ALTER TABLE "DeliveryQuote" DROP CONSTRAINT "DeliveryQuote_deliveryId_fkey";

-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "courierNotes",
DROP COLUMN "customerName",
DROP COLUMN "customerPhoneNumber",
DROP COLUMN "deliveryTime",
DROP COLUMN "items",
ADD COLUMN     "deliverableAction" "EnumDeliverableAction" NOT NULL DEFAULT 'MEET_AT_DOOR',
ADD COLUMN     "deliveryQuoteId" TEXT NOT NULL,
ADD COLUMN     "dropoffBusinessName" VARCHAR(255),
ADD COLUMN     "dropoffDeadlineAt" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "dropoffLocationId" TEXT NOT NULL,
ADD COLUMN     "dropoffName" VARCHAR(255) NOT NULL,
ADD COLUMN     "dropoffNotes" VARCHAR(255),
ADD COLUMN     "dropoffPhoneNumber" VARCHAR(255) NOT NULL,
ADD COLUMN     "dropoffReadyAt" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "dropoffSellerNotes" VARCHAR(255),
ADD COLUMN     "dropoffVerification" JSON,
ADD COLUMN     "externalId" TEXT,
ADD COLUMN     "externalStoreId" TEXT,
ADD COLUMN     "externalUserInfo" JSONB,
ADD COLUMN     "idempotencyKey" TEXT,
ADD COLUMN     "orderItems" JSON[] DEFAULT ARRAY[]::JSON[],
ADD COLUMN     "orderReference" TEXT,
ADD COLUMN     "orderTotalValue" TEXT,
ADD COLUMN     "pickupBusinessName" VARCHAR(255) NOT NULL,
ADD COLUMN     "pickupDeadlineAt" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "pickupLocationId" TEXT NOT NULL,
ADD COLUMN     "pickupName" VARCHAR(255) NOT NULL,
ADD COLUMN     "pickupNotes" VARCHAR(255),
ADD COLUMN     "pickupPhoneNumber" VARCHAR(255) NOT NULL,
ADD COLUMN     "pickupReadyAt" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "pickupVerification" JSON,
ADD COLUMN     "requiresDropoffSignature" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "requiresId" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "returnVerification" JSON,
DROP COLUMN "undeliverableAction",
ADD COLUMN     "undeliverableAction" "EnumUndeliverableAction";

-- AlterTable
ALTER TABLE "DeliveryQuote" ALTER COLUMN "pickupLocationId" SET NOT NULL,
ALTER COLUMN "dropoffLocationId" SET NOT NULL;

-- DropTable
DROP TABLE "DeliveryLocation";

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_idempotencyKey_key" ON "Delivery"("idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_deliveryQuoteId_key" ON "Delivery"("deliveryQuoteId");

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_pickupLocationId_fkey" FOREIGN KEY ("pickupLocationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_dropoffLocationId_fkey" FOREIGN KEY ("dropoffLocationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_deliveryQuoteId_fkey" FOREIGN KEY ("deliveryQuoteId") REFERENCES "DeliveryQuote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

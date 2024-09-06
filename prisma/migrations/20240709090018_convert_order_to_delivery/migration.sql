/*
  Warnings:

  - You are about to drop the column `orderSetting` on the `Courier` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `CourierNote` table. All the data in the column will be lost.
  - You are about to drop the column `orderPreferences` on the `CourierSetting` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderLocation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deliveryId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnumCourierDeliverySetting" AS ENUM ('AUTO_ACCEPT', 'AUTO_REJECT', 'MANUAL');

-- CreateEnum
CREATE TYPE "EnumDeliveryStatus" AS ENUM ('CREATED', 'DISPATCHED', 'PICKED_UP', 'DROPPED_OFF', 'CANCELED');

-- CreateEnum
CREATE TYPE "EnumDeliveryEventType" AS ENUM ('CREATED', 'CONFIRMED', 'CANCELED', 'REJECTED', 'FULFILLED', 'PAYMENT_FAILED', 'PREPARED', 'PICKED_UP', 'FAILED_TO_CREATE', 'FAILED');

-- CreateEnum
CREATE TYPE "EnumDeliveryEventSource" AS ENUM ('OPENDELLI');

-- DropForeignKey
ALTER TABLE "CourierNote" DROP CONSTRAINT "CourierNote_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_courierId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "OrderEvent" DROP CONSTRAINT "OrderEvent_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderLocation" DROP CONSTRAINT "OrderLocation_locationId_fkey";

-- DropForeignKey
ALTER TABLE "OrderLocation" DROP CONSTRAINT "OrderLocation_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- AlterTable
ALTER TABLE "Courier" DROP COLUMN "orderSetting",
ADD COLUMN     "deliverySetting" "EnumCourierDeliverySetting" NOT NULL DEFAULT 'MANUAL';

-- AlterTable
ALTER TABLE "CourierNote" DROP COLUMN "orderId",
ADD COLUMN     "deliveryId" TEXT;

-- AlterTable
ALTER TABLE "CourierSetting" DROP COLUMN "orderPreferences",
ADD COLUMN     "deliveryPreferences" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[];

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "orderId",
ADD COLUMN     "deliveryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "OrderEvent";

-- DropTable
DROP TABLE "OrderLocation";

-- DropEnum
DROP TYPE "EnumCourierOrderSetting";

-- DropEnum
DROP TYPE "EnumOrderEventSource";

-- DropEnum
DROP TYPE "EnumOrderEventType";

-- DropEnum
DROP TYPE "EnumOrderStatus";

-- CreateTable
CREATE TABLE "DeliveryQuote" (
    "id" TEXT NOT NULL,
    "quote" DOUBLE PRECISION NOT NULL,
    "currency" VARCHAR(255) NOT NULL,
    "duration" INTEGER NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "distanceUnit" VARCHAR(255) NOT NULL,
    "pickupPhoneNumber" VARCHAR(255),
    "pickupName" VARCHAR(255),
    "dropoffPhoneNumber" VARCHAR(255),
    "dropoffName" VARCHAR(255),
    "expiresAt" TIMESTAMP(3),
    "pickupReadyAt" TIMESTAMP(3) NOT NULL,
    "pickupDeadlineAt" TIMESTAMP(3),
    "dropoffReadyAt" TIMESTAMP(3) NOT NULL,
    "dropoffDeadlineAt" TIMESTAMP(3),
    "orderTotalValue" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pickupLocationId" TEXT,
    "dropoffLocationId" TEXT,
    "merchantId" TEXT,
    "deliveryId" TEXT,

    CONSTRAINT "DeliveryQuote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryLocation" (
    "locationType" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deliveryId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "DeliveryLocation_pkey" PRIMARY KEY ("deliveryId","locationId")
);

-- CreateTable
CREATE TABLE "Delivery" (
    "id" TEXT NOT NULL,
    "customerName" VARCHAR(255) NOT NULL,
    "customerPhoneNumber" VARCHAR(255),
    "status" "EnumDeliveryStatus" NOT NULL DEFAULT 'CREATED',
    "customerNotes" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "courierNotes" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "items" JSON[] DEFAULT ARRAY[]::JSON[],
    "undeliverableAction" VARCHAR(255),
    "undeliverableReason" VARCHAR(255),
    "currencyCode" VARCHAR(255) NOT NULL,
    "totalCharge" DOUBLE PRECISION NOT NULL,
    "fees" DOUBLE PRECISION NOT NULL,
    "pay" DOUBLE PRECISION NOT NULL,
    "tips" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalCompensation" DOUBLE PRECISION NOT NULL,
    "deliveryTime" TIMESTAMPTZ(6) NOT NULL,
    "deliveryTypes" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "pickupTypes" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "imageType" VARCHAR(255),
    "imageName" VARCHAR(255),
    "imageData" BYTEA,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courierId" TEXT,
    "merchantId" TEXT,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryEvent" (
    "id" TEXT NOT NULL,
    "transitionSuccessful" BOOLEAN NOT NULL,
    "type" "EnumDeliveryEventType" NOT NULL,
    "actor" "EnumEventActor" NOT NULL,
    "eventSource" "EnumDeliveryEventSource" NOT NULL,
    "oldStatus" "EnumDeliveryStatus",
    "newStatus" "EnumDeliveryStatus",
    "message" TEXT,
    "deliveryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeliveryEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeliveryQuote" ADD CONSTRAINT "DeliveryQuote_pickupLocationId_fkey" FOREIGN KEY ("pickupLocationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryQuote" ADD CONSTRAINT "DeliveryQuote_dropoffLocationId_fkey" FOREIGN KEY ("dropoffLocationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryQuote" ADD CONSTRAINT "DeliveryQuote_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryQuote" ADD CONSTRAINT "DeliveryQuote_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Delivery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryLocation" ADD CONSTRAINT "DeliveryLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryLocation" ADD CONSTRAINT "DeliveryLocation_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Delivery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "Courier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryEvent" ADD CONSTRAINT "DeliveryEvent_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Delivery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourierNote" ADD CONSTRAINT "CourierNote_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Delivery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Delivery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

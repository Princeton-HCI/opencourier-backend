/*
  Warnings:

  - The values [REJECTED,PREPARED,FAILED_TO_CREATE] on the enum `EnumDeliveryEventType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EnumDeliveryEventType_new" AS ENUM ('CREATED', 'CONFIRMED', 'DISPATCHED', 'CANCELED', 'FULFILLED', 'DROPPED_OFF', 'PICKED_UP', 'FAILED', 'PAYMENT_FAILED');
ALTER TABLE "DeliveryEvent" ALTER COLUMN "type" TYPE "EnumDeliveryEventType_new" USING ("type"::text::"EnumDeliveryEventType_new");
ALTER TYPE "EnumDeliveryEventType" RENAME TO "EnumDeliveryEventType_old";
ALTER TYPE "EnumDeliveryEventType_new" RENAME TO "EnumDeliveryEventType";
DROP TYPE "EnumDeliveryEventType_old";
COMMIT;

-- AlterEnum
ALTER TYPE "EnumDeliveryStatus" ADD VALUE 'FAILED';

-- AlterTable
ALTER TABLE "Merchant" ADD COLUMN     "webhookUrl" VARCHAR(255);

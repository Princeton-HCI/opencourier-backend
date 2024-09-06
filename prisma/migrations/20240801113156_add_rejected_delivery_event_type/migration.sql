/*
  Warnings:

  - The values [PAYMENT_FAILED] on the enum `EnumDeliveryEventType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EnumDeliveryEventType_new" AS ENUM ('CREATED', 'CONFIRMED', 'ACCEPTED', 'REJECTED', 'DISPATCHED', 'CANCELED', 'FULFILLED', 'DROPPED_OFF', 'PICKED_UP', 'FAILED');
ALTER TABLE "DeliveryEvent" ALTER COLUMN "type" TYPE "EnumDeliveryEventType_new" USING ("type"::text::"EnumDeliveryEventType_new");
ALTER TYPE "EnumDeliveryEventType" RENAME TO "EnumDeliveryEventType_old";
ALTER TYPE "EnumDeliveryEventType_new" RENAME TO "EnumDeliveryEventType";
DROP TYPE "EnumDeliveryEventType_old";
COMMIT;

-- AlterEnum
ALTER TYPE "EnumDeliveryStatus" ADD VALUE 'ACCEPTED';

/*
  Warnings:

  - The values [OPENDELI] on the enum `EnumDeliveryEventSource` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EnumDeliveryEventSource_new" AS ENUM ('OPENCOURIER', 'PARTNER_APP');
ALTER TABLE "DeliveryEvent" ALTER COLUMN "eventSource" TYPE "EnumDeliveryEventSource_new" USING ("eventSource"::text::"EnumDeliveryEventSource_new");
ALTER TYPE "EnumDeliveryEventSource" RENAME TO "EnumDeliveryEventSource_old";
ALTER TYPE "EnumDeliveryEventSource_new" RENAME TO "EnumDeliveryEventSource";
DROP TYPE "EnumDeliveryEventSource_old";
COMMIT;

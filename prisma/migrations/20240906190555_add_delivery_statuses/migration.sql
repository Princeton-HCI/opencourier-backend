-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EnumDeliveryEventType" ADD VALUE 'ARRIVED_AT_PICKUP_LOCATION';
ALTER TYPE "EnumDeliveryEventType" ADD VALUE 'ARRIVED_AT_DROPOFF_LOCATION';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EnumDeliveryStatus" ADD VALUE 'COURIER_ARRIVED_AT_PICKUP_LOCATION';
ALTER TYPE "EnumDeliveryStatus" ADD VALUE 'COURIER_ARRIVED_AT_DROPOFF_LOCATION';

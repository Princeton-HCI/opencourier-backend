-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "matchedCourierId" TEXT,
ADD COLUMN     "rejectedByCouriers" TEXT[] DEFAULT ARRAY[]::TEXT[];

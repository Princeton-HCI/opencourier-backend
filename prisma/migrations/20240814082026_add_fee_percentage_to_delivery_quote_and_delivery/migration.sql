-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "feePercentage" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "DeliveryQuote" ADD COLUMN     "feePercentage" DOUBLE PRECISION NOT NULL DEFAULT 0;

/*
  Warnings:

  - Added the required column `quoteRangeFrom` to the `DeliveryQuote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quoteRangeTo` to the `DeliveryQuote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DeliveryQuote" ADD COLUMN     "quoteRangeFrom" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quoteRangeTo" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "quote" DROP NOT NULL;

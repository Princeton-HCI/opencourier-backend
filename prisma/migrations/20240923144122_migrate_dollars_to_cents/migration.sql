/*
  Warnings:

  - You are about to alter the column `pay` on the `Delivery` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `tips` on the `Delivery` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `totalCompensation` on the `Delivery` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `fee` on the `Delivery` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `totalCost` on the `Delivery` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `orderTotalValue` on the `DeliveryQuote` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `quoteRangeFrom` on the `DeliveryQuote` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `quoteRangeTo` on the `DeliveryQuote` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `amount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Delivery" ALTER COLUMN "pay" SET DATA TYPE INTEGER,
ALTER COLUMN "tips" SET DEFAULT 0,
ALTER COLUMN "tips" SET DATA TYPE INTEGER,
ALTER COLUMN "totalCompensation" SET DATA TYPE INTEGER,
ALTER COLUMN "fee" SET DATA TYPE INTEGER,
ALTER COLUMN "totalCost" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "DeliveryQuote" ALTER COLUMN "orderTotalValue" SET DATA TYPE INTEGER,
ALTER COLUMN "quoteRangeFrom" SET DATA TYPE INTEGER,
ALTER COLUMN "quoteRangeTo" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "Payment" ALTER COLUMN "amount" SET DATA TYPE INTEGER;

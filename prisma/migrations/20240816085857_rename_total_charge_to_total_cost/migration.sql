/*
  Warnings:

  - You are about to drop the column `totalCharge` on the `Delivery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "totalCharge",
ADD COLUMN     "totalCost" DOUBLE PRECISION;

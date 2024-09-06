/*
  Warnings:

  - A unique constraint covering the columns `[idempotencyKey,merchantId]` on the table `Delivery` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Delivery_idempotencyKey_key";

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_idempotencyKey_merchantId_key" ON "Delivery"("idempotencyKey", "merchantId");

/*
  Warnings:

  - You are about to drop the `Orderlocation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Orderlocation" DROP CONSTRAINT "Orderlocation_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Orderlocation" DROP CONSTRAINT "Orderlocation_orderId_fkey";

-- DropTable
DROP TABLE "Orderlocation";

-- CreateTable
CREATE TABLE "OrderLocation" (
    "locationType" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,

    CONSTRAINT "OrderLocation_pkey" PRIMARY KEY ("orderId","locationId")
);

-- AddForeignKey
ALTER TABLE "OrderLocation" ADD CONSTRAINT "OrderLocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLocation" ADD CONSTRAINT "OrderLocation_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

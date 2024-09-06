/*
  Warnings:

  - You are about to drop the `CourierNote` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EnumLocationNoteActor" AS ENUM ('COURIER', 'ADMIN', 'PARTNER');

-- CreateEnum
CREATE TYPE "EnumLocationNoteReactionType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- DropForeignKey
ALTER TABLE "CourierNote" DROP CONSTRAINT "CourierNote_courierId_fkey";

-- DropForeignKey
ALTER TABLE "CourierNote" DROP CONSTRAINT "CourierNote_deliveryId_fkey";

-- DropForeignKey
ALTER TABLE "CourierNote" DROP CONSTRAINT "CourierNote_locationId_fkey";

-- DropTable
DROP TABLE "CourierNote";

-- CreateTable
CREATE TABLE "LocationNote" (
    "id" TEXT NOT NULL,
    "note" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "actor" "EnumLocationNoteActor" NOT NULL,
    "locationId" TEXT,
    "deliveryId" TEXT,
    "courierId" TEXT,

    CONSTRAINT "LocationNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationNoteReaction" (
    "id" TEXT NOT NULL,
    "reaction" "EnumLocationNoteReactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "locationNoteId" TEXT NOT NULL,
    "courierId" TEXT NOT NULL,

    CONSTRAINT "LocationNoteReaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LocationNote" ADD CONSTRAINT "LocationNote_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationNote" ADD CONSTRAINT "LocationNote_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Delivery"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationNote" ADD CONSTRAINT "LocationNote_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "Courier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationNoteReaction" ADD CONSTRAINT "LocationNoteReaction_locationNoteId_fkey" FOREIGN KEY ("locationNoteId") REFERENCES "LocationNote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationNoteReaction" ADD CONSTRAINT "LocationNoteReaction_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "Courier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

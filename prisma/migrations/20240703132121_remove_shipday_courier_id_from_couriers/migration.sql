/*
  Warnings:

  - You are about to drop the column `shipdayCourierId` on the `Courier` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Courier_shipdayCourierId_key";

-- AlterTable
ALTER TABLE "Courier" DROP COLUMN "shipdayCourierId";

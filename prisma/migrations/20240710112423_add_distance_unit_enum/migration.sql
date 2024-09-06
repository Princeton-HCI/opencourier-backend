/*
  Warnings:

  - The `distanceUnit` column on the `DeliveryQuote` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EnumDistanceUnit" AS ENUM ('KILOMETERS', 'MILES');

-- AlterTable
ALTER TABLE "DeliveryQuote" DROP COLUMN "distanceUnit",
ADD COLUMN     "distanceUnit" "EnumDistanceUnit" NOT NULL DEFAULT 'MILES';

/*
  Warnings:

  - The `countryCode` column on the `Location` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "EnumCountryCode" AS ENUM ('US');

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "countryCode",
ADD COLUMN     "countryCode" "EnumCountryCode" NOT NULL DEFAULT 'US';

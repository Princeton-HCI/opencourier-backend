/*
  Warnings:

  - You are about to drop the column `postCode` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Location" DROP COLUMN "postCode",
ADD COLUMN     "zipCode" VARCHAR(255);

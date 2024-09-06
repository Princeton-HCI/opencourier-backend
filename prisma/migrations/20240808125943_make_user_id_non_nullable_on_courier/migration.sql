/*
  Warnings:

  - Made the column `userId` on table `Courier` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Courier" ALTER COLUMN "userId" SET NOT NULL;

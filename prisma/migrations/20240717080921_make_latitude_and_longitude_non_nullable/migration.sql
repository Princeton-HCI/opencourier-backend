/*
  Warnings:

  - Made the column `longitude` on table `Location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `latitude` on table `Location` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "longitude" SET NOT NULL,
ALTER COLUMN "latitude" SET NOT NULL;

/*
  Warnings:

  - Added the required column `dropoffEta` to the `Delivery` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Delivery" ADD COLUMN     "dropoffEta" TIMESTAMPTZ(6) NOT NULL;

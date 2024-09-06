/*
  Warnings:

  - You are about to drop the column `email` on the `Courier` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Courier` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Courier_email_key";

-- AlterTable
ALTER TABLE "Courier" DROP COLUMN "email",
DROP COLUMN "password";

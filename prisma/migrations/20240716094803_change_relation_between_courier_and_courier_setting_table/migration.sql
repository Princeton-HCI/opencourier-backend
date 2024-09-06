/*
  Warnings:

  - A unique constraint covering the columns `[courierId]` on the table `CourierSetting` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courierSettingId` to the `Courier` table without a default value. This is not possible if the table is not empty.
  - Made the column `courierId` on table `CourierSetting` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Courier" ADD COLUMN     "courierSettingId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CourierSetting" ALTER COLUMN "courierId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CourierSetting_courierId_key" ON "CourierSetting"("courierId");

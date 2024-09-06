/*
  Warnings:

  - You are about to drop the `Setting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Setting" DROP CONSTRAINT "Setting_courierId_fkey";

-- DropTable
DROP TABLE "Setting";

-- CreateTable
CREATE TABLE "CourierSetting" (
    "id" TEXT NOT NULL,
    "deliveryPolygon" geometry,
    "vehicleType" "EnumSettingVehicleType",
    "preferredAreas" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "shiftAvailability" JSON DEFAULT '{"sunday":[],"monday":[],"tuesday":[],"wednesday":[],"thursday":[],"friday":[],"saturday":[]}',
    "orderPreferences" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "foodPreferences" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "earningGoals" JSON,
    "deliverySpeed" "EnumSettingDeliverySpeed" DEFAULT 'REGULAR',
    "restaurantTypes" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "cuisineTypes" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "preferredRestaurantPartners" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "dietaryRestrictions" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "payRate" JSON,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "courierId" TEXT,

    CONSTRAINT "CourierSetting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourierSetting" ADD CONSTRAINT "CourierSetting_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "Courier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

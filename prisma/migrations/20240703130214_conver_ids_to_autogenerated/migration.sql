/*
  Warnings:

  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Courier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Earning` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Merchant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Orderlocation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Payout` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Refund` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Setting` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StripePaymentData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Transfer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_courierId_fkey";

-- DropForeignKey
ALTER TABLE "Courier" DROP CONSTRAINT "Courier_userId_fkey";

-- DropForeignKey
ALTER TABLE "Earning" DROP CONSTRAINT "Earning_courierId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_courierId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "OrderEvent" DROP CONSTRAINT "OrderEvent_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Orderlocation" DROP CONSTRAINT "Orderlocation_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Orderlocation" DROP CONSTRAINT "Orderlocation_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- DropForeignKey
ALTER TABLE "Payout" DROP CONSTRAINT "Payout_courierId_fkey";

-- DropForeignKey
ALTER TABLE "Payout" DROP CONSTRAINT "Payout_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "Refund" DROP CONSTRAINT "Refund_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "Setting" DROP CONSTRAINT "Setting_courierId_fkey";

-- DropForeignKey
ALTER TABLE "StripePaymentData" DROP CONSTRAINT "StripePaymentData_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_courierId_fkey";

-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_paymentId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "likers" SET DATA TYPE TEXT[],
ALTER COLUMN "commentableId" SET DATA TYPE TEXT,
ALTER COLUMN "courierId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Courier" DROP CONSTRAINT "Courier_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "rejectedOffers" SET DATA TYPE TEXT[],
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Courier_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Earning" DROP CONSTRAINT "Earning_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "courierId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Earning_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Location" DROP CONSTRAINT "Location_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Location_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Merchant" DROP CONSTRAINT "Merchant_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Order" DROP CONSTRAINT "Order_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "courierId" SET DATA TYPE TEXT,
ALTER COLUMN "merchantId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Order_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "OrderEvent" ALTER COLUMN "orderId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Orderlocation" DROP CONSTRAINT "Orderlocation_pkey",
ALTER COLUMN "orderId" SET DATA TYPE TEXT,
ALTER COLUMN "locationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Orderlocation_pkey" PRIMARY KEY ("orderId", "locationId");

-- AlterTable
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "orderId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Payout" DROP CONSTRAINT "Payout_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "paymentId" SET DATA TYPE TEXT,
ALTER COLUMN "courierId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Payout_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Refund" DROP CONSTRAINT "Refund_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "paymentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Refund_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Setting" DROP CONSTRAINT "Setting_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "courierId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Setting_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StripePaymentData" DROP CONSTRAINT "StripePaymentData_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "paymentId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StripePaymentData_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "paymentId" SET DATA TYPE TEXT,
ALTER COLUMN "courierId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "Courier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courier" ADD CONSTRAINT "Courier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Earning" ADD CONSTRAINT "Earning_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "Courier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orderlocation" ADD CONSTRAINT "Orderlocation_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orderlocation" ADD CONSTRAINT "Orderlocation_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "Courier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderEvent" ADD CONSTRAINT "OrderEvent_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Setting" ADD CONSTRAINT "Setting_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "Courier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "Courier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripePaymentData" ADD CONSTRAINT "StripePaymentData_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transfer" ADD CONSTRAINT "Transfer_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "Courier"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Refund" ADD CONSTRAINT "Refund_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

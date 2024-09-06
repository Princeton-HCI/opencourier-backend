-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateEnum
CREATE TYPE "EnumCourierOrderSetting" AS ENUM ('AUTO_ACCEPT', 'AUTO_REJECT', 'MANUAL');

-- CreateEnum
CREATE TYPE "EnumCourierStatus" AS ENUM ('ONLINE', 'OFFLINE', 'LAST_CALL');

-- CreateEnum
CREATE TYPE "EnumOrderStatus" AS ENUM ('CREATED', 'DISPATCHED', 'PICKED_UP', 'DROPPED_OFF', 'CANCELED');

-- CreateEnum
CREATE TYPE "EnumSettingDeliverySpeed" AS ENUM ('REGULAR', 'RUSH');

-- CreateEnum
CREATE TYPE "EnumSettingVehicleType" AS ENUM ('BICYCLE', 'MOTORCYCLE', 'CAR', 'SCOOTER', 'ON_FOOT');

-- CreateEnum
CREATE TYPE "EnumUserRole" AS ENUM ('ADMIN', 'COURIER');

-- CreateEnum
CREATE TYPE "EnumPaymentStatus" AS ENUM ('CANCELED', 'REQUIRES_CONFIRMATION', 'REQUIRES_CAPTURE', 'PROCESSING', 'REQUIRES_ACTION', 'REQUIRES_PAYMENT_METHOD', 'SUCCEEDED');

-- CreateEnum
CREATE TYPE "EnumRefundReason" AS ENUM ('DUPLICATE', 'FRAUDULENT', 'REQUESTED_BY_CUSTOMER', 'EXPIRED_UNCAPTURED_CHARGE');

-- CreateEnum
CREATE TYPE "EnumRefundStatus" AS ENUM ('PENDING', 'REQUIRES_ACTION', 'SUCCEEDED', 'FAILED', 'CANCELED');

-- CreateEnum
CREATE TYPE "EnumPayoutStatus" AS ENUM ('PAID', 'PENDING', 'IN_TRANSIT', 'CANCELED', 'FAILED');

-- CreateEnum
CREATE TYPE "EnumStripeAccountStatus" AS ENUM ('COMPLETE', 'ENABLED', 'PENDING', 'REJECTED', 'RESTRICTED', 'ATTENTION_NEEDED');

-- CreateEnum
CREATE TYPE "EnumPaymentProvider" AS ENUM ('STRIPE');

-- CreateEnum
CREATE TYPE "EnumOrderEventType" AS ENUM ('CREATED', 'CONFIRMED', 'CANCELED', 'REJECTED', 'FULFILLED', 'PAYMENT_FAILED', 'PREPARED', 'PICKED_UP', 'FAILED_TO_CREATE', 'FAILED');

-- CreateEnum
CREATE TYPE "EnumEventActor" AS ENUM ('COURIER', 'ADMIN');

-- CreateEnum
CREATE TYPE "EnumOrderEventSource" AS ENUM ('OPENDELLI');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "role" "EnumUserRole"[],
    "username" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" UUID NOT NULL,
    "text" VARCHAR(255),
    "likes" INTEGER DEFAULT 0,
    "likers" UUID[] DEFAULT ARRAY[]::UUID[],
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "commentableId" UUID NOT NULL,
    "commentableType" VARCHAR(255) NOT NULL,
    "courierId" UUID,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courier" (
    "id" UUID NOT NULL,
    "node_uri" VARCHAR(255) DEFAULT 'https://localhost',
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(255),
    "status" "EnumCourierStatus" NOT NULL DEFAULT 'OFFLINE',
    "orderSetting" "EnumCourierOrderSetting" NOT NULL DEFAULT 'MANUAL',
    "currentLocation" geometry,
    "rejectedOffers" UUID[] DEFAULT ARRAY[]::UUID[],
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "userId" UUID,
    "shipdayCourierId" TEXT,
    "stripeAccountId" TEXT NOT NULL,
    "stripeAccountStatus" "EnumStripeAccountStatus" NOT NULL DEFAULT 'REJECTED',

    CONSTRAINT "Courier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Earning" (
    "id" UUID NOT NULL,
    "total" INTEGER NOT NULL,
    "pending" INTEGER NOT NULL,
    "received" INTEGER NOT NULL,
    "payoutMethod" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "courierId" UUID,

    CONSTRAINT "Earning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" UUID NOT NULL,
    "addressLine1" VARCHAR(255),
    "addressLine2" VARCHAR(255),
    "city" VARCHAR(255),
    "state" VARCHAR(255),
    "street" VARCHAR(255),
    "postCode" VARCHAR(255),
    "countryCode" VARCHAR(255),
    "stateCode" VARCHAR(255),
    "houseNumber" VARCHAR(255),
    "longitude" DOUBLE PRECISION,
    "latitude" DOUBLE PRECISION,
    "formattedAddress" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6),
    "updatedAt" TIMESTAMPTZ(6),

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Merchant" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "logo" VARCHAR(255),
    "phoneNumber" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orderlocation" (
    "locationType" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "orderId" UUID NOT NULL,
    "locationId" UUID NOT NULL,

    CONSTRAINT "Orderlocation_pkey" PRIMARY KEY ("orderId","locationId")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL,
    "customerName" VARCHAR(255) NOT NULL,
    "customerPhoneNumber" VARCHAR(255),
    "status" "EnumOrderStatus" NOT NULL DEFAULT 'CREATED',
    "customerNotes" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "courierNotes" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "items" JSON[] DEFAULT ARRAY[]::JSON[],
    "undeliverableAction" VARCHAR(255),
    "undeliverableReason" VARCHAR(255),
    "currencyCode" VARCHAR(255) NOT NULL,
    "totalCharge" DOUBLE PRECISION NOT NULL,
    "fees" DOUBLE PRECISION NOT NULL,
    "pay" DOUBLE PRECISION NOT NULL,
    "tips" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalCompensation" DOUBLE PRECISION NOT NULL,
    "deliveryTime" TIMESTAMPTZ(6) NOT NULL,
    "deliveryTypes" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "pickupTypes" VARCHAR(255)[] DEFAULT (ARRAY[]::character varying[])::character varying(255)[],
    "imageType" VARCHAR(255),
    "imageName" VARCHAR(255),
    "imageData" BYTEA,
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "courierId" UUID,
    "merchantId" UUID,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderEvent" (
    "id" TEXT NOT NULL,
    "transitionSuccessful" BOOLEAN NOT NULL,
    "type" "EnumOrderEventType" NOT NULL,
    "actor" "EnumEventActor" NOT NULL,
    "eventSource" "EnumOrderEventSource" NOT NULL,
    "oldStatus" "EnumOrderStatus",
    "newStatus" "EnumOrderStatus",
    "message" TEXT,
    "orderId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrderEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Setting" (
    "id" UUID NOT NULL,
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
    "createdAt" TIMESTAMPTZ(6) NOT NULL,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL,
    "courierId" UUID,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payout" (
    "id" UUID NOT NULL,
    "amount" INTEGER NOT NULL,
    "arrivalDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "statementDescriptor" TEXT,
    "status" "EnumPayoutStatus" NOT NULL,
    "paymentId" UUID NOT NULL,
    "courierId" UUID,

    CONSTRAINT "Payout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "capturedAt" TIMESTAMP(3),
    "canceledAt" TIMESTAMP(3),
    "amount" DECIMAL(65,30) NOT NULL,
    "status" "EnumPaymentStatus" NOT NULL DEFAULT 'REQUIRES_CONFIRMATION',
    "orderId" UUID NOT NULL,
    "provider" "EnumPaymentProvider" NOT NULL DEFAULT 'STRIPE',

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripePaymentData" (
    "id" UUID NOT NULL,
    "paymentIntentId" TEXT NOT NULL,
    "paymentMethodId" TEXT NOT NULL,
    "latestChargeId" TEXT,
    "paymentId" UUID,

    CONSTRAINT "StripePaymentData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transfer" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "transferId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "amountReversed" INTEGER NOT NULL,
    "destination" TEXT NOT NULL,
    "destinationPayment" TEXT,
    "reversed" BOOLEAN NOT NULL DEFAULT false,
    "paymentId" UUID,
    "courierId" UUID,

    CONSTRAINT "Transfer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Refund" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "refundId" TEXT,
    "amount" INTEGER NOT NULL,
    "description" TEXT,
    "reason" "EnumRefundReason",
    "status" "EnumRefundStatus",
    "paymentId" UUID NOT NULL,

    CONSTRAINT "Refund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Config" (
    "key" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Courier_email_key" ON "Courier"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Courier_phoneNumber_key" ON "Courier"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Courier_userId_key" ON "Courier"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Courier_shipdayCourierId_key" ON "Courier"("shipdayCourierId");

-- CreateIndex
CREATE UNIQUE INDEX "Courier_stripeAccountId_key" ON "Courier"("stripeAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "StripePaymentData_paymentIntentId_key" ON "StripePaymentData"("paymentIntentId");

-- CreateIndex
CREATE UNIQUE INDEX "StripePaymentData_latestChargeId_key" ON "StripePaymentData"("latestChargeId");

-- CreateIndex
CREATE UNIQUE INDEX "StripePaymentData_paymentId_key" ON "StripePaymentData"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Transfer_transferId_key" ON "Transfer"("transferId");

-- CreateIndex
CREATE UNIQUE INDEX "Refund_refundId_key" ON "Refund"("refundId");

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

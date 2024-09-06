-- CreateTable
CREATE TABLE "CourierNote" (
    "id" TEXT NOT NULL,
    "note" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "locationId" TEXT,
    "orderId" TEXT,
    "courierId" TEXT NOT NULL,

    CONSTRAINT "CourierNote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourierNote" ADD CONSTRAINT "CourierNote_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourierNote" ADD CONSTRAINT "CourierNote_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourierNote" ADD CONSTRAINT "CourierNote_courierId_fkey" FOREIGN KEY ("courierId") REFERENCES "Courier"("id") ON DELETE CASCADE ON UPDATE CASCADE;

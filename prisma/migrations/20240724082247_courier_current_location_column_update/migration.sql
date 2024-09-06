-- CreateIndex
CREATE INDEX "courier_location_idx" ON "Courier" USING GIST ("currentLocation");

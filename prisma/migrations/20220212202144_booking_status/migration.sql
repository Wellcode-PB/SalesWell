-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "booking_statusStatus" TEXT;

-- CreateTable
CREATE TABLE "booking_status" (
    "status" TEXT NOT NULL,

    CONSTRAINT "booking_status_pkey" PRIMARY KEY ("status")
);

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_booking_statusStatus_fkey" FOREIGN KEY ("booking_statusStatus") REFERENCES "booking_status"("status") ON DELETE SET NULL ON UPDATE CASCADE;

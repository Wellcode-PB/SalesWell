/*
  Warnings:

  - The primary key for the `booking_status` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `status` on the `booking_status` table. All the data in the column will be lost.
  - Added the required column `description` to the `booking_status` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `booking_status` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bookings" DROP CONSTRAINT "bookings_booking_statusStatus_fkey";

-- AlterTable
ALTER TABLE "booking_status" DROP CONSTRAINT "booking_status_pkey",
DROP COLUMN "status",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "booking_status_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "status_id" TEXT;

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "booking_status"("id") ON DELETE SET NULL ON UPDATE CASCADE;

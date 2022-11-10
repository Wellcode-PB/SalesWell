/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `prospects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `prospects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prospects" ADD COLUMN     "fb" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "prospects_phone_key" ON "prospects"("phone");

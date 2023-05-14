/*
  Warnings:

  - You are about to drop the `prospects_notes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "prospects_notes";

-- CreateTable
CREATE TABLE "notes" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "prospectId" INTEGER NOT NULL,

    CONSTRAINT "notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notes" ADD CONSTRAINT "notes_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "prospects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

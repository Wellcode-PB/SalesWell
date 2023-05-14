-- CreateTable
CREATE TABLE "prospects_notes" (
    "id" SERIAL NOT NULL,
    "prospectId" INTEGER NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "prospects_notes_pkey" PRIMARY KEY ("id")
);

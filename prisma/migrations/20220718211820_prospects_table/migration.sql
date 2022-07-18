-- CreateTable
CREATE TABLE "prospects" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "mail" TEXT NOT NULL,

    CONSTRAINT "prospects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "prospects_mail_key" ON "prospects"("mail");

-- AddForeignKey
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_mail_fkey" FOREIGN KEY ("mail") REFERENCES "prospects"("mail") ON DELETE SET NULL ON UPDATE CASCADE;

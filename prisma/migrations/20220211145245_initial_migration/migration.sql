-- CreateTable
CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "phone" TEXT,
    "mail" TEXT,
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "fb" TEXT,
    "createdat" TIMESTAMP(6),
    "startsat" TIMESTAMP(6),
    "endsat" TIMESTAMP(6),
    "tentative" TEXT,
    "cancelled" TEXT,
    "timezone" TEXT,
    "accountid" TEXT,
    "profileid" TEXT,

    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

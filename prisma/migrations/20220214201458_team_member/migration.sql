-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "team_members" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "last_login" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT E'USER',
    "account_state" TEXT NOT NULL DEFAULT 'ENABLED',

    CONSTRAINT "team_members_pkey" PRIMARY KEY ("id")
);
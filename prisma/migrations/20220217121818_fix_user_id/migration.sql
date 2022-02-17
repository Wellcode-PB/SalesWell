/*
  Warnings:

  - The primary key for the `team_members` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `team_members` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "team_members_pkey" PRIMARY KEY ("mail");

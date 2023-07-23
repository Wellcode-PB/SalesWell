/*
  Warnings:

  - You are about to drop the column `authorId` on the `tags` table. All the data in the column will be lost.
  - Added the required column `content` to the `tags` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prospectId` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_authorId_fkey";

-- AlterTable
ALTER TABLE "tags" DROP COLUMN "authorId",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "prospectId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_prospectId_fkey" FOREIGN KEY ("prospectId") REFERENCES "prospects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

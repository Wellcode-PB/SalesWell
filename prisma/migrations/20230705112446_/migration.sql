-- CreateTable
CREATE TABLE "tags" (
    "id" SERIAL NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "prospects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

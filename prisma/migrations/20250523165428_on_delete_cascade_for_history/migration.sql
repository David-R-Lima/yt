-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_songId_fkey";

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

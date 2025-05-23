-- DropForeignKey
ALTER TABLE "PlaylistSongs" DROP CONSTRAINT "PlaylistSongs_songId_fkey";

-- AddForeignKey
ALTER TABLE "PlaylistSongs" ADD CONSTRAINT "PlaylistSongs_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Songs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

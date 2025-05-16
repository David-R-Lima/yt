/*
  Warnings:

  - You are about to drop the column `url` on the `Songs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Songs" DROP COLUMN "url",
ADD COLUMN     "localUrl" TEXT,
ADD COLUMN     "youtubeUrl" TEXT;

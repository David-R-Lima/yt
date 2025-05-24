/*
  Warnings:

  - You are about to drop the column `publicToken` on the `Youtube` table. All the data in the column will be lost.
  - Added the required column `accessToken` to the `Youtube` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Youtube" DROP COLUMN "publicToken",
ADD COLUMN     "accessToken" TEXT NOT NULL;

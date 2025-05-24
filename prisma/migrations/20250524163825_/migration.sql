-- AlterTable
ALTER TABLE "Youtube" ALTER COLUMN "refreshToken" DROP NOT NULL,
ALTER COLUMN "accessToken" DROP NOT NULL,
ALTER COLUMN "expirationDate" DROP NOT NULL;

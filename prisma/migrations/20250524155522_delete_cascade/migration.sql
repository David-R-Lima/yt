-- CreateTable
CREATE TABLE "Youtube" (
    "id" TEXT NOT NULL,
    "publicToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "expirationDate" INTEGER NOT NULL,

    CONSTRAINT "Youtube_pkey" PRIMARY KEY ("id")
);

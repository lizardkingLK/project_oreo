-- CreateTable
CREATE TABLE "Presence" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Presence_pkey" PRIMARY KEY ("id")
);

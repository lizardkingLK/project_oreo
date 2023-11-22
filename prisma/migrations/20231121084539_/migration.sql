/*
  Warnings:

  - Added the required column `createdAt` to the `GroupMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `MessageReader` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupMember" ADD COLUMN     "createdAt" TEXT NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "MessageReader" ADD COLUMN     "createdAt" TEXT NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 1;

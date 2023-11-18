/*
  Warnings:

  - You are about to drop the column `createdFor` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `groupImageUrl` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `groupName` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `groupType` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `referenceId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - Added the required column `messageId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "createdFor",
DROP COLUMN "groupImageUrl",
DROP COLUMN "groupName",
DROP COLUMN "groupType",
DROP COLUMN "referenceId",
DROP COLUMN "timestamp",
DROP COLUMN "userId",
ADD COLUMN     "messageId" TEXT NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TEXT,
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "readBy" SET DATA TYPE TEXT[];

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "groupId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "displayUrl" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

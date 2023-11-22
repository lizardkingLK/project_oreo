/*
  Warnings:

  - You are about to drop the column `members` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `createdFor` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `groupImageUrl` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `groupName` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `groupType` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `messageType` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `readBy` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `referenceId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[groupId]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[messageId]` on the table `Message` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdBy` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `messageId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Made the column `content` on table `Message` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "members",
DROP COLUMN "ownerId",
ADD COLUMN     "createdBy" TEXT NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "displayUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "createdFor",
DROP COLUMN "groupImageUrl",
DROP COLUMN "groupName",
DROP COLUMN "groupType",
DROP COLUMN "messageType",
DROP COLUMN "readBy",
DROP COLUMN "referenceId",
DROP COLUMN "timestamp",
DROP COLUMN "userId",
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "messageId" TEXT NOT NULL,
ADD COLUMN     "type" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT,
ALTER COLUMN "createdAt" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "GroupMember" (
    "id" SERIAL NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "GroupMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MessageReader" (
    "id" SERIAL NOT NULL,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "MessageReader_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Group_groupId_key" ON "Group"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Message_messageId_key" ON "Message"("messageId");

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("groupId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MessageReader" ADD CONSTRAINT "MessageReader_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Message"("messageId") ON DELETE RESTRICT ON UPDATE CASCADE;

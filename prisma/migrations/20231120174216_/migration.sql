/*
  Warnings:

  - You are about to drop the column `messageId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Message` table. All the data in the column will be lost.
  - The `createdAt` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `readBy` column on the `Message` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `referenceId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "messageId",
DROP COLUMN "ownerId",
ADD COLUMN     "createdFor" TEXT[],
ADD COLUMN     "groupImageUrl" TEXT,
ADD COLUMN     "groupName" TEXT,
ADD COLUMN     "groupType" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "referenceId" TEXT NOT NULL,
ADD COLUMN     "timestamp" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "content" DROP NOT NULL,
DROP COLUMN "readBy",
ADD COLUMN     "readBy" JSONB[];

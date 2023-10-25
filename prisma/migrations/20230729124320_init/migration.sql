/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invitation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdBy` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GroupUser" DROP CONSTRAINT "GroupUser_groupId_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "ownerId",
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "createdFor" TEXT[],
ADD COLUMN     "groupId" TEXT NOT NULL,
ADD COLUMN     "groupType" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "messageType" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "GroupUser";

-- DropTable
DROP TABLE "Invitation";

/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Message` table. All the data in the column will be lost.
  - Added the required column `groupImageUrl` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupName` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "createdBy",
ADD COLUMN     "groupImageUrl" TEXT NOT NULL,
ADD COLUMN     "groupName" TEXT NOT NULL;

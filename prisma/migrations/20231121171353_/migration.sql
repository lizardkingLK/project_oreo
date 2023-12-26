/*
  Warnings:

  - Added the required column `memberId` to the `GroupMember` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupMember" ADD COLUMN     "memberId" TEXT NOT NULL;

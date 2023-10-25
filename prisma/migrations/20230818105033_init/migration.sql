/*
  Warnings:

  - You are about to alter the column `referenceId` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "referenceId" SET DATA TYPE INTEGER;

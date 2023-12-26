/*
  Warnings:

  - You are about to drop the `MessageReader` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MessageReader" DROP CONSTRAINT "MessageReader_messageId_fkey";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "readers" TEXT[];

-- DropTable
DROP TABLE "MessageReader";

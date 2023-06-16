/*
  Warnings:

  - A unique constraint covering the columns `[web3_address]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "web3_address" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "User_web3_address_key" ON "User"("web3_address");

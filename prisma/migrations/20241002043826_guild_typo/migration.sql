/*
  Warnings:

  - You are about to drop the column `djRole` on the `Guild` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guild" DROP COLUMN "djRole",
ADD COLUMN     "djRoles" TEXT[];

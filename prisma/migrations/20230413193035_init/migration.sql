/*
  Warnings:

  - Added the required column `owner` to the `TaskBoard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskBoard" ADD COLUMN     "owner" TEXT NOT NULL;

/*
  Warnings:

  - Made the column `semester` on table `Discipline` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Discipline" ALTER COLUMN "semester" SET NOT NULL;

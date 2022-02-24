/*
  Warnings:

  - Made the column `written_score` on table `Evaluation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `comments` on table `Evaluation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Evaluation` MODIFY `written_score` DOUBLE NOT NULL,
    MODIFY `comments` VARCHAR(191) NOT NULL;

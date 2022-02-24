/*
  Warnings:

  - You are about to drop the column `comments` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `final_result` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `paid` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `written_score` on the `Evaluation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Evaluation` DROP COLUMN `comments`,
    DROP COLUMN `final_result`,
    DROP COLUMN `paid`,
    DROP COLUMN `written_score`;

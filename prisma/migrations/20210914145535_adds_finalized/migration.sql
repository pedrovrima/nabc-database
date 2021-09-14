/*
  Warnings:

  - You are about to drop the column `finalized` on the `Evaluation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Evaluation` DROP COLUMN `finalized`;

-- AlterTable
ALTER TABLE `Session` ADD COLUMN `finalized` BOOLEAN NOT NULL DEFAULT true;

/*
  Warnings:

  - You are about to drop the column `comments` on the `Evaluation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Evaluation` DROP COLUMN `comments`,
    ADD COLUMN `notes` VARCHAR(191),
    MODIFY `final_result` ENUM('Approved', 'Rejected', 'Assistant');

-- AlterTable
ALTER TABLE `Session` MODIFY `finalized` BOOLEAN NOT NULL DEFAULT false;

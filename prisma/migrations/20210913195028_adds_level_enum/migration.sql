/*
  Warnings:

  - You are about to alter the column `level` on the `Evaluation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("Evaluation_level")`.

*/
-- AlterTable
ALTER TABLE `Evaluation` MODIFY `level` ENUM('Assistant', 'Bander', 'Trainer') NOT NULL;

/*
  Warnings:

  - You are about to alter the column `final_result` on the `Evaluation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("Evaluation_final_result")`.

*/
-- AlterTable
ALTER TABLE `Evaluation` MODIFY `final_result` ENUM('Approved', 'Rejected') NOT NULL;

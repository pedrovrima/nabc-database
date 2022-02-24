-- AlterTable
ALTER TABLE `Evaluation` ADD COLUMN `comments` VARCHAR(191),
    ADD COLUMN `final_result` ENUM('Approved', 'Rejected'),
    ADD COLUMN `paid` BOOLEAN,
    ADD COLUMN `written_score` DOUBLE;

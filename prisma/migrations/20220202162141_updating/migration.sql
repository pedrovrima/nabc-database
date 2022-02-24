-- AlterTable
ALTER TABLE `Evaluation` MODIFY `final_result` ENUM('Approved', 'Rejected'),
    MODIFY `written_score` DOUBLE,
    MODIFY `comments` VARCHAR(191),
    MODIFY `paid` BOOLEAN;

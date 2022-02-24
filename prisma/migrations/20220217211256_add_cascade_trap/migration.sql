-- DropForeignKey
ALTER TABLE `EvaluationTraps` DROP FOREIGN KEY `EvaluationTraps_evaluationId_fkey`;

-- AddForeignKey
ALTER TABLE `EvaluationTraps` ADD CONSTRAINT `EvaluationTraps_evaluationId_fkey` FOREIGN KEY (`evaluationId`) REFERENCES `Evaluation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

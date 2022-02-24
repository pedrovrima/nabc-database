-- DropForeignKey
ALTER TABLE `Evaluator` DROP FOREIGN KEY `Evaluator_evaluationId_fkey`;

-- AddForeignKey
ALTER TABLE `Evaluator` ADD CONSTRAINT `Evaluator_evaluationId_fkey` FOREIGN KEY (`evaluationId`) REFERENCES `Evaluation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

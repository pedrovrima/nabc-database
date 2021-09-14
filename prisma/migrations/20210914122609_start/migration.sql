-- DropForeignKey
ALTER TABLE `Evaluation` DROP FOREIGN KEY `Evaluation_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Evaluation` DROP FOREIGN KEY `Evaluation_ibfk_2`;

-- DropForeignKey
ALTER TABLE `EvaluationTraps` DROP FOREIGN KEY `EvaluationTraps_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Evaluator` DROP FOREIGN KEY `Evaluator_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Evaluator` DROP FOREIGN KEY `Evaluator_ibfk_2`;

-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_ibfk_1`;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_chairId_fkey` FOREIGN KEY (`chairId`) REFERENCES `Bander`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluator` ADD CONSTRAINT `Evaluator_banderId_fkey` FOREIGN KEY (`banderId`) REFERENCES `Bander`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluator` ADD CONSTRAINT `Evaluator_evaluationId_fkey` FOREIGN KEY (`evaluationId`) REFERENCES `Evaluation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_banderId_fkey` FOREIGN KEY (`banderId`) REFERENCES `Bander`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Evaluation` ADD CONSTRAINT `Evaluation_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `Session`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EvaluationTraps` ADD CONSTRAINT `EvaluationTraps_evaluationId_fkey` FOREIGN KEY (`evaluationId`) REFERENCES `Evaluation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `Bander` RENAME INDEX `Bander.email_unique` TO `Bander_email_key`;

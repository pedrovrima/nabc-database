/*
  Warnings:

  - Added the required column `updatedAt` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `EvaluationTraps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Evaluator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Traps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Evaluation` ADD COLUMN     `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN     `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `EvaluationTraps` ADD COLUMN     `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN     `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Evaluator` ADD COLUMN     `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN     `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `Traps` ADD COLUMN     `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN     `updatedAt` DATETIME(3) NOT NULL;

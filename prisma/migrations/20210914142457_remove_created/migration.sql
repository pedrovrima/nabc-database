/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Bander` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Bander` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `EvaluationTraps` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `EvaluationTraps` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Evaluator` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Evaluator` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Session` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Bander` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Evaluation` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `EvaluationTraps` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Evaluator` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- AlterTable
ALTER TABLE `Session` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

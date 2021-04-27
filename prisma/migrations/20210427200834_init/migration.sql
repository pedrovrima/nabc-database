/*
  Warnings:

  - You are about to drop the column `final_score` on the `Evaluation` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `trapping_method` on the `Session` table. All the data in the column will be lost.
  - Added the required column `final_result` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxa` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Evaluation` DROP COLUMN `final_score`,
    ADD COLUMN     `final_result` VARCHAR(191) NOT NULL,
    ADD COLUMN     `taxa` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Session` DROP COLUMN `address`,
    DROP COLUMN `trapping_method`,
    ADD COLUMN     `city` VARCHAR(191) NOT NULL,
    ADD COLUMN     `state` VARCHAR(191) NOT NULL,
    ADD COLUMN     `country` VARCHAR(191) NOT NULL,
    ADD COLUMN     `organization` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `EvaluationTraps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `evaluationId` INTEGER NOT NULL,
    `trapId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Traps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EvaluationTraps` ADD FOREIGN KEY (`evaluationId`) REFERENCES `Evaluation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EvaluationTraps` ADD FOREIGN KEY (`trapId`) REFERENCES `Traps`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

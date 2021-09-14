/*
  Warnings:

  - You are about to alter the column `taxa` on the `Evaluation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("Evaluation_taxa")`.
  - You are about to drop the column `trapId` on the `EvaluationTraps` table. All the data in the column will be lost.
  - You are about to drop the `Traps` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `written_score` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comments` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paid` to the `Evaluation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trap` to the `EvaluationTraps` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `EvaluationTraps` DROP FOREIGN KEY `EvaluationTraps_ibfk_2`;

-- AlterTable
ALTER TABLE `Evaluation` ADD COLUMN     `written_score` DOUBLE NOT NULL,
    ADD COLUMN     `comments` VARCHAR(191) NOT NULL,
    ADD COLUMN     `paid` BOOLEAN NOT NULL,
    MODIFY `taxa` ENUM('Passerine', 'Shorebirds', 'Waterfowl', 'Hummingbirds', 'Raptors') NOT NULL;

-- AlterTable
ALTER TABLE `EvaluationTraps` DROP COLUMN `trapId`,
    ADD COLUMN     `trap` ENUM('Mistnet') NOT NULL;

-- DropTable
DROP TABLE `Traps`;

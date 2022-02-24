/*
  Warnings:

  - You are about to drop the column `max_raptor` on the `Bander` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Bander` DROP COLUMN `max_raptor`,
    ADD COLUMN `max_raptors` ENUM('None', 'Assistant', 'Bander', 'Trainer');

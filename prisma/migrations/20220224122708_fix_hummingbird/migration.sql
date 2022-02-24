/*
  Warnings:

  - You are about to drop the column `max_humminbirds` on the `Bander` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Bander` DROP COLUMN `max_humminbirds`,
    ADD COLUMN `max_hummingbirds` ENUM('Assistant', 'Bander', 'Trainer');

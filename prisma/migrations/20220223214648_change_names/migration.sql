/*
  Warnings:

  - You are about to drop the column `max_humminbird` on the `Bander` table. All the data in the column will be lost.
  - You are about to drop the column `max_passerine` on the `Bander` table. All the data in the column will be lost.
  - You are about to drop the column `max_shorebirds` on the `Bander` table. All the data in the column will be lost.
  - The values [Passerine] on the enum `Evaluation_taxa` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Bander` DROP COLUMN `max_humminbird`,
    DROP COLUMN `max_passerine`,
    DROP COLUMN `max_shorebird`,
    ADD COLUMN `max_humminbirds` ENUM('Assistant', 'Bander', 'Trainer'),
    ADD COLUMN `max_passerines` ENUM('Assistant', 'Bander', 'Trainer'),
    ADD COLUMN `max_shorebirds` ENUM('Assistant', 'Bander', 'Trainer');

-- AlterTable
ALTER TABLE `Evaluation` MODIFY `taxa` ENUM('Passerines', 'Shorebirds', 'Waterfowl', 'Hummingbirds', 'Raptors') NOT NULL;

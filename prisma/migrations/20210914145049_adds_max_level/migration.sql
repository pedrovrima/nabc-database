-- AlterTable
ALTER TABLE `Bander` ADD COLUMN `max_humminbird` ENUM('Assistant', 'Bander', 'Trainer'),
    ADD COLUMN `max_passerine` ENUM('Assistant', 'Bander', 'Trainer'),
    ADD COLUMN `max_raptor` ENUM('Assistant', 'Bander', 'Trainer'),
    ADD COLUMN `max_shorebird` ENUM('Assistant', 'Bander', 'Trainer'),
    ADD COLUMN `max_waterfowl` ENUM('Assistant', 'Bander', 'Trainer');

-- AlterTable
ALTER TABLE `Evaluation` ADD COLUMN `finalized` BOOLEAN NOT NULL DEFAULT true;

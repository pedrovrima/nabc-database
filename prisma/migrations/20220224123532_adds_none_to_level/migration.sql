-- AlterTable
ALTER TABLE `Bander` MODIFY `max_raptor` ENUM('None', 'Assistant', 'Bander', 'Trainer'),
    MODIFY `max_waterfowl` ENUM('None', 'Assistant', 'Bander', 'Trainer'),
    MODIFY `max_passerines` ENUM('None', 'Assistant', 'Bander', 'Trainer'),
    MODIFY `max_shorebirds` ENUM('None', 'Assistant', 'Bander', 'Trainer'),
    MODIFY `max_hummingbirds` ENUM('None', 'Assistant', 'Bander', 'Trainer');

-- AlterTable
ALTER TABLE `Evaluation` MODIFY `level` ENUM('None', 'Assistant', 'Bander', 'Trainer') NOT NULL;

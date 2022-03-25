-- AlterTable
ALTER TABLE `Bander` MODIFY `max_waterfowl` ENUM('None', 'Assistant', 'Bander', 'Trainer', 'AssistantExtraction', 'AssistantProcessing'),
    MODIFY `max_passerines` ENUM('None', 'Assistant', 'Bander', 'Trainer', 'AssistantExtraction', 'AssistantProcessing'),
    MODIFY `max_shorebirds` ENUM('None', 'Assistant', 'Bander', 'Trainer', 'AssistantExtraction', 'AssistantProcessing'),
    MODIFY `max_hummingbirds` ENUM('None', 'Assistant', 'Bander', 'Trainer', 'AssistantExtraction', 'AssistantProcessing'),
    MODIFY `max_raptors` ENUM('None', 'Assistant', 'Bander', 'Trainer', 'AssistantExtraction', 'AssistantProcessing');

-- AlterTable
ALTER TABLE `Evaluation` MODIFY `level` ENUM('None', 'Assistant', 'Bander', 'Trainer', 'AssistantExtraction', 'AssistantProcessing') NOT NULL,
    MODIFY `final_result` ENUM('Approved', 'Rejected', 'Assistant', 'AssistantExtraction', 'AssistantProcessing', 'TBD');

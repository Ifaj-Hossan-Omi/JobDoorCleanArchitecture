import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { JobLocationType } from 'src/Enums/jobLocationType.enum';
import { JobType } from 'src/Enums/jobType.enum';

export class DeallocateInterViewerRequestDTO {
    @IsUUID()
    @IsNotEmpty()
    jobId: UUID;
    @IsUUID()
    @IsNotEmpty()
    interviewerId: UUID;
}
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UUID } from 'crypto';
import { ApplicationJobStatus } from 'src/Enums/applicationJobStatus.enum';

export class ApplyJobDTO {
    @IsNotEmpty()
    jobId: UUID;
    @IsNotEmpty()
    jobSeekerId: UUID;
    @IsNotEmpty()
    status: ApplicationJobStatus;
}
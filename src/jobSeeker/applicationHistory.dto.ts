import { Matches, IsString, IsEmail, IsOptional, IsDate, IsArray, IsEnum, IsNumber, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { JobSeekerDTO } from './jobSeeker.dto';


enum ApplicationStatus {
    APPLIED = 'applied',
    VIEWED = 'viewed',
    IN_PROCESS = 'in process',
    REJECTED = 'rejected'
}

export class ApplicationHistoryDTO {
    @IsString()
    jobId: string;

    @IsDate()
    appliedOn: Date;

    @IsEnum(ApplicationStatus)
    status: string;

    @ValidateNested()
    jobSeeker: JobSeekerDTO;
}
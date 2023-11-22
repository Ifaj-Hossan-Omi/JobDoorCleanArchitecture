import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UUID } from 'crypto';
import { JobLocationType } from 'src/Enums/jobLocationType.enum';
import { JobType } from 'src/Enums/jobType.enum';

export class JobCreateRequestDTO {
    @IsString()
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    @IsEnum(JobType)
    jobType: JobType;
    @IsString()
    @IsNotEmpty()
    description: string;
    @IsNumber()
    @IsNotEmpty()
    salary: number;
    @IsNumber()
    @IsNotEmpty()
    vacancy: number;
    @IsString()
    @IsNotEmpty()
    address: string;
    @IsNotEmpty()
    @IsEnum(JobLocationType)
    JobLocationType: JobLocationType;
    jobProviderId: UUID;
}
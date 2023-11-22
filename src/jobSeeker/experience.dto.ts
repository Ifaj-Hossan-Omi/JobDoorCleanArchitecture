import { Matches, IsString, IsEmail, IsOptional, IsDate, IsArray, IsEnum, IsNumber, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { JobSeekerDTO } from './jobSeeker.dto';

export class ExperienceDTO {
    @IsString()
    companyName: string;

    @IsString()
    roleTitle: string;

    @IsDate()
    startDate: Date;

    @IsOptional()
    @IsDate()
    endDate: Date | null;

    @IsString()
    description: string;

    @ValidateNested()
    jobSeeker: JobSeekerDTO;
}
import { Matches, IsString, IsEmail, IsOptional, IsDate, IsArray, IsEnum, IsNumber, IsUrl, ValidateNested, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { JobSeekerDTO } from './jobSeeker.dto';



export class JobPreferencesDTO {
    @IsArray()
    preferredIndustries: string[];

    @IsArray()
    @IsIn(['full-time', 'part-time', 'internship', 'contract', 'temporary', 'volunteer', 'per-diem', 'other'])
    jobTypes: string[];

    @IsNumber()
    desiredSalary: number;

    @IsArray()
    locations: string[];

    @IsArray()
    @IsIn(['remote', 'on-site', 'hybrid'])
    workLocation: string;

    @ValidateNested()
    jobSeeker: JobSeekerDTO;
}
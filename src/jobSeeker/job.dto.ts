import { IsString, Matches, IsNumber, IsDate, IsIn } from 'class-validator';
import { JobSeeker } from './jobSeeker.entity';
import { ManyToMany } from 'typeorm';

export class JobDTO {
    @IsString()
    id: string;
    @IsString()
    name: string;
    @IsString()
    domain: string;
    @IsString()
    description: string;
    @IsString()
    salary: string;
    @IsString()
    location: string;
    @IsIn(['remote', 'on-site', 'hybrid'])
    workLocation: string;
    @IsString()
    company: string;
    @IsDate()
    postedDate: Date;
    @IsIn(['full-time', 'part-time', 'internship', 'contract', 'temporary', 'volunteer', 'per-diem', 'other'])
    jobPeriod: string;
}
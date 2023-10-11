import { IsString, Matches, IsNumber, IsDate, IsIn } from 'class-validator';

export class Job{
    @IsString()
    id: string;
    @IsString()
    name: string;
    @IsString()
    description: string;
    @IsNumber()
    salary: number;
    @IsString()
    location: string;
    @IsString()
    company: string;
    @IsDate()
    postedDate: Date;
    @IsIn(['Full Time', 'Part Time', 'Internship'])
    jobPeriod: string;

}
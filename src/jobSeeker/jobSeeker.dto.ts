import { Matches, IsEmail, IsString } from "class-validator";

export class JobSeeker{
    @Matches(/^[a-zA-Z0-9_-]+$/)
    username: string;
    @Matches(/^[a-zA-Z ]+$/)
    name: string;
    @IsEmail()
    email: string;
    @Matches(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)
    password: string;
    @Matches(/^[0-9]{11}$/)
    phone: string;
    @IsString()
    location: string;
    @IsString({each:true})
    skills: string[];
    @IsString({each:true})
    experience: string[];
    @IsString({each:true})
    education: string[];
    @IsString()
    resume: string;
    
    appliedJobs: string[];
}
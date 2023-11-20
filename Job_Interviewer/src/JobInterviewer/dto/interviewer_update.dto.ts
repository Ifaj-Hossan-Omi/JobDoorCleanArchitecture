import { IsEmail, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class InterviewerUpdateDTO
{
    // @IsNotEmpty()
    // uname: string;

    // @IsNotEmpty()
    // pass: string;

    // @IsNotEmpty()
    // @IsEmail()
    // mail : string;

    @IsNotEmpty()
    fname: string;

    @IsNotEmpty()
    lname : string;

    @IsNotEmpty()
    company : string;

    @IsNotEmpty()
    position : string;

    @IsNotEmpty()
    @IsNumberString()
    job_provider_id: number;
}
import { Matches, IsString, IsEmail, IsOptional, IsDate, IsArray, IsEnum, IsNumber, IsUrl, ValidateNested, isEmail, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { JobSeekerDTO } from './jobSeeker.dto';

export class userpass {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    currentPassword: string;
    @IsString()
    @Matches(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, { message: "Password must be minimum eight characters, at least one letter, one number and one special character" }) 
    newPassword: string;
}


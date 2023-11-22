import { Matches, IsString, IsEmail, IsOptional, IsDate, IsArray, IsEnum, IsNumber, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { JobSeekerDTO } from './jobSeeker.dto';

export class AddressDTO {
    @IsString()
    street: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    country: string;

    @IsString()
    postalCode: string;

    @ValidateNested()
    jobSeeker: JobSeekerDTO;
}
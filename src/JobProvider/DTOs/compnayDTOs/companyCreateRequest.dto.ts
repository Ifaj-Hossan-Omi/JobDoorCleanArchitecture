import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UUID } from 'crypto';

export class CompanyCreateRequestDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNumber()
    @IsNotEmpty()
    phoneNumber: string;
    @IsString()
    @IsNotEmpty()
    address: string;
    jobProviderId: UUID;
}
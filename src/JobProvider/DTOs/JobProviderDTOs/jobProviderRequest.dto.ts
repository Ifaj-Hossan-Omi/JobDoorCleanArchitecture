import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class JobProviderRequestDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
    profilePicture: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    username: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsString()
    @IsNotEmpty()
    company: string;
    @IsString()
    @IsNotEmpty()
    address: string;
}
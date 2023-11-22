import { Contains, IsEmail, IsNotEmpty, IsNumber, IsPositive, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class JobProviderLoginDTO {
    @IsString()
    username: string;
    @IsString()
    password: string;
}
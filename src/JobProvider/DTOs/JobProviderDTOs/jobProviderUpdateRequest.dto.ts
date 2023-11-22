import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class    JobProviderUpdateRequestDTO {
    id: UUID;
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsString()
    username: string;
    @IsString()
    password: string;
    @IsString()
    company: string;
    @IsString()
    address: string;
}
import { Matches, IsString, IsEmail, IsOptional, IsDate, IsArray, IsEnum, IsNumber, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDTO } from './address.dto';
import { ExperienceDTO } from './experience.dto';
import { JobPreferencesDTO } from './jobPreferences.dto';
import { ApplicationHistoryDTO } from './applicationHistory.dto';

enum ProfileVisibility {
    PUBLIC = 'public',
    PRIVATE = 'private',
    CONNECTIONS = 'connections'
}

export class JobSeekerDTO {
    @IsString()
    @Matches(/^[a-zA-Z0-9_-]+$/, { message: 'ID must be alphanumeric and can contain underscore and hyphen'})
    id: string;

    @IsEmail({}, { message: 'Invalid email'})
    email: string;

    @IsString()
    @Matches(/^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/, { message: "Password must be minimum eight characters, at least one letter, one number and one special character" }) 
    password: string;

    @IsString()
    @Matches(/^[a-zA-Z ]+$/, { message: 'First name must contain only alphabets and widespaces'})
    firstName: string;

    @IsString()
    @Matches(/^[a-zA-Z ]+$/, { message: 'Last name must contain only alphabets and widespaces'})
    lastName: string;

    @IsString()
    @IsOptional()
    externalId: string | null; // Unique identifier from Google or Facebook

    @IsString()
    @IsOptional()
    accessToken: string | null; // Access token received during OAuth

    @IsString()
    @IsOptional()
    refreshToken: string | null; // Refresh token received during OAuth

    @IsString()
    @IsOptional()
    authProvider: string | null; // Authentication provider (e.g., 'Google', 'Facebook')

    @IsUrl()
    @IsOptional()
    profilePicture: string | null;

    @IsUrl()
    @IsOptional()
    coverPhoto: string | null;

    @IsString()
    @IsOptional()
    contactNumber: string | null;

    @ValidateNested()
    @Type(() => AddressDTO)
    @IsOptional()
    address: AddressDTO | null;

    @IsString()
    @IsOptional()
    professionalTitle: string | null;

    @IsString()
    @IsOptional()
    summary: string | null;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ExperienceDTO)
    @IsOptional()
    experience: ExperienceDTO[] | null;

    // Define arrays for Education, Skills, Certifications, Portfolio, etc.

    @IsUrl()
    @IsOptional()
    resume: string | null;

    @ValidateNested({ each: true })
    @Type(() => JobPreferencesDTO)
    @IsOptional()
    jobPreferences: JobPreferencesDTO[] | null;

    @IsEnum(ProfileVisibility)
    @IsOptional()
    profileVisibility: string | null;
    
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ApplicationHistoryDTO)
    @IsOptional()
    applicationHistory: ApplicationHistoryDTO[] | null;
}
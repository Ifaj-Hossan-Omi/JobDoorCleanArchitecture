import { IsNotEmpty, IsString } from 'class-validator';
import { UUID } from 'crypto';

export class InterviewerCreateRequestDTO {
    @IsString()
    @IsNotEmpty()
    name: string;
    jobProviderId: UUID;
}
import { IsNotEmpty } from 'class-validator';
import { UUID } from 'crypto';

import { PartialType } from '@nestjs/mapped-types';
import { JobCreateRequestDTO } from './jobCreateRequest.dto';

export class JobUpdateRequestDTO extends PartialType(JobCreateRequestDTO) {
    @IsNotEmpty()
    id: UUID;
}
import { PartialType } from '@nestjs/mapped-types';
import { CreateJobproviderDto } from './create-jobprovider.dto';

export class UpdateJobproviderDto extends PartialType(CreateJobproviderDto) {}

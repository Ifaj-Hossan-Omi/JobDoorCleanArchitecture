import { PartialType } from '@nestjs/mapped-types';
import { CreateInterviewProcessDto } from './create-interview_process.dto';

export class UpdateInterviewProcessDto extends PartialType(CreateInterviewProcessDto) {
   
}

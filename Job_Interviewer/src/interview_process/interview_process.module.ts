import { Module } from '@nestjs/common';
import { InterviewProcessService } from './interview_process.service';
import { InterviewProcessController } from './interview_process.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { interview_process } from './entity/interview_process.entity';

@Module({
  imports:[TypeOrmModule.forFeature([interview_process])],
  controllers: [InterviewProcessController],
  providers: [InterviewProcessService],
})
export class InterviewProcessModule {}

import { Module } from '@nestjs/common';
import { jobInterviewerService } from './interviewer.service';
import { UserController } from './interviewer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { interviewer } from './entity/JobInterviewer.entity';

@Module({
  imports:[TypeOrmModule.forFeature([interviewer])],
  controllers: [UserController],
  providers: [jobInterviewerService],
})
export class jobInterviewerModule {}

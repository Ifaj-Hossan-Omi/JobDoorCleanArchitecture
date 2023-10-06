import { Module } from '@nestjs/common';
import { JobSeekerController } from './jobSeeker.controller';
import { JobSeekerService } from './jobSeeker.service';

@Module({
  imports: [],
  controllers: [JobSeekerController],
  providers: [JobSeekerService],
})
export class JobSeekerModule {}
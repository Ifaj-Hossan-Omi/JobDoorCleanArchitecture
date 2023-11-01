import { Module } from '@nestjs/common';
import { JobSeekerController } from './jobSeeker.controller';
import { JobSeekerService } from './jobSeeker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSeekerEntity } from './jobSeeker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobSeekerEntity]),],
  controllers: [JobSeekerController],
  providers: [JobSeekerService],
})
export class JobSeekerModule {}
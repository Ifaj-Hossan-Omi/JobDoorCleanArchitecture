import { Module } from '@nestjs/common';
import { JobProviderController } from './jobProvider.controller';
import { JobProviderEntity } from '../entities/jobProvider.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobProviderService } from './jobProvider.service';
import { JobEntity } from '../entities/job.entity';
import { InterviewerEntity } from 'src/entities/interviewer.entity';
import { JobSeekerEntity } from 'src/entities/jobSeeker.entity';
import { AppliedJobsEntity } from 'src/entities/appliedJobs.entity';
import { CompanyInfoEntity } from 'src/entities/company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobProviderEntity, JobEntity, InterviewerEntity, CompanyInfoEntity, AppliedJobsEntity, JobSeekerEntity]),],
  controllers: [JobProviderController],
  providers: [JobProviderService],
  exports: [JobProviderService]
})
export class JobProviderModule { }

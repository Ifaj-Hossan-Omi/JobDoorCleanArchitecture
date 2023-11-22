import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { JobProviderModule } from 'src/JobProvider/jobProvider.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobEntity } from 'src/entities/job.entity';
import { JobProviderEntity } from 'src/entities/jobProvider.entity';

@Module({
  providers: [JobService],
  controllers: [JobController],
  imports: [TypeOrmModule.forFeature([JobProviderEntity, JobEntity]), JobProviderModule],
})
export class JobModule { }

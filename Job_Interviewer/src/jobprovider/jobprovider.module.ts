import { Module } from '@nestjs/common';
import { JobproviderService } from './jobprovider.service';
import { JobproviderController } from './jobprovider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jobprovider } from './entities/jobprovider.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Jobprovider])],
  controllers: [JobproviderController],
  providers: [JobproviderService],
})
export class JobproviderModule {}

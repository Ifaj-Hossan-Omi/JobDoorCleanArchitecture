import { Module } from '@nestjs/common';
import { JobSeekerModule } from './jobSeeker/jobSeeker.module';


@Module({
  imports: [JobSeekerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

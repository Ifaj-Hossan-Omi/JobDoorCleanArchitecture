import { Module } from '@nestjs/common';
import { JobSeekerController } from './jobSeeker.controller';
import { JobSeekerService } from './jobSeeker.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobSeeker } from './jobSeeker.entity';
import { Job } from './job.entity'
import { MailerModule } from '@nestjs-modules/mailer';
import { Experience } from './experience.entity';
import { JobApplication } from './job_application.entity';
import { JobPreferences } from './job_preferences.entity';
import { Address } from './address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([JobSeeker, Experience, JobApplication, JobPreferences, Address, Job]),
        MailerModule.forRoot({
        transport: {
            host: 'smtp.gmail.com',
            port: 465,
            ignoreTLS: true,
            secure: true,
            auth: {
                user: 'tazrifraim@gmail.com',
                pass: 'uidg hqsu jbrw uqhl'
            },
        }
    })
  ],
  controllers: [JobSeekerController],
  providers: [JobSeekerService],
})
export class JobSeekerModule {}
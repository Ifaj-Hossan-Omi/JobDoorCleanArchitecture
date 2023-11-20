import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InterviewProcessModule } from './interview_process/interview_process.module';
import { jobInterviewerModule } from './JobInterviewer/interviewer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobproviderModule } from './jobprovider/jobprovider.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport:{
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth:{
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD
        }
      }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: "1234",
      database: 'Job_Interviewer1',
      autoLoadEntities: true,
      synchronize: true,
    }), 
    InterviewProcessModule, jobInterviewerModule , JobproviderModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

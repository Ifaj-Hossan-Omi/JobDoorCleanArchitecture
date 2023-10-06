import { Body, Controller, Get, Param, Post, Put, Patch, Query } from '@nestjs/common';
import { JobSeekerService } from './jobSeeker.service';
import { JobSeeker } from './jobSeeker.dto';
import { ApplyJob } from './applyJob.dto';

@Controller()
export class JobSeekerController {
  constructor(private readonly appService: JobSeekerService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/jobs')
  getJobs(): object[] {
    return [{},{}];
  }

  @Post('/createNewJobSeeker')
  createNewJobSeeker(@Body() jobSeeker: JobSeeker): object {
    return jobSeeker;
  }

  @Get('/profile/:username')
  showProfile(@Param('username') username:string ): object {
    return {};
  }

  @Put('/profile/update')
  updateProfile(@Body() jobseeker: JobSeeker): object {
    return {};
  }

  @Patch('/profile/updatePassword')
  updatePassword(@Body() jobseeker: JobSeeker): object {
    return {};
  }

  @Post('/applyJob')
  applyJob(@Body() applyJob:ApplyJob ): object {
    return {};
  }

  @Get('/jobs/applied/:username')
  showAppliedJobs(@Param('username') username: string): object[] {
    return [{},{}];
  }

  @Get('/jobs/:query')
  searchJobs(@Query('query') query: string): object[] {
    return [{},{}];
  }

  @Get('/dashboard/:username')
  dashboard(@Param('username') username: string): object {
    return {};
  }

  @Post('/deleteJobSeeker')
  deleteJobSeeker(@Body() jobSeeker: JobSeeker) {
    
  }

  @Get('/jobs/offers/:username')
  getJobOffers(@Param('username') username: string): object[] {
    return [{},{}];
  }

  @Get('/connections/:username')
  getConnections(@Param('username') username: string): object[] {
    return [{},{}];
  }
}

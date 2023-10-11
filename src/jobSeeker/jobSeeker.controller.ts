import { Body, Controller, Get, Param, Post, Put, Patch, Query, ValidationPipe } from '@nestjs/common';
import { JobSeekerService } from './jobSeeker.service';
import { JobSeeker } from './jobSeeker.dto';
import { ApplyJob } from './applyJob.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common/decorators';
import { MulterError, diskStorage } from 'multer';
import { Res } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';

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
  @UsePipes(new ValidationPipe())
  createNewJobSeeker(@Body() jobSeeker: JobSeeker): object {
    return jobSeeker;
  }

  @Get('/employeeNumber/:number')
  employeeNumber(@Param('number', ParseIntPipe) number: number): object[] {
    return [];
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

  @Get('/searchJobs')
  searchJobs(@Query('name') name: string): object[] {
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

  @Post('/upload/resume')
  @UseInterceptors(FileInterceptor('file', 
  {
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(pdf)$/)) {
        cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'Only pdf files are allowed'), false);
      } else {
        cb(null, true);
      }
    },
    limits: { fileSize: 2*1024*1024 },
      storage:diskStorage({
      destination: './uploads/resume',
      filename: (req, file, cb) => {
        cb(null, Date.now()+file.originalname);
      },
    }),
  }))
  UploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get('/resume/:filename')
  downloadResume(@Param('filename') filename, @Res() res) {
    res.sendFile(filename, { root: './uploads/resume'})
  }



}

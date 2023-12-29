import { Body, Controller, Get, Param, Post, Put, Patch, Query, ValidationPipe, Session, Req, UnauthorizedException, ParseIntPipe, Res, HttpException, HttpStatus } from '@nestjs/common';
import { JobSeekerService } from './jobSeeker.service';
import { JobSeekerDTO } from './jobSeeker.dto';
import { AddressDTO } from './address.dto';
import { ExperienceDTO } from './experience.dto';
import { JobPreferencesDTO } from './jobPreferences.dto';
import { ApplyJob } from './applyJob.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Delete, UploadedFile, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common/decorators';
import { MulterError, diskStorage } from 'multer';
import session from 'express-session';
import { SessionGuard } from './session.guard';
import { create } from 'domain';
import { JobDTO } from './job.dto';
import { userpass } from './userpass.dto';

@Controller('jobSeeker')
export class JobSeekerController {
  constructor(private readonly jobSeekerService: JobSeekerService) {}

  @Post('/profile')
  @UseGuards(SessionGuard)
  async showProfile(@Req() req ): Promise<any> {
    let res = await this.jobSeekerService.getJobSeekerIdByEmail(req.session.email);
    const a = this.jobSeekerService.getJobSeeker(res);
    if(res!==null){
      return a;
    }
    else {
      throw new HttpException('Job Seeker Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @Put('/profile/update')
  @UseGuards(SessionGuard)
  updateProfile(@Body() jobseeker: JobSeekerDTO): void {
    this.jobSeekerService.updateProfile(jobseeker);
  }

  @Post('/profile/updatePassword')
  @UseGuards(SessionGuard)
  updatePassword(@Body() userpass:userpass): void {
    this.jobSeekerService.updatePassword(userpass);
  }

  @Delete('/deleteJobSeeker')
  @UseGuards(SessionGuard)
  deleteJobSeeker(@Session() session): void {
    this.jobSeekerService.deleteJobSeeker(session.email);
    session.destroy();
  }

  @Post('/upload/resume')  
  @UseGuards(SessionGuard)
  @UseInterceptors(FileInterceptor('file',
    {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(pdf)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
        }
      },
      limits: { fileSize: 2*1024*1024 },
      storage: diskStorage({
        destination: './uploads/resume',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname)
        },
      })
    }))
  uploadResume(@UploadedFile() file: Express.Multer.File, @Session() session) {
    console.log(file);
    this.jobSeekerService.uploadResume(file.filename, session.email);
  }

  @Get('/resume')
  @UseGuards(SessionGuard)
  downloadResume(@Query('filename') filename, @Res() res) {
    res.sendFile(filename, { root: './uploads/resume'})
  }

  @Get('/jobs/:salary')
  //@UseGuards(SessionGuard)
  getJobsBySalary(@Param('salary', ParseIntPipe) salary: number): object {
    return this.jobSeekerService.getJobsBySalary(salary);
  }

  @Post('/signup')
  @UsePipes(new ValidationPipe())
  jobSeekerSignup(@Body() jobSeeker: JobSeekerDTO){
    const s:object = this.jobSeekerService.jobSeekerSignup(jobSeeker);
    if(s==null){
      throw new HttpException('User Already Exists', HttpStatus.BAD_REQUEST);
    } else {
      return true;
    }
  }

  @Post('/usernameExist')
  usernameExist(@Body() jobSeeker: JobSeekerDTO){
    const res = this.jobSeekerService.usernameExist(jobSeeker);
    return res;
  }

  @Post('/emailExist')
  emailExist(@Body() jobSeeker: JobSeekerDTO){
    const res = this.jobSeekerService.emailExist(jobSeeker);
    return res;
  }

  @Post('/signin')
  jobSeekerSignin(@Body() jobSeeker: JobSeekerDTO, @Session() session){
    const result = this.jobSeekerService.jobSeekerSignin(jobSeeker);
    if(result){
      //session.id = jobSeeker.id;
      session.email = jobSeeker.email;
      console.log(session.email);
      console.log(session);
      console.log(session.id);
    }
    return result;
  }

  @Post('/signout')
  @UseGuards(SessionGuard)
  jobSeekerSignout(@Req() req){
    if(req.session.destroy()){
      console.log(true);
      return true;
    }
    else{
      throw new UnauthorizedException('invalid actions');
    }
  }

  @Get('/jobSearch/:search')
  jobSearch(@Param('search') search: string): object {
    return this.jobSeekerService.jobSearch(search);
  }

  @Patch('/update/address')
  @UseGuards(SessionGuard)
  updateAddress(@Body() address: AddressDTO, @Session() session): void {
    this.jobSeekerService.updateAddress(address, session.email);
  }

  @Patch('/update/experience')
  @UseGuards(SessionGuard)
  updateExperience(@Body() experience: ExperienceDTO[], @Session() session): void {
    this.jobSeekerService.updateExperience(experience, session.email);
  }

  @Patch('/update/jobPreferences')
  @UseGuards(SessionGuard)
  updateJobPreferences(@Body() jobPreferences: any, @Req() req): void {
    
    try{
      const abc: JobPreferencesDTO[] = Object.values(jobPreferences);
      
      console.log(jobPreferences);
      console.log(req.session.email);
      console.log(abc);
      this.jobSeekerService.updateJobPreferences(abc, req.session.email);
    } catch(e){
      throw new HttpException('Invalid Input', HttpStatus.BAD_REQUEST);
    }
    
  }

  @Get('/jobApplications')
  @UseGuards(SessionGuard)
  getJobApplications(@Session() session): object {
    return this.jobSeekerService.getJobApplications(session.email);
  }

  @Post('/applyJob')
  @UseGuards(SessionGuard)
  applyJob(@Body() job: JobDTO, @Session() session): void {
    this.jobSeekerService.applyJob(job, session.email);
  }

  @Get('/profile/jobPreferences')
  @UseGuards(SessionGuard)
  getJobPreferences(@Req() req): object {
    return this.jobSeekerService.getJobPreferences(req.session.email);
  }

  @Get('/profile/experience')
  @UseGuards(SessionGuard)
  getExperience(@Session() session): object {
    return this.jobSeekerService.getExperience(session.email);
  }

  @Get('/profile/address')
  @UseGuards(SessionGuard)
  getAddress(@Session() session): object {
    return this.jobSeekerService.getAddress(session.email);
  }

  @Get('/jobs')
  //@UseGuards(SessionGuard)
  getJobs(): object {
    return this.jobSeekerService.getJobs();
  }

  @Post('/jobs/preferred')
  
  getPreferredJobs(@Body() jobPreference: JobPreferencesDTO): object {
    return this.jobSeekerService.getPreferredJobs(jobPreference);
  }

  @Post('demoJob')
  demoJobPopulate(@Body() job: JobDTO): void {
    this.jobSeekerService.demoJobPopulate(job);
  }

  @Patch('upload/profilePicture')
  @UseGuards(SessionGuard)
  @UseInterceptors(FileInterceptor('file',
    {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 4*1024*1024 },
      storage: diskStorage({
        destination: './uploads/profilePicture',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname)
        },
      })
    }))
  uploadProfilePicture(@UploadedFile() file: Express.Multer.File, @Session() session) {
    console.log(file);
    this.jobSeekerService.uploadProfilePicture(file.filename, session.email);
  }



  @Get('/profilePicture')
  @UseGuards(SessionGuard)
  async getProfilePicture(@Req() req, @Res() res) {
    console.log(req.session.email);
    const filename = await this.jobSeekerService.getProfilePictureFilename(req.session.email);
    console.log(filename);
    res.sendFile(filename, { root: './uploads/profilePicture'})
  }

  @Patch('/upload/coverPhoto')
  @UseGuards(SessionGuard)
  @UseInterceptors(FileInterceptor('file',
    {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 4*1024*1024 },
      storage: diskStorage({
        destination: './uploads/coverPhoto',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname)
        },
      })
    }))
  UploadCoverPhoto(@UploadedFile() file: Express.Multer.File, @Session() session) {
    console.log(file);
    this.jobSeekerService.uploadCoverPhoto(file.filename, session.email);
  }

  @Get('/coverPhoto')
  @UseGuards(SessionGuard)
  getCoverPhoto(@Query('filename') filename, @Res() res) {
    res.sendFile(filename, { root: './uploads/coverPhoto'})
  }
}

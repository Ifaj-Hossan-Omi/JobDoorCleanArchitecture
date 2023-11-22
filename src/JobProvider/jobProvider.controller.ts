import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Request, Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { JobProviderService } from './jobProvider.service';
import { JobProviderRequestDTO } from './DTOs/JobProviderDTOs/jobProviderRequest.dto';
import { UUID } from 'crypto';
import { JobProviderUpdateRequestDTO } from './DTOs/JobProviderDTOs/jobProviderUpdateRequest.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { MailerService } from '@nestjs-modules/mailer';
import { InterviewerCreateRequestDTO } from './DTOs/interviewerDTOs/interviewerCreateRequest.dto';
import { AssignInterViewerRequestDTO } from './DTOs/JobProviderDTOs/assignInterViewerRequest.dto';
import { DeallocateInterViewerRequestDTO } from './DTOs/JobProviderDTOs/assignInterViewerRequest.dto copy';
import { CompanyCreateRequestDTO } from './DTOs/compnayDTOs/companyCreateRequest.dto';
import { JobSeekerEntity } from 'src/entities/jobSeeker.entity';
import { application } from 'express';
import { ApplyJobDTO } from './DTOs/appliedJobDTOs/appllyJob.dto';
import { AppliedJob } from './DTOs/appliedJobDTOs/appliedJob.dto';
// import { AppService } from './app.service';

@Controller('jobprovider')
export class JobProviderController {
  constructor(private readonly jobProviderService: JobProviderService,
    private readonly mailerService: MailerService) { }


  @Post('createAccount')
  @UseInterceptors(FileInterceptor('profilePicture',
    {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 3000000 },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname)
        },
      })
    }))
  @UsePipes(new ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  async createAccount(@Body() jobProvider: JobProviderRequestDTO, @UploadedFile() file: Express.Multer.File): Promise<any> {
    jobProvider.profilePicture = file.filename;
    try {
      const jobProviderData = await this.jobProviderService.createJobProvider(jobProvider);
      this.sendMail(jobProviderData.email, jobProviderData.name);
      return jobProviderData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Put('updateAccount')
  @UsePipes(new ValidationPipe)
  @HttpCode(HttpStatus.ACCEPTED)
  async updateAccount(@Request() req, @Body() updatedJobProvider: JobProviderUpdateRequestDTO): Promise<any> {
    updatedJobProvider.id = req.user.id;
    try {
      return await this.jobProviderService.updateUser(updatedJobProvider);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  };

  @Get('/:id')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.FOUND)
  async getJobProviderById(@Param('id', ParseUUIDPipe) id: UUID): Promise<any> {
    try {
      return await this.jobProviderService.getJobProviderById(id);
    }
    catch (error) {
      console.log(error.message);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('deleteJobProvider')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteJobProvider(@Request() req): Promise<any> {
    try {
      await this.jobProviderService.deleteUser(req.user.id);
      return { "message": "Deleted " + req.user.id }
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  };

  @Delete('deleteJobProvider/:id')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteJobProviderById(@Param('id') id: UUID) {

    try {
      await this.jobProviderService.deleteUser(id);
      return { "message": "Deleted " + id }
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  };

  @Post('createInterviewer')
  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe)
  async createInterviewer(@Request() req, @Body() interviewer: InterviewerCreateRequestDTO): Promise<any> {
    interviewer.jobProviderId = req.user.id;
    try {
      return await this.jobProviderService.createInterviewer(interviewer);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Put('assignInterviewer')
  @HttpCode(HttpStatus.ACCEPTED)
  @UsePipes(new ValidationPipe)
  async assignInterviewer(@Request() req, @Body() assignInterviewerDto: AssignInterViewerRequestDTO): Promise<any> {
    try {
      return await this.jobProviderService.assignInterviewer(assignInterviewerDto, req.user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  };

  @UseGuards(JwtGuard)
  @Put('deallocateInterviewer')
  @HttpCode(HttpStatus.ACCEPTED)
  @UsePipes(new ValidationPipe)
  async deallocateInterviewer(@Request() req, @Body() deallocateInterviewerDto: DeallocateInterViewerRequestDTO): Promise<any> {
    try {
      return await this.jobProviderService.deallocateInterviewer(deallocateInterviewerDto, req.user.id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  };

  sendMail(mail: string, name: string): void {
    console.log(process.env.password)
    this.mailerService.sendMail({
      to: mail,
      from: 'omiifajhossanofficial@gmail.com',
      subject: 'Welcome to JobDoor',
      text: 'welcome',
      html: `<b>Hello ${name}, welcome to job door</b>`,
    })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  @UseGuards(JwtGuard)
  @Get('/getProfilePicture')
  @HttpCode(HttpStatus.FOUND)
  async getProfilePicture(@Request() req, @Res() res) {
    try {
      const jobProvider = await this.jobProviderService.getProfilePicture(req.user.id);
      res.sendFile(jobProvider.profilePicture, { root: './uploads' })
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtGuard)
  @Get('/getProfilePicture/:name')
  @HttpCode(HttpStatus.FOUND)
  getImages(@Param('name') name, @Res() res) {
    try {
      res.sendFile(name, { root: './uploads' })
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put('updateProfilePicture')
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('profilePicture',
    {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 3000000 },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname)
        },
      })
    }))
  @HttpCode(HttpStatus.ACCEPTED)
  async updateProfilePicture(@Request() req, @UploadedFile() file: Express.Multer.File): Promise<any> {
    try {
      return await this.jobProviderService.updateProfilePicture(req.user.id, file.filename);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  };

  @UseGuards(JwtGuard)
  @Get('getAllJobProviders')
  @HttpCode(HttpStatus.FOUND)
  async getAllJobProviders(): Promise<any> {
    try {
      return await this.jobProviderService.getAllJobProvider();
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtGuard)
  @Get('getJobProviderByUsername/:username')
  @HttpCode(HttpStatus.FOUND)
  async getJobProviderByUsername(@Param('username') username: string): Promise<any> {
    try {
      return await this.jobProviderService.getJobProviderByUsername(username);
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtGuard)
  @Post('addCompanyInfo')
  @HttpCode(HttpStatus.FOUND)
  async addCompanyInfo(@Request() req, @Body() companyInfo: CompanyCreateRequestDTO): Promise<any> {
    try {
      companyInfo.jobProviderId = req.user.id;
      return await this.jobProviderService.addCompanyInfo(companyInfo);
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('createJobSeeker')
  // @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe)
  async createJobSeeker(@Body() jobSeeker): Promise<any> {
    try {
      return await this.jobProviderService.createJobSeeker(jobSeeker);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('applyToJob')
  @HttpCode(HttpStatus.ACCEPTED)
  async applyToJob(@Body() applyJob: ApplyJobDTO): Promise<any> {
    try {
      return await this.jobProviderService.applyToJob(applyJob);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_IMPLEMENTED);
    }
  }

  @UseGuards(JwtGuard)
  @Put('shortlistJobSeeker')
  @HttpCode(HttpStatus.ACCEPTED)
  async shortlistJobSeeker(@Request() req, @Body() appliedJob: AppliedJob): Promise<any> {
    try {
      appliedJob.jobProviderId = req.user.id;
      return await this.jobProviderService.shortlistJobSeeker(appliedJob);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtGuard)
  @Put('rejectJobSeeker')
  @HttpCode(HttpStatus.ACCEPTED)
  async rejectJobSeeker(@Request() req, @Body() appliedJob: AppliedJob): Promise<any> {
    try {
      appliedJob.jobProviderId = req.user.id;
      return await this.jobProviderService.rejectJobSeeker(appliedJob);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtGuard)
  @Put('approveJobSeekerForInterview')
  @HttpCode(HttpStatus.ACCEPTED)
  async approveJobSeekerForInterview(@Request() req, @Body() appliedJob: AppliedJob): Promise<any> {
    try {
      appliedJob.jobProviderId = req.user.id;
      return await this.jobProviderService.approveJobSeekerForInterview(appliedJob);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtGuard)
  @Put('hiredJobSeeker')
  @HttpCode(HttpStatus.ACCEPTED)
  async hiredJobSeeker(@Request() req, @Body() appliedJob: AppliedJob): Promise<any> {
    try {
      appliedJob.jobProviderId = req.user.id;
      return await this.jobProviderService.hiredJobSeeker(appliedJob);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }





  // @Get('login')
  // async login(@Body() jobProviderLoginDTO: JobProviderLoginDTO) {
  //   try {
  //     return await this.jobProviderService.login(jobProviderLoginDTO);
  //   } catch (error) {
  //     throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
  //   }
  // }

}

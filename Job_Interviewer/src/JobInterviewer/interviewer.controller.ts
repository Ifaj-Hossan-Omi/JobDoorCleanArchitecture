import { Body, Controller, Get, Post, Put, Query, UploadedFile, Param, Res, UsePipes, ValidationPipe, Delete, ParseIntPipe, Session, NotFoundException, HttpException, HttpStatus, UseGuards, InternalServerErrorException, UseInterceptors, NotAcceptableException, BadRequestException, Patch, ForbiddenException } from '@nestjs/common';
import { jobInterviewerService } from './interviewer.service';
import { interviewerLoginDTO } from './dto/interviewer.login.dto';
import { interviewerGuard } from './interviewer.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import session from 'express-session';
import { interviewerChangePasswordDto } from './dto/interviewer.change-password.dto';
import { InterviewerRegistrationDTO } from './dto/interviewer_registration.dto';
import { InterviewerUpdateDTO } from './dto/interviewer_update.dto';
import { interviewer_change_email_dto } from './dto/interviewer_change_email.dto';
import { interviewer_change_uname_dto } from './dto/interviewer_change_uname.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('jobInterviewer')
export class UserController {
  constructor(
    private readonly jobInterviewerService: jobInterviewerService,
    private readonly mailerService: MailerService
  ) { }


  @Get('all')
  get() {
    return this.jobInterviewerService.get()
  }
  @UseGuards(interviewerGuard)
  @Get('profile')
  get_profile(@Session() session) {
    const id = session.user_id;
    return this.jobInterviewerService.get_profile(id)
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() userLoginDTO: interviewerLoginDTO, @Session() session) {
    const userData = await this.jobInterviewerService.login(userLoginDTO);
    if (userData != null) {
      session.user_id = userData.id;
      session.email = userData.mail;
      session.usertype = "interviewer";
      return { Message: "Login is successfull" }
    }
    else {
      throw new NotFoundException({ Message: "Invalid credential" })
    }
  }


  @Get('logout')
  @UseGuards(interviewerGuard)
  logout(@Session() session) {
    session.destroy();
    return { Message: "Log out successfully" }
  }

  @Post('registration')
  @UsePipes(new ValidationPipe())
  async create(@Body() InterviewerRegistrationDTO: InterviewerRegistrationDTO) {
    if (await this.jobInterviewerService.email_exists(InterviewerRegistrationDTO.mail)) {
      throw new BadRequestException({ Message: "Mail already exists" });
    }
    if (await this.jobInterviewerService.uname_exists(InterviewerRegistrationDTO.uname)) {
      throw new BadRequestException({ Message: "Username already exists" });
    }
    try{
      this.mailerService.sendMail({
        to: InterviewerRegistrationDTO.mail, // list of receivers
        from: 'noneedradakash@gmail.com', // sender address
        subject: 'Welcome to Job Door Cleaner Architecture', // Subject line
        text: 'Registration is successfyl', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
    }catch(e){
      console.log(e)
    }
    return this.jobInterviewerService.registration(InterviewerRegistrationDTO)
  }

  @Get('send-email')
  sendEmail(){
    const mail = "radshamat@gmail.com"
    try{
      this.mailerService.sendMail({
        to: mail, // list of receivers
        from: 'noneedradakash@gmail.com', // sender address
        subject: 'Welcome to Job Door Cleaner Architecture', // Subject line
        text: 'Registration is successfyl', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      return {Message: "Message is sent"}
    }catch(e){
      throw new InternalServerErrorException({Message: "Email not send", Error: e})
    }
  }


  @Put('update')
  @UsePipes(new ValidationPipe())
  update(@Body() InterviewerUpdateDTO: InterviewerUpdateDTO, @Session() session) {
    const id = session.user_id;
    return this.jobInterviewerService.update(id, InterviewerUpdateDTO);
  }

  @Patch('change-password')
  @UseGuards(interviewerGuard)
  @UsePipes(new ValidationPipe())
  async change_password(@Body() interviewerChangePasswordDto: interviewerChangePasswordDto, @Session() session) {
    const id = session.user_id;
    if (await this.jobInterviewerService.is_correct_password(id, interviewerChangePasswordDto.old_password)) {
      return await this.jobInterviewerService.change_password(id, interviewerChangePasswordDto.new_password);
    }
    throw new ForbiddenException({ Message: "Old password is not correct" })
  }


  @Patch('change-email')
  @UseGuards(interviewerGuard)
  @UsePipes(new ValidationPipe())
  async change_email(@Body() interviewer_change_email_dto: interviewer_change_email_dto, @Session() session) {
    const id = session.user_id;
    var obj = await this.jobInterviewerService.is_correct_password(id, interviewer_change_email_dto.pass);
    if (obj == null) {
      throw new ForbiddenException({ Message: "Old password is not correct" })
    }
    if (obj.mail == interviewer_change_email_dto.mail) {
      throw new ForbiddenException({ Message: "You have choosed previous email" })
    }
    if (await this.jobInterviewerService.email_exists(interviewer_change_email_dto.mail)) {
      throw new ForbiddenException({ Message: "Email already exists." })
    }
    return await this.jobInterviewerService.change_email(id, interviewer_change_email_dto.mail);
  }

  @Patch('change-uname')
  @UseGuards(interviewerGuard)
  @UsePipes(new ValidationPipe())
  async change_uname(@Body() interviewer_change_uname_dto: interviewer_change_uname_dto, @Session() session) {
    const id = session.user_id;
    var obj = await this.jobInterviewerService.is_correct_password(id, interviewer_change_uname_dto.pass);
    if (obj == null) {
      throw new ForbiddenException({ Message: "Old password is not correct" })
    }
    if (obj.uname == interviewer_change_uname_dto.uname) {
      throw new ForbiddenException({ Message: "You have choosed previous email" })
    }
    if (await this.jobInterviewerService.email_exists(interviewer_change_uname_dto.uname)) {
      throw new ForbiddenException({ Message: "Email already exists." })
    }
    return await this.jobInterviewerService.change_uname(id, interviewer_change_uname_dto.uname);
  }

  // @Delete('delete/:id')
  // @UsePipes(new ValidationPipe())
  // delete(@Param('id', ParseIntPipe) id: number) {
  //   return this.jobInterviewerService.delete(id);
  // }


  @Post('image')
  @UseGuards(interviewerGuard)
  @UseInterceptors(FileInterceptor('file',
    {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 2 * 1024 * 1024 },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname)
        },
      })
    }))
  uploadFile(@UploadedFile('file') file: Express.Multer.File, @Session() session) {
    console.log(file);
    if (!file) {
      throw new NotAcceptableException({ Message: "File is required" });
    }
    const id = session.user_id;
    if (this.jobInterviewerService.update_image(id, file)) {
      return { Message: "Image update is successfull" }
    }
    else {
      throw new InternalServerErrorException({ Message: "Image update is not successful" })
    }
  }

  @Get('/getimage/:name')
  getImages(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './uploads' })
  }
}

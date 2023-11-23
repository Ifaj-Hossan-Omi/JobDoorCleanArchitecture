/// <reference types="multer" />
import { jobInterviewerService } from './interviewer.service';
import { interviewerLoginDTO } from './dto/interviewer.login.dto';
import { interviewerChangePasswordDto } from './dto/interviewer.change-password.dto';
import { InterviewerRegistrationDTO } from './dto/interviewer_registration.dto';
import { InterviewerUpdateDTO } from './dto/interviewer_update.dto';
import { interviewer_change_email_dto } from './dto/interviewer_change_email.dto';
import { interviewer_change_uname_dto } from './dto/interviewer_change_uname.dto';
import { MailerService } from '@nestjs-modules/mailer';
export declare class UserController {
    private readonly jobInterviewerService;
    private readonly mailerService;
    constructor(jobInterviewerService: jobInterviewerService, mailerService: MailerService);
    get(): Promise<import("./entity/JobInterviewer.entity").interviewer[]>;
    get_profile(session: any): Promise<import("./entity/JobInterviewer.entity").interviewer>;
    login(userLoginDTO: interviewerLoginDTO, session: any): Promise<{
        Message: string;
    }>;
    logout(session: any): {
        Message: string;
    };
    create(InterviewerRegistrationDTO: InterviewerRegistrationDTO): Promise<import("typeorm").InsertResult>;
    sendEmail(): {
        Message: string;
    };
    update(InterviewerUpdateDTO: InterviewerUpdateDTO, session: any): Promise<import("typeorm").UpdateResult>;
    change_password(interviewerChangePasswordDto: interviewerChangePasswordDto, session: any): Promise<import("typeorm").UpdateResult>;
    change_email(interviewer_change_email_dto: interviewer_change_email_dto, session: any): Promise<import("typeorm").UpdateResult>;
    change_uname(interviewer_change_uname_dto: interviewer_change_uname_dto, session: any): Promise<import("typeorm").UpdateResult>;
    uploadFile(file: Express.Multer.File, session: any): {
        Message: string;
    };
    getImages(name: any, res: any): void;
}

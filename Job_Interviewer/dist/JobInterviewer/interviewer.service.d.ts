/// <reference types="multer" />
import { interviewerLoginDTO } from './dto/interviewer.login.dto';
import { interviewer } from './entity/JobInterviewer.entity';
import { InterviewerRegistrationDTO } from './dto/interviewer_registration.dto';
import { InterviewerUpdateDTO } from './dto/interviewer_update.dto';
export declare class jobInterviewerService {
    get_profile(id: any): Promise<interviewer>;
    private readonly interviewerRepo;
    get(): Promise<interviewer[]>;
    login(userLoginDTO: interviewerLoginDTO): Promise<interviewer>;
    is_correct_password(id: any, old_password: string): Promise<interviewer>;
    change_password(id: any, new_password: string): Promise<import("typeorm").UpdateResult>;
    change_email(id: any, mail: string): Promise<import("typeorm").UpdateResult>;
    change_uname(id: any, uname: string): Promise<import("typeorm").UpdateResult>;
    email_exists(email: string): Promise<boolean>;
    uname_exists(uname: string): Promise<boolean>;
    registration(InterviewerRegistrationDTO: InterviewerRegistrationDTO): Promise<import("typeorm").InsertResult>;
    update(id: number, InterviewerUpdateDTO: InterviewerUpdateDTO): Promise<import("typeorm").UpdateResult>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
    update_image(id: any, file: Express.Multer.File): Promise<boolean>;
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { interviewerLoginDTO } from './dto/interviewer.login.dto';
import { interviewerForgetPasswordDto } from './dto/interviewer.forgetpassword.dto';
import { Repository } from 'typeorm';
import { interviewer } from './entity/JobInterviewer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InterviewerRegistrationDTO } from './dto/interviewer_registration.dto';
import { InterviewerUpdateDTO } from './dto/interviewer_update.dto';

@Injectable()
export class jobInterviewerService {
  
  async get_profile(id: any) {
      var profile = await this.interviewerRepo.findOne({where:{id: id}, relations:{interview_processes:true}})
      return profile;
    }
  @InjectRepository(interviewer)
  private readonly interviewerRepo: Repository<interviewer>;
  async get() {
    return await this.interviewerRepo.find();
  }

  async login(userLoginDTO: interviewerLoginDTO): Promise<interviewer> {
    let userData = await this.interviewerRepo.findOneBy({ uname: userLoginDTO.username, pass: userLoginDTO.password })
    return userData;
  }

  async is_correct_password(id: any, old_password: string): Promise<interviewer> {
    let result = await this.interviewerRepo.findOneBy({id: id, pass:old_password})
    return result;
  }
  async change_password(id: any, new_password: string) {
    let obj = await this.interviewerRepo.findOneBy({id: id})
    obj.pass = new_password;
    return await this.interviewerRepo.update(id, obj)
  }
  async change_email(id: any, mail: string) {
    let obj = await this.interviewerRepo.findOneBy({id: id})
    obj.mail = mail;
    return await this.interviewerRepo.update(id, obj)
  }
  async change_uname(id: any, uname: string) {
    let obj = await this.interviewerRepo.findOneBy({id: id})
    obj.uname = uname;
    return await this.interviewerRepo.update(id, obj)
  }

  async email_exists(email: string): Promise<boolean>{
    let result = await this.interviewerRepo.findOneBy({mail: email})
    return result != null;
  }

  async uname_exists(uname: string): Promise<boolean>{
    let result = await this.interviewerRepo.findOneBy({uname: uname})
    return result != null;
  }

  async registration(InterviewerRegistrationDTO:InterviewerRegistrationDTO){
    let result = await this.interviewerRepo.insert(InterviewerRegistrationDTO);
    return result;
  }
  async update(id: number, InterviewerUpdateDTO: InterviewerUpdateDTO) {
    var obj = await this.interviewerRepo.findOneBy({id: id});
    obj.fname = InterviewerUpdateDTO.fname;
    obj.lname = InterviewerUpdateDTO.lname;
    obj.company = InterviewerUpdateDTO.company;
    obj.position = InterviewerUpdateDTO.position;
    obj.job_provider_id = InterviewerUpdateDTO.job_provider_id;

    let result = await this.interviewerRepo.update(id, obj);
    return result;
  }
  async delete(id: number) {
    let result = await this.interviewerRepo.delete(id);
    return result;
  }

  async update_image(id: any, file: Express.Multer.File): Promise<boolean> {
    var interviewer = await this.interviewerRepo.findOneBy({id: id});
    interviewer.image = file.filename;
    console.log(file.filename);
    var result = await this.interviewerRepo.update(id, interviewer);
    return result.affected > 0;
  }
}

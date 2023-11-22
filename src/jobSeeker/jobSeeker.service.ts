import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, MoreThanOrEqual, Repository } from 'typeorm';
import { JobSeeker } from './jobSeeker.entity';
import { JobApplication } from './job_application.entity';
import { Job } from './job.entity';
import { JobSeekerDTO } from './jobSeeker.dto';
import { JobPreferencesDTO } from './jobPreferences.dto';
import { ApplicationHistoryDTO } from './applicationHistory.dto';
import { ExperienceDTO } from './experience.dto';
import { AddressDTO } from './address.dto';
import * as bcrypt from 'bcrypt'
import { get } from 'http';
import { MailerService } from '@nestjs-modules/mailer/dist';
import { JobDTO } from './job.dto';
import { send } from 'process';
import { unlink } from 'fs';
import { Address } from './address.entity';

@Injectable()
export class JobSeekerService {
  constructor(
    @InjectRepository(JobSeeker) 
    private jobSeekerRepository: Repository<JobSeeker>,
    @InjectRepository(Job) 
    private jobRepository: Repository<Job>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    private mailerService: MailerService
  ) {}

  async getAllJobSeekers(): Promise<JobSeeker[]> {
    return await this.jobSeekerRepository.find();
  }

  async updatePassword(userpass): Promise<void> {
    const user: JobSeekerDTO = await this.jobSeekerRepository.findOneBy({ email: userpass.email });
    console.log(user);
    if(user!=null){
      const match: boolean = await bcrypt.compare(userpass.currentPassword, user.password);
      if(match){
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(userpass.newPassword, salt);
        await this.jobSeekerRepository.save(user);
        console.log(user);
      }
    }
  }

  async getJobSeekerIdByEmail(email: string): Promise<string> {
    const user: JobSeekerDTO = await this.jobSeekerRepository.findOneBy({ email: email });
    if(user!=null){
      return user.id;
    }
    else{
      return null;
    }
  }

  async getJobSeeker(id: string): Promise<JobSeeker> {
    return await this.jobSeekerRepository.findOne({ where: { id: id } });
  }

  async getJobsBySalary(salary: number): Promise<Job[]> {
    return await this.jobRepository.find({ where: { salary: MoreThanOrEqual(salary) } });
  }

  async jobSeekerSignup(jobSeeker: JobSeekerDTO): Promise<JobSeeker> {
    try{
      const user: JobSeekerDTO = await this.jobSeekerRepository.findOneBy({ id: jobSeeker.id });
      const user2: JobSeekerDTO = await this.jobSeekerRepository.findOneBy({ email: jobSeeker.email });
      if(user || user2){
        return null;
      } else{
        const salt = await bcrypt.genSalt();
        jobSeeker.password = await bcrypt.hash(jobSeeker.password, salt);
        this.sendEmail(jobSeeker.email, 'Welcome to Job Door', 'Thank you for signing up with us. We hope you find your dream job soon.');
        return this.jobSeekerRepository.save(jobSeeker);
      }
    } catch(err){
      console.error('error during signup', err);
    }
    
    
  }

  async deleteJobSeeker(email: string): Promise<void> {
    const user: JobSeekerDTO = await this.jobSeekerRepository.findOneBy({ email: email });
    if(user!=null){
      if(user.resume!=null){
        unlink("./uploads/resume/"+user.resume,(err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      if(user.profilePicture!=null){
        unlink("./uploads/profilePicture/"+user.profilePicture,(err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      if(user.coverPhoto!=null){
        unlink("./uploads/coverPhoto/"+user.coverPhoto,(err) => {
          if (err) {
            console.error(err);
          }
        });
      }
    }
    await this.jobSeekerRepository.delete({ email: email });
  }

  async jobSeekerSignin(jobSeeker: JobSeekerDTO): Promise<boolean> {
    const user: JobSeekerDTO = await this.jobSeekerRepository.findOneBy({ email: jobSeeker.email });
    console.log(user);
    if(user!=null){
      const match: boolean = await bcrypt.compare(jobSeeker.password, user.password);
      return match;
    }  
    else {
      return false;
    }
  }

  async updateProfile(jobSeeker: JobSeekerDTO): Promise<void> {
    const user: JobSeekerDTO = await this.jobSeekerRepository.findOneBy({ email: jobSeeker.email });
    if(user!=null){
      user.firstName = jobSeeker.firstName;
      user.lastName = jobSeeker.lastName;
      user.contactNumber = jobSeeker.contactNumber;
      user.professionalTitle = jobSeeker.professionalTitle;
      user.summary = jobSeeker.summary;
      user.profileVisibility = jobSeeker.profileVisibility;
      await this.jobSeekerRepository.save(user);
    }
  }

  async updateAddress(address: AddressDTO, email: string): Promise<void> {
    const user: JobSeekerDTO = await this.jobSeekerRepository.findOneBy({ email: email });
    if(user!=null){
      user.address = address;
      await this.jobSeekerRepository.save(user);
    }
  }

  async updateExperience(experience: ExperienceDTO[], email: string): Promise<void> {
    const user: JobSeekerDTO = await this.jobSeekerRepository.findOneBy({ email: email });
    if(user!=null){
      user.experience = experience;
      await this.jobSeekerRepository.save(user);
    }
  }

  async getJobs(): Promise<Job[]> {
    return await this.jobRepository.find();
  }

  async getPreferredJobs(jobPreference: any): Promise<Job[]> {
    console.log(jobPreference);
    return await this.jobRepository.find(
      {
        where: {
          domain: In(jobPreference.preferredIndustries),
          salary: MoreThanOrEqual(jobPreference.desiredSalary),
          location: In(jobPreference.locations)
        }
      }
    );
    return null;
  }

  async updateJobPreferences(jobPreferences: JobPreferencesDTO[], email: string): Promise<void> {
    const user: JobSeekerDTO = await this.jobSeekerRepository.findOneBy({ email: email });
    if(user!=null){
      user.jobPreferences = jobPreferences;
      await this.jobSeekerRepository.save(user);
    }
  }

  async demoJobPopulate(job: JobDTO): Promise<void> {
    await this.jobRepository.save(job);
  }

  async getJobApplications(email: string): Promise<object[]> {
    const user: JobSeekerDTO = await this.jobSeekerRepository.findOneBy({ email: email });
    if(user!=null){
      return await this.jobSeekerRepository.find({ where: { id: user.id }, relations: ['applicationHistory'] });
    }
    else{
      return null;
    }
  }

  async uploadResume(resume: string, email: string): Promise<void> {
    const user: JobSeekerDTO = await this.jobSeekerRepository.findOneBy({ email: email });
    if(user!=null){
      if(user.resume!=null){
        unlink("./uploads/resume/"+user.resume,(err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      user.resume = resume;
      await this.jobSeekerRepository.save(user);
    }
  }

  async uploadProfilePicture(profilePicture: string, email: string): Promise<void> {
    const user: JobSeekerDTO = await this.jobSeekerRepository.findOneBy({ email: email });
    if(user!=null){
      if(user.profilePicture!=null){
        unlink("./uploads/profilePicture/"+user.profilePicture,(err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      user.profilePicture = profilePicture;
      await this.jobSeekerRepository.save(user);
    }
  }

  async uploadCoverPhoto(coverPhoto: string, email: string): Promise<void> {
    const user: JobSeekerDTO = await this.jobSeekerRepository.findOneBy({ email: email });
    if(user!=null){
      if(user.coverPhoto!=null){
        unlink("./uploads/coverPhoto/"+user.coverPhoto,(err) => {
          if (err) {
            console.error(err);
          }
        });
      }
      user.coverPhoto = coverPhoto;
      await this.jobSeekerRepository.save(user);
    }
  }

  async applyJob(job: JobDTO, session): Promise<void> {
    try{
    const user: JobSeekerDTO = await this.jobSeekerRepository.findOneBy({ email: session.email });
    if(user!=null){
      const application: ApplicationHistoryDTO = new ApplicationHistoryDTO();
      application.jobId = job.id;
      application.appliedOn = new Date();
      application.status = 'Applied';
      application.jobSeeker = user;
      user.applicationHistory.push(application);
      await this.jobSeekerRepository.save(user);
    }} catch(err){
      console.error('error during apply', err);
    }
  }

  async getJobPreferences(email: string): Promise<object> {
    const user: JobSeekerDTO = await this.jobSeekerRepository.findOneBy({ email: email });
    if(user!=null){
      return (await this.jobSeekerRepository.findOne({ where: { id: user.id }, relations: ['jobPreferences'] })).jobPreferences;
    }
    else{
      return null;
    }
  }

  async getExperience(email: string): Promise<object> {
    const user: JobSeekerDTO = await this.jobSeekerRepository.findOneBy({ email: email });
    if(user!=null){
      return (await this.jobSeekerRepository.findOne({ where: { id: user.id }, relations: ['experience'] })).experience;
    }
    else{
      return null;
    }
  }

  async getAddress(email: string): Promise<object> {
    const user: any = await this.jobSeekerRepository.findOneBy({ email: email });
    if(user!=null){
      return await this.addressRepository.findOne({ where: { id: user.address } });
    }
    else{
      return null;
    }
  }

  async sendEmail(receiverEmail: string, subject: string, text: string): Promise<void> {

    return await this.mailerService.sendMail({
        to: receiverEmail,
        subject: subject,
        text: text,
    });

  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JobSeekerEntity } from './jobSeeker.entity';
import { get } from 'http';

@Injectable()
export class JobSeekerService {
  constructor(@InjectRepository(JobSeekerEntity) private jobSeekerRepository: Repository<JobSeekerEntity>) {}

  async getAllJobSeekers(): Promise<JobSeekerEntity[]> {
    return await this.jobSeekerRepository.find();
  }

  async updatePassword(userpass: object): Promise<void> {
    const user = await this.jobSeekerRepository.findOne({ where: { username: userpass['username'] } });
    if(user.password == userpass['currentPassword']){
      user.password = userpass['newPassword'];
    }
    await this.jobSeekerRepository.save(user); 
  }

  async getJobSeeker(username: string): Promise<JobSeekerEntity> {
    return await this.jobSeekerRepository.findOne({ where: { username: username } });
  }

  async createJobSeeker(jobSeeker: JobSeekerEntity): Promise<JobSeekerEntity> {
    return await this.jobSeekerRepository.save(jobSeeker);
  }

  async deleteJobSeeker(username: string): Promise<void> {
    await this.jobSeekerRepository.delete(username);
  }
}

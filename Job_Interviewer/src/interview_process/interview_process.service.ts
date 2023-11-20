import { Inject, Injectable } from '@nestjs/common';
import { CreateInterviewProcessDto } from './dto/create-interview_process.dto';
import { UpdateInterviewProcessDto } from './dto/update-interview_process.dto';
import { interview_process } from './entity/interview_process.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InterviewProcessService {
  @InjectRepository(interview_process)
  private interview_process_repo : Repository <interview_process>;

  async create(createInterviewProcessDto: CreateInterviewProcessDto) {
    return await this.interview_process_repo.insert(createInterviewProcessDto);
  }

  async findAll() :Promise<any> {
    return await this.interview_process_repo.find({relations:{interviewer: true}});
  }

  //postman search query
  async findOne(id: number) {
    return await this.interview_process_repo.findOneBy({id:id});
  }

  async update(id: number, updateInterviewProcessDto: UpdateInterviewProcessDto) {
    return await this.interview_process_repo.update(id, updateInterviewProcessDto);
  }

  async remove(id: number) {
    return await this.interview_process_repo.delete(id);
  }
}

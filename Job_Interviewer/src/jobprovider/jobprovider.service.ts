import { Injectable } from '@nestjs/common';
import { CreateJobproviderDto } from './dto/create-jobprovider.dto';
import { UpdateJobproviderDto } from './dto/update-jobprovider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Jobprovider } from './entities/jobprovider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobproviderService {

  @InjectRepository(Jobprovider)
  private jobproviderRepo : Repository<Jobprovider> 

  async create(createJobproviderDto: CreateJobproviderDto) {
    return await this.jobproviderRepo.insert(createJobproviderDto);
  }

  async findAll() {
    return await this.jobproviderRepo.find();
  }

  async findOne(id: number) {
    return await this.jobproviderRepo.findOneBy({id:id});
  }

  async update(id: number, updateJobproviderDto: UpdateJobproviderDto) {
    return await this.jobproviderRepo.update(id, updateJobproviderDto);
  }

  async remove(id: number) {
    return await this.jobproviderRepo.delete(id);
  }
}

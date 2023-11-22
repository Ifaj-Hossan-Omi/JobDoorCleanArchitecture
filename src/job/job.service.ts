import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { JobEntity } from 'src/entities/job.entity';
import { JobProviderEntity } from 'src/entities/jobProvider.entity';
import { Repository } from 'typeorm';
import { JobCreateRequestDTO } from './dtos/jobDTOs/jobCreateRequest.dto';
import { JobUpdateRequestDTO } from './dtos/jobDTOs/jobUpdateRequest.dto';
import { UUID } from 'crypto';

@Injectable()
export class JobService {
    constructor(
        @InjectRepository(JobEntity) private readonly jobRepository: Repository<JobEntity>,
        @InjectRepository(JobProviderEntity) private readonly jobProviderRepository: Repository<JobProviderEntity>
    ) { }

    async findPosttedJobByJobProviderId(jobProviderId: UUID): Promise<JobEntity[]> {
        const jobs = await this.jobRepository
            .createQueryBuilder('job')
            .where('job.jobProviderId = :jobProviderId', { jobProviderId })
            .getMany();
        return jobs;
    }

    async postJob(jobDto: JobCreateRequestDTO): Promise<JobEntity> {
        const jobProvider = await this.jobProviderRepository.findOneBy({ id: jobDto.jobProviderId });
        if (!jobProvider) {
            throw new Error("Job provider not found");
        }
        const job = plainToClass(JobEntity, jobDto);
        job.jobProvider = jobProvider;
        try {
            return await this.jobRepository.save(job);
        }
        catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async updateJob(jobDto: JobUpdateRequestDTO): Promise<JobEntity> {
        const job = await this.jobRepository.findOneBy({ id: jobDto.id });
        if (!job) {
            throw new Error("Job is not found");
        }
        await this.jobRepository.update(job.id, jobDto);
        return await this.jobRepository.findOneBy({ id: job.id });
    }

    async showPostedJobs(jobProviderId: UUID): Promise<JobEntity[]> {
        const jobs = await this.jobRepository
            .createQueryBuilder('job')
            .where('job.jobProviderId = :jobProviderId', { jobProviderId })
            .getMany();
        if (!jobs || jobs.length == 0) {
            throw new Error("Job provider not found");
        }
        return jobs;
    }

    async searchJobById(id: UUID): Promise<JobEntity> {
        const job = await this.jobRepository.findOneBy({ id: id });
        console.log(job);
        if (!job) {
            throw new Error("Job not found");
        }
        return job;
    }

    async searchJobByTitle(title: string): Promise<JobEntity[]> {
        const jobs = await this.jobRepository
            .createQueryBuilder('job')
            .where('job.title like :title', { title: `%${title}%` })
            .getMany();
        if (!jobs || jobs.length == 0) {
            throw new Error("Job not found");
        }
        return jobs;
    }

    async getAllJobs(): Promise<JobEntity[]> {
        const jobs = await this.jobRepository.find();
        if (!jobs || jobs.length == 0) {
            throw new Error("No Jobs found");
        }
        return jobs;
    }

    async deleteJob(jobId: UUID, jobProviderId: UUID): Promise<void> {

        const job = await this.jobRepository
            .createQueryBuilder('job')
            .where('job.jobProviderId = :jobProviderId and job.id = :jobId', { jobProviderId, jobId })
            .getOne();
        if (!job) {
            throw new Error("Job not found");
        }
        await this.jobRepository.delete(job.id);
    }

    async deleteAllJobsByJobProvider(jobProviderId: UUID): Promise<void> {
        const jobs = await this.findPosttedJobByJobProviderId(jobProviderId);
        if (!jobs || jobs.length == 0) {
            throw new Error("No Jobs found");
        }
        console.log(jobs);

        await this.jobRepository
            .createQueryBuilder('job')
            .delete()
            .from(JobEntity)
            .where('job.jobProviderId = :jobProviderId', { jobProviderId })
            .execute();
    }

    async deleteAllJobs(): Promise<void> {
        if (!await this.jobRepository.find()) {
            throw new Error("No Jobs found");
        }
        await this.jobRepository.delete({});
    }


}
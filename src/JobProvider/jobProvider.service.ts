import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobProviderEntity } from '../entities/jobProvider.entity';
import { Repository } from 'typeorm';
import { JobProviderRequestDTO } from './DTOs/JobProviderDTOs/jobProviderRequest.dto';
import { UUID } from 'crypto';
import { JobProviderUpdateRequestDTO } from './DTOs/JobProviderDTOs/jobProviderUpdateRequest.dto';
import * as bcrypt from 'bcrypt';
import { JobEntity } from '../entities/job.entity';
import { plainToClass } from 'class-transformer';
import { InterviewerEntity } from 'src/entities/interviewer.entity';
import { InterviewerCreateRequestDTO } from './DTOs/interviewerDTOs/interviewerCreateRequest.dto';
import { AssignInterViewerRequestDTO } from './DTOs/JobProviderDTOs/assignInterViewerRequest.dto';
import { DeallocateInterViewerRequestDTO } from './DTOs/JobProviderDTOs/assignInterViewerRequest.dto copy';
import { CompanyCreateRequestDTO } from './DTOs/compnayDTOs/companyCreateRequest.dto';
import { CompanyInfoEntity } from 'src/entities/company.entity';
import { JobSeekerEntity } from 'src/entities/jobSeeker.entity';
import { AppliedJobsEntity } from 'src/entities/appliedJobs.entity';
import { ApplyJobDTO } from './DTOs/appliedJobDTOs/appllyJob.dto';
import { ApplicationJobStatus } from 'src/Enums/applicationJobStatus.enum';
import { AppliedJob } from './DTOs/appliedJobDTOs/appliedJob.dto';

@Injectable()
export class JobProviderService {
    constructor(
        @InjectRepository(JobProviderEntity) private readonly jobProviderRepository: Repository<JobProviderEntity>,
        @InjectRepository(JobEntity) private readonly jobRepository: Repository<JobEntity>,
        @InjectRepository(InterviewerEntity) private readonly interviewerRepository: Repository<InterviewerEntity>,
        @InjectRepository(CompanyInfoEntity) private readonly companyInfoRepository: Repository<CompanyInfoEntity>,
        @InjectRepository(JobSeekerEntity) private readonly jobSeekerRepository: Repository<JobSeekerEntity>,
        @InjectRepository(AppliedJobsEntity) private readonly appliedJobsRepository: Repository<AppliedJobsEntity>
    ) { }

    async createJobProvider(jobProvider: JobProviderRequestDTO): Promise<JobProviderEntity> {
        try {
            const salt = await bcrypt.genSalt()
            const hassedpassed = await bcrypt.hash(jobProvider.password, salt);
            jobProvider.password = hassedpassed;
            return await this.jobProviderRepository.save(jobProvider);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    async getAllJobProvider(): Promise<JobProviderEntity[]> {
        if (!this.jobProviderRepository) {
            throw new Error("Job provider not found");
        }
        return this.jobProviderRepository.find();
    }
    async getJobProviderById(id: UUID): Promise<JobProviderEntity> {
        if (!id) {
            throw new Error("Id is not provided");
        }
        const JobProvider = await this.jobProviderRepository.findOneBy({ id: id });
        if (!JobProvider) {
            throw new Error("Job provider not found");
        }
        return JobProvider;
    }
    async getJobProviderByUsername(username: string): Promise<JobProviderEntity> {
        if (!username) {
            throw new Error("username is not provided");
        }
        const JobProvider = await this.jobProviderRepository.findOneBy({ username: username });
        if (!JobProvider) {
            throw new Error("Job provider not found");
        }
        return JobProvider;
    }
    async updateUser(updatedJobProvider: JobProviderUpdateRequestDTO): Promise<JobProviderEntity> {
        const jobProvider = await this.jobProviderRepository.findOneBy({ id: updatedJobProvider.id });
        if (!jobProvider) {
            throw new Error("Job provider not found");
        }
        await this.jobProviderRepository.update(updatedJobProvider.id, updatedJobProvider);
        return await this.jobProviderRepository.findOneBy({ id: updatedJobProvider.id });
    }

    async deleteUser(id: UUID): Promise<void> {
        const jobProvider = await this.jobProviderRepository.findOneBy({ id: id });
        if (!jobProvider) {
            throw new Error("Job provider not found");
        }

        await this.jobProviderRepository.delete(id);
    }

    async createInterviewer(interviewerDto: InterviewerCreateRequestDTO): Promise<InterviewerEntity> {
        const jobProvider = await this.jobProviderRepository.findOneBy({ id: interviewerDto.jobProviderId });
        if (!jobProvider) {
            throw new Error("Job provider not found");
        }
        const interviewer = plainToClass(JobEntity, interviewerDto);
        interviewer.jobProvider = jobProvider;
        try {
            return await this.interviewerRepository.save(interviewer);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async assignInterviewer(assignInterviewerDto: AssignInterViewerRequestDTO, jobProviderId: UUID): Promise<any> {
        const job = await this.jobRepository.findOne({
            where: { id: assignInterviewerDto.jobId, jobProvider: { id: jobProviderId } },
        });
        if (!job) {
            throw new Error("Job not found");
        }
        const interviewer = await this.interviewerRepository.findOne({
            where: { id: assignInterviewerDto.interviewerId, jobProvider: { id: jobProviderId } },
        })
        if (!interviewer) {
            throw new Error("Interviewer not found");
        }
        if (!job.interviewers) {
            job.interviewers = [];
        }
        job.interviewers.push(interviewer);
        await this.jobRepository.save(job);
        return { message: "Interviewer assigned successfully" };
    }

    async deallocateInterviewer(deallocateInterviewerDto: DeallocateInterViewerRequestDTO, jobProviderId: UUID): Promise<any> {
        const job = await this.jobRepository.findOne({
            where: { id: deallocateInterviewerDto.jobId, jobProvider: { id: jobProviderId } },
        });
        if (!job) {
            throw new Error("Job not found");
        }
        const interviewer = await this.interviewerRepository.findOne({
            where: { id: deallocateInterviewerDto.interviewerId, jobProvider: { id: jobProviderId } },
        })
        if (!interviewer) {
            throw new Error("Interviewer not found");
        }
        if (!job.interviewers) {
            job.interviewers = [];
        }
        job.interviewers = job.interviewers.filter(interviewer => interviewer.id != deallocateInterviewerDto.interviewerId);
        await this.jobRepository.save(job);
        return { message: "Interviewer deallocated successfully" };
    }

    async getProfilePicture(jobProviderId: UUID): Promise<JobProviderEntity> {
        const job = await this.jobProviderRepository
            .createQueryBuilder('jobProvider')
            .where('jobProvider.id = :jobProviderId', { jobProviderId })
            .getOne();
        if (!job) {
            throw new Error("Job provider not found");
        }
        return job;
    }

    async updateProfilePicture(jobProviderId: UUID, profilePicture: string): Promise<JobProviderEntity> {
        const jobProvider = await this.jobProviderRepository.findOneBy({ id: jobProviderId });
        if (!jobProvider) {
            throw new Error("Job provider not found");
        }
        jobProvider.profilePicture = profilePicture;
        await this.jobProviderRepository.save(jobProvider);
        return jobProvider;
    }

    async addCompanyInfo(companyInfo: CompanyCreateRequestDTO): Promise<CompanyInfoEntity> {
        const jobProvider = await this.jobProviderRepository.findOneBy({ id: companyInfo.jobProviderId });
        if (!jobProvider) {
            throw new Error("Job provider not found");
        }
        const company = plainToClass(CompanyInfoEntity, companyInfo);
        company.jobProvider = jobProvider;
        try {
            return await this.companyInfoRepository.save(company);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async createJobSeeker(jobSeeker: JobSeekerEntity): Promise<JobSeekerEntity> {
        try {
            return await this.jobSeekerRepository.save(jobSeeker);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    async applyToJob(appliedJob: ApplyJobDTO): Promise<AppliedJobsEntity> {
        const job = await this.jobRepository.findOneBy({ id: appliedJob.jobId });
        if (!job) {
            throw new Error("Job not found");
        }
        const jobSeeker = await this.jobSeekerRepository.findOneBy({ id: appliedJob.jobSeekerId });
        if (!jobSeeker) {
            throw new Error("Job seeker not found");
        }
        return await this.appliedJobsRepository.save(appliedJob)
    }

    async shortlistJobSeeker(appliedJob: AppliedJob): Promise<AppliedJobsEntity> {
        const job = await this.jobRepository.findOneBy({ id: appliedJob.jobId });
        if (!job) {
            throw new Error("Job not found");
        }
        const applied = await this.appliedJobsRepository.findOneBy({ jobId: appliedJob.jobId, jobSeekerId: appliedJob.jobSeekerId });
        if (!applied) {
            throw new Error("Job seeker not found");
        }
        applied.status = ApplicationJobStatus.Shortlisted;
        await this.appliedJobsRepository.update(applied.id, applied);
        return applied;
    }

    async rejectJobSeeker(appliedJob: AppliedJob): Promise<AppliedJobsEntity> {
        const job = await this.jobRepository.findOneBy({ id: appliedJob.jobId });
        if (!job) {
            throw new Error("Job not found");
        }
        const applied = await this.appliedJobsRepository.findOneBy({ jobId: appliedJob.jobId, jobSeekerId: appliedJob.jobSeekerId });
        if (!applied) {
            throw new Error("Job seeker not found");
        }
        applied.status = ApplicationJobStatus.Rejected;
        await this.appliedJobsRepository.update(applied.id, applied);
        return applied;
    }

    async approveJobSeekerForInterview(appliedJob: AppliedJob): Promise<AppliedJobsEntity> {
        const job = await this.jobRepository.findOneBy({ id: appliedJob.jobId });
        if (!job) {
            throw new Error("Job not found");
        }
        const applied = await this.appliedJobsRepository.findOneBy({ jobId: appliedJob.jobId, jobSeekerId: appliedJob.jobSeekerId });
        if (!applied) {
            throw new Error("Job seeker not found");
        }
        applied.status = ApplicationJobStatus.Interviewing;
        await this.appliedJobsRepository.update(applied.id, applied);
        return applied;
    }

    async hiredJobSeeker(appliedJob: AppliedJob): Promise<AppliedJobsEntity> {
        const job = await this.jobRepository.findOneBy({ id: appliedJob.jobId });
        if (!job) {
            throw new Error("Job not found");
        }
        const applied = await this.appliedJobsRepository.findOneBy({ jobId: appliedJob.jobId, jobSeekerId: appliedJob.jobSeekerId });
        if (!applied) {
            throw new Error("Job seeker not found");
        }
        applied.status = ApplicationJobStatus.Hired;
        await this.appliedJobsRepository.update(applied.id, applied);
        return applied;
    }





    // async login(jobProviderLoginDTO: JobProviderLoginDTO): Promise<JobProviderEntity> {
    //     // jobProviderLoginDTO.password = await bcrypt.hash(jobProviderLoginDTO.password, 10);
    //     const jobProvider = await this.jobProviderRepository.findOneBy({ username: jobProviderLoginDTO.username });
    //     if (!jobProvider) {
    //         throw new Error("Invalid username or password");
    //     }
    //     const isMatch = await bcrypt.compare(jobProviderLoginDTO.password, jobProvider.password);
    //     if (!isMatch) {
    //         throw new Error("Invalid username or password");
    //     }
    //     return jobProvider;
    // }s

}

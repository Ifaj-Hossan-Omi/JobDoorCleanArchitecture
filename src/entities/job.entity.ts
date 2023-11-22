import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { JobProviderEntity } from "./jobProvider.entity";
import { JobType } from "../Enums/jobType.enum";
import { JobLocationType } from '../Enums/jobLocationType.enum';
import { InterviewerEntity } from "./interviewer.entity";
import { AppliedJobsEntity } from "./appliedJobs.entity";

@Entity("job")
export class JobEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column()
    title: string;
    @Column()
    jobType: JobType;
    @Column()
    description: string;
    @Column()
    salary: number;
    @Column()
    vacancy: number;
    @Column()
    address: string;
    @Column()
    JobLocationType: JobLocationType;
    @ManyToOne(() => JobProviderEntity, jobProvider => jobProvider.jobs)
    jobProvider: JobProviderEntity;
    @ManyToMany(() => InterviewerEntity, interviewerEntity => interviewerEntity.jobs)
    @JoinTable()
    interviewers: InterviewerEntity[];
}
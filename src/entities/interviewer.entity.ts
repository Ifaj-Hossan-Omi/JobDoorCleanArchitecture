import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { JobProviderEntity } from "./jobProvider.entity";
import { JobEntity } from "./job.entity";

@Entity("interviewer")
export class InterviewerEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column()
    name: string;
    @ManyToOne(() => JobProviderEntity, jobProvider => jobProvider.interviewers)
    jobProvider: JobProviderEntity;
    @ManyToMany(() => JobEntity, jobEntity => jobEntity.interviewers)
    jobs: JobEntity[];

}
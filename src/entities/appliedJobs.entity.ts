import { ApplicationJobStatus } from "src/Enums/applicationJobStatus.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("appliedJobs")
export class AppliedJobsEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column("uuid")
    jobId: string;
    @Column("uuid")
    jobSeekerId: string;
    @Column()
    status: ApplicationJobStatus;
}
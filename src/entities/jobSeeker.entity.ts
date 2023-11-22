import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("jobSeeker")
export class JobSeekerEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column()
    name: string;
    // @ManyToMany(() => JobEntity, jobProvider => jobProvider.interviewers)
    // jobProvider: JobProviderEntity;
}
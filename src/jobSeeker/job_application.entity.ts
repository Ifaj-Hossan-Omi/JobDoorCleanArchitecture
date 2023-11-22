import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { JobSeeker } from './jobSeeker.entity';

@Entity('job_application')
export class JobApplication {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    jobId: string;

    @Column('date')
    appliedOn: Date;

    @Column()
    status: string;

    @ManyToOne(() => JobSeeker, jobSeeker => jobSeeker.applicationHistory)
    jobSeeker: JobSeeker;
}
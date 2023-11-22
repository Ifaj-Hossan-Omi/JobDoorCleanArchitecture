import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { JobSeeker } from './jobSeeker.entity';

@Entity('job_preferences')
export class JobPreferences {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('simple-array')
    preferredIndustries: string[];

    @Column('simple-array')
    jobTypes: string[];

    @Column()
    desiredSalary: string;

    @Column('simple-array')
    locations: string[];

    @Column({type: 'enum', enum: ['remote', 'on-site', 'hybrid']})
    workLocation: string;

    @ManyToOne(() => JobSeeker, jobSeeker => jobSeeker.jobPreferences)
    jobSeeker: JobSeeker;
}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Experience } from './experience.entity';
import { JobApplication } from './job_application.entity';
import { JobPreferences } from './job_preferences.entity';
import { Address } from './address.entity';

@Entity('job_seeker')
export class JobSeeker {
    @PrimaryColumn()
    id: string;

    @Column({ unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ nullable: true })
    externalId: string; // Unique identifier from Google or Facebook

    @Column({ nullable: true })
    accessToken: string; // Access token received during OAuth

    @Column({ nullable: true })
    refreshToken: string; // Refresh token received during OAuth

    @Column({ nullable: true })
    authProvider: string; // Authentication provider (e.g., 'Google', 'Facebook')

    @Column({ nullable: true })
    profilePicture: string;

    @Column({ nullable: true })
    coverPhoto: string;

    @Column({ nullable: true })
    contactNumber: string;

    @Column({ nullable: true })
    professionalTitle: string;

    @Column({ nullable: true })
    summary: string;

    @OneToMany(() => Experience, experience => experience.jobSeeker, { cascade: true, nullable: true })
    experience: Experience[];

    @Column({ nullable: true })
    resume: string;

    @Column({ nullable: true })
    profileVisibility: string;

    @OneToMany(() => JobApplication, application => application.jobSeeker, { cascade:true, nullable: true })
    applicationHistory: JobApplication[];

    @OneToMany(() => JobPreferences, preferences => preferences.jobSeeker, { cascade:true, nullable: true })
    jobPreferences: JobPreferences[];

    @OneToOne(() => Address, address => address.jobSeeker, { cascade: true, nullable: true })
    @JoinColumn()
    address: Address;
}


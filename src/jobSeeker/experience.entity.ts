import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { JobSeeker } from './jobSeeker.entity';


@Entity('experience')
export class Experience {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    companyName: string;

    @Column()
    roleTitle: string;

    @Column('date')
    startDate: Date;

    @Column('date', { nullable: true })
    endDate: Date | null;

    @Column()
    description: string;

    @ManyToOne(() => JobSeeker, jobSeeker => jobSeeker.experience)
    jobSeeker: JobSeeker;
}
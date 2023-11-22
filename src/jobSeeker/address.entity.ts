import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { JobSeeker } from './jobSeeker.entity';

@Entity('address')
export class Address {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    street: string;

    @Column()
    city: string;

    @Column({ nullable: true })
    state: string;

    @Column()
    country: string;

    @Column({ nullable: true })
    postalCode: string;

    @OneToOne(() => JobSeeker, jobSeeker => jobSeeker.address)
    @JoinColumn()
    jobSeeker: JobSeeker;
}
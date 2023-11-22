import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  domain: string;

  @Column()
  description: string;

  @Column({type: 'decimal'})
  salary: number;

  @Column()
  location: string;

  @Column({ type: 'enum', enum: ['remote', 'on-site', 'hybrid'] })
  workLocation: string;

  @Column()
  company: string;

  @Column({ type: 'timestamp' })
  postedDate: Date;

  @Column({ type: 'enum', enum: ['full-time', 'part-time', 'internship', 'contract', 'temporary', 'volunteer', 'per-diem', 'other'] })
  jobPeriod: string;
}

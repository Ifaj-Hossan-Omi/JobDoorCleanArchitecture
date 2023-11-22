import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { JobEntity } from "./job.entity";
import { InterviewerEntity } from "./interviewer.entity";
import * as bcrypt from 'bcrypt';
import { CompanyInfoEntity } from "./company.entity";

@Entity("jobProvider")
export class JobProviderEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string
    @Column()
    name: string;
    @Column()
    profilePicture: string;
    @Column({ unique: true })
    email: string;
    @Column({ unique: true })
    username: string;
    @Column()
    password: string;
    @Column()
    company: string;
    @Column()
    address: string;
    @OneToMany(() => JobEntity, jobEntity => jobEntity.jobProvider, { cascade: true })
    jobs: JobEntity[];
    @OneToMany(() => InterviewerEntity, interviewerEntity => interviewerEntity.jobProvider, { cascade: true })
    interviewers: InterviewerEntity[];
    @OneToOne(() => CompanyInfoEntity, companyInfoEntity => companyInfoEntity.jobProvider, { cascade: true })
    companyInfo: CompanyInfoEntity;

    // // @BeforeInsert()
    // @BeforeUpdate()
    // async hashPassword() {
    //     const salt = await bcrypt.genSalt()
    //     this.password = await bcrypt.hash(this.password, salt);
    // }
}
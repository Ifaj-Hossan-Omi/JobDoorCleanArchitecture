import { Entity, Column } from "typeorm";
import { isNull } from "util";

@Entity("jobSeeker")
export class JobSeekerEntity{
    @Column({primary:true})
    username: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    phone: string;
    @Column()
    location: string;
    @Column("text", {array:true})
    skills: string[];
    @Column("text", {array:true})
    experience: string[];
    @Column("text", {array:true})
    education: string[];
    @Column()
    resume: string;
    @Column("text", {array:true, nullable:true})
    appliedJobs: string[];
}
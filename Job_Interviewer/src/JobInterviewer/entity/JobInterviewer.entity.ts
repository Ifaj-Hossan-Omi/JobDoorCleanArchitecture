import { interview_process } from "src/interview_process/entity/interview_process.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

@Entity()
export class interviewer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    uname: string;

    @Column()
    pass: string;

    @Column()
    mail : string;

    @Column()
    fname: string;

    @Column()
    lname : string;

    @Column()
    company : string;

    @Column()
    position : string;

    @Column()
    job_provider_id: number;

    @Column({nullable:true})
    image: string;

    @OneToMany(()=> interview_process, (interview_process) => interview_process.interviewer)
    interview_processes: interview_process[];
}
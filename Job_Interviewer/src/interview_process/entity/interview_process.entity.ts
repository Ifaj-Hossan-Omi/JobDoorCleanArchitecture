import { interviewer } from "src/JobInterviewer/entity/JobInterviewer.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"

@Entity()
export class interview_process {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    job_provider_id: number;

    @Column()
    job_seeker_id: number;

    @Column()
    date : Date;

    @Column()
    venue : string;

    @Column()
    status: string;

    @ManyToOne(()=> interviewer, (interviewer)=> interviewer.id)
    interviewer : interviewer;

    @Column()
    interview_steps : string;

    @Column()
    interview_type: string;

   
}
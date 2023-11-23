import { interview_process } from "src/interview_process/entity/interview_process.entity";
export declare class interviewer {
    id: number;
    uname: string;
    pass: string;
    mail: string;
    fname: string;
    lname: string;
    company: string;
    position: string;
    job_provider_id: number;
    image: string;
    interview_processes: interview_process[];
}

import { interviewer } from "src/JobInterviewer/entity/JobInterviewer.entity";
export declare class interview_process {
    id: number;
    job_provider_id: number;
    job_seeker_id: number;
    date: Date;
    venue: string;
    status: string;
    interviewer: interviewer;
    interview_steps: string;
    interview_type: string;
}

import { IsDefined } from "class-validator";
import { Job } from "./job.dto";
import { JobSeeker } from "./jobSeeker.dto";

export class ApplyJob{
    @IsDefined()
    jobSeeker: JobSeeker;
    @IsDefined()
    job: Job;
}
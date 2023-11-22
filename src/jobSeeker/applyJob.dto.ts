import { IsDefined } from "class-validator";
import { JobDTO } from "./job.dto";
import { JobSeekerDTO } from "./jobSeeker.dto";

export class ApplyJob{
    @IsDefined()
    jobSeeker: JobSeekerDTO;
    @IsDefined()
    job: JobDTO;
}
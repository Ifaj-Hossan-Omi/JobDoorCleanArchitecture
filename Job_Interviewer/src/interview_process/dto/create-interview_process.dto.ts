import { IsString, IsNotEmpty, Matches, IsDateString, IsAlpha, IsNumberString, isNotEmpty } from "class-validator"
import { interviewer } from "src/JobInterviewer/entity/JobInterviewer.entity";
 
export class CreateInterviewProcessDto {
    @IsNotEmpty()
    @IsNumberString()
    job_provider_id: number;
   
    @IsNotEmpty()
    @IsNumberString()
    job_seeker_id: number;
 
    @IsNotEmpty()
    @IsDateString()
    date : Date;
 
    // @IsDateString()
    // time: Date;
 
    @IsNotEmpty()
    @Matches(/[A-Za-z]+$/)
    venue : string;
 
    // @IsInt()
 
    status: string;
 
    interviewer : interviewer;
 
    @IsNotEmpty()
    @IsString()
    interview_steps : string;
 
    @IsNotEmpty()
    @IsNotEmpty()
    interview_type: string;
   
}
 
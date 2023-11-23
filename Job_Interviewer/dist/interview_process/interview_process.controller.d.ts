import { InterviewProcessService } from './interview_process.service';
import { CreateInterviewProcessDto } from './dto/create-interview_process.dto';
import { UpdateInterviewProcessDto } from './dto/update-interview_process.dto';
export declare class InterviewProcessController {
    private readonly interviewProcessService;
    constructor(interviewProcessService: InterviewProcessService);
    create(createInterviewProcessDto: CreateInterviewProcessDto, session: any): Promise<import("typeorm").InsertResult>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<import("./entity/interview_process.entity").interview_process>;
    update(id: string, updateInterviewProcessDto: UpdateInterviewProcessDto, session: any): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}

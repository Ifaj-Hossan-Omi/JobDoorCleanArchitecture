import { CreateInterviewProcessDto } from './dto/create-interview_process.dto';
import { UpdateInterviewProcessDto } from './dto/update-interview_process.dto';
import { interview_process } from './entity/interview_process.entity';
export declare class InterviewProcessService {
    private interview_process_repo;
    create(createInterviewProcessDto: CreateInterviewProcessDto): Promise<import("typeorm").InsertResult>;
    findAll(): Promise<any>;
    findOne(id: number): Promise<interview_process>;
    update(id: number, updateInterviewProcessDto: UpdateInterviewProcessDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}

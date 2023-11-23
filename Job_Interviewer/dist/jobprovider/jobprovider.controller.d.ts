import { JobproviderService } from './jobprovider.service';
import { CreateJobproviderDto } from './dto/create-jobprovider.dto';
import { UpdateJobproviderDto } from './dto/update-jobprovider.dto';
export declare class JobproviderController {
    private readonly jobproviderService;
    constructor(jobproviderService: JobproviderService);
    create(createJobproviderDto: CreateJobproviderDto): Promise<import("typeorm").InsertResult>;
    findAll(): Promise<import("./entities/jobprovider.entity").Jobprovider[]>;
    findOne(id: string): Promise<import("./entities/jobprovider.entity").Jobprovider>;
    update(id: string, updateJobproviderDto: UpdateJobproviderDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}

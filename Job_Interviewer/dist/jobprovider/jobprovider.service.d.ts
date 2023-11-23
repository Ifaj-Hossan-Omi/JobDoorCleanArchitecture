import { CreateJobproviderDto } from './dto/create-jobprovider.dto';
import { UpdateJobproviderDto } from './dto/update-jobprovider.dto';
import { Jobprovider } from './entities/jobprovider.entity';
export declare class JobproviderService {
    private jobproviderRepo;
    create(createJobproviderDto: CreateJobproviderDto): Promise<import("typeorm").InsertResult>;
    findAll(): Promise<Jobprovider[]>;
    findOne(id: number): Promise<Jobprovider>;
    update(id: number, updateJobproviderDto: UpdateJobproviderDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}

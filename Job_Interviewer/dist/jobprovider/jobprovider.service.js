"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobproviderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jobprovider_entity_1 = require("./entities/jobprovider.entity");
const typeorm_2 = require("typeorm");
let JobproviderService = class JobproviderService {
    async create(createJobproviderDto) {
        return await this.jobproviderRepo.insert(createJobproviderDto);
    }
    async findAll() {
        return await this.jobproviderRepo.find();
    }
    async findOne(id) {
        return await this.jobproviderRepo.findOneBy({ id: id });
    }
    async update(id, updateJobproviderDto) {
        return await this.jobproviderRepo.update(id, updateJobproviderDto);
    }
    async remove(id) {
        return await this.jobproviderRepo.delete(id);
    }
};
exports.JobproviderService = JobproviderService;
__decorate([
    (0, typeorm_1.InjectRepository)(jobprovider_entity_1.Jobprovider),
    __metadata("design:type", typeorm_2.Repository)
], JobproviderService.prototype, "jobproviderRepo", void 0);
exports.JobproviderService = JobproviderService = __decorate([
    (0, common_1.Injectable)()
], JobproviderService);
//# sourceMappingURL=jobprovider.service.js.map
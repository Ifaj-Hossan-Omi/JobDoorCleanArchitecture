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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobproviderController = void 0;
const common_1 = require("@nestjs/common");
const jobprovider_service_1 = require("./jobprovider.service");
const create_jobprovider_dto_1 = require("./dto/create-jobprovider.dto");
const update_jobprovider_dto_1 = require("./dto/update-jobprovider.dto");
let JobproviderController = class JobproviderController {
    constructor(jobproviderService) {
        this.jobproviderService = jobproviderService;
    }
    create(createJobproviderDto) {
        return this.jobproviderService.create(createJobproviderDto);
    }
    findAll() {
        return this.jobproviderService.findAll();
    }
    findOne(id) {
        return this.jobproviderService.findOne(+id);
    }
    update(id, updateJobproviderDto) {
        return this.jobproviderService.update(+id, updateJobproviderDto);
    }
    remove(id) {
        return this.jobproviderService.remove(+id);
    }
};
exports.JobproviderController = JobproviderController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_jobprovider_dto_1.CreateJobproviderDto]),
    __metadata("design:returntype", void 0)
], JobproviderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], JobproviderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobproviderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_jobprovider_dto_1.UpdateJobproviderDto]),
    __metadata("design:returntype", void 0)
], JobproviderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], JobproviderController.prototype, "remove", null);
exports.JobproviderController = JobproviderController = __decorate([
    (0, common_1.Controller)('jobprovider'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe),
    __metadata("design:paramtypes", [jobprovider_service_1.JobproviderService])
], JobproviderController);
//# sourceMappingURL=jobprovider.controller.js.map
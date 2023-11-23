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
exports.InterviewProcessController = void 0;
const common_1 = require("@nestjs/common");
const interview_process_service_1 = require("./interview_process.service");
const create_interview_process_dto_1 = require("./dto/create-interview_process.dto");
const update_interview_process_dto_1 = require("./dto/update-interview_process.dto");
const interviewer_guard_1 = require("../JobInterviewer/interviewer.guard");
let InterviewProcessController = class InterviewProcessController {
    constructor(interviewProcessService) {
        this.interviewProcessService = interviewProcessService;
    }
    create(createInterviewProcessDto, session) {
        const interviewer_id = session.user_id;
        createInterviewProcessDto.interviewer = interviewer_id;
        createInterviewProcessDto.status = "Pending";
        return this.interviewProcessService.create(createInterviewProcessDto);
    }
    findAll() {
        return this.interviewProcessService.findAll();
    }
    findOne(id) {
        return this.interviewProcessService.findOne(+id);
    }
    update(id, updateInterviewProcessDto, session) {
        const interviewer_id = session.user_id;
        updateInterviewProcessDto.interviewer = interviewer_id;
        updateInterviewProcessDto.status = "Pending";
        return this.interviewProcessService.update(+id, updateInterviewProcessDto);
    }
    remove(id) {
        return this.interviewProcessService.remove(+id);
    }
};
exports.InterviewProcessController = InterviewProcessController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_interview_process_dto_1.CreateInterviewProcessDto, Object]),
    __metadata("design:returntype", void 0)
], InterviewProcessController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InterviewProcessController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InterviewProcessController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_interview_process_dto_1.UpdateInterviewProcessDto, Object]),
    __metadata("design:returntype", void 0)
], InterviewProcessController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InterviewProcessController.prototype, "remove", null);
exports.InterviewProcessController = InterviewProcessController = __decorate([
    (0, common_1.Controller)('interview-process'),
    (0, common_1.UseGuards)(interviewer_guard_1.interviewerGuard),
    __metadata("design:paramtypes", [interview_process_service_1.InterviewProcessService])
], InterviewProcessController);
//# sourceMappingURL=interview_process.controller.js.map
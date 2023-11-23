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
exports.interview_process = void 0;
const JobInterviewer_entity_1 = require("../../JobInterviewer/entity/JobInterviewer.entity");
const typeorm_1 = require("typeorm");
let interview_process = class interview_process {
};
exports.interview_process = interview_process;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], interview_process.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], interview_process.prototype, "job_provider_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], interview_process.prototype, "job_seeker_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], interview_process.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], interview_process.prototype, "venue", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], interview_process.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => JobInterviewer_entity_1.interviewer, (interviewer) => interviewer.id),
    __metadata("design:type", JobInterviewer_entity_1.interviewer)
], interview_process.prototype, "interviewer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], interview_process.prototype, "interview_steps", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], interview_process.prototype, "interview_type", void 0);
exports.interview_process = interview_process = __decorate([
    (0, typeorm_1.Entity)()
], interview_process);
//# sourceMappingURL=interview_process.entity.js.map
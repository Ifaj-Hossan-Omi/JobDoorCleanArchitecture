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
exports.interviewer = void 0;
const interview_process_entity_1 = require("../../interview_process/entity/interview_process.entity");
const typeorm_1 = require("typeorm");
let interviewer = class interviewer {
};
exports.interviewer = interviewer;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], interviewer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], interviewer.prototype, "uname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], interviewer.prototype, "pass", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], interviewer.prototype, "mail", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], interviewer.prototype, "fname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], interviewer.prototype, "lname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], interviewer.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], interviewer.prototype, "position", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], interviewer.prototype, "job_provider_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], interviewer.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => interview_process_entity_1.interview_process, (interview_process) => interview_process.interviewer),
    __metadata("design:type", Array)
], interviewer.prototype, "interview_processes", void 0);
exports.interviewer = interviewer = __decorate([
    (0, typeorm_1.Entity)()
], interviewer);
//# sourceMappingURL=JobInterviewer.entity.js.map
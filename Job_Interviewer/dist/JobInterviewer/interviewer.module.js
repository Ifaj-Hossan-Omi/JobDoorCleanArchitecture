"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobInterviewerModule = void 0;
const common_1 = require("@nestjs/common");
const interviewer_service_1 = require("./interviewer.service");
const interviewer_controller_1 = require("./interviewer.controller");
const typeorm_1 = require("@nestjs/typeorm");
const JobInterviewer_entity_1 = require("./entity/JobInterviewer.entity");
let jobInterviewerModule = class jobInterviewerModule {
};
exports.jobInterviewerModule = jobInterviewerModule;
exports.jobInterviewerModule = jobInterviewerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([JobInterviewer_entity_1.interviewer])],
        controllers: [interviewer_controller_1.UserController],
        providers: [interviewer_service_1.jobInterviewerService],
    })
], jobInterviewerModule);
//# sourceMappingURL=interviewer.module.js.map
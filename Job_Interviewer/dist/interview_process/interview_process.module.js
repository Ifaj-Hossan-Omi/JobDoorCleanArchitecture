"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewProcessModule = void 0;
const common_1 = require("@nestjs/common");
const interview_process_service_1 = require("./interview_process.service");
const interview_process_controller_1 = require("./interview_process.controller");
const typeorm_1 = require("@nestjs/typeorm");
const interview_process_entity_1 = require("./entity/interview_process.entity");
let InterviewProcessModule = class InterviewProcessModule {
};
exports.InterviewProcessModule = InterviewProcessModule;
exports.InterviewProcessModule = InterviewProcessModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([interview_process_entity_1.interview_process])],
        controllers: [interview_process_controller_1.InterviewProcessController],
        providers: [interview_process_service_1.InterviewProcessService],
    })
], InterviewProcessModule);
//# sourceMappingURL=interview_process.module.js.map
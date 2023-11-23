"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobproviderModule = void 0;
const common_1 = require("@nestjs/common");
const jobprovider_service_1 = require("./jobprovider.service");
const jobprovider_controller_1 = require("./jobprovider.controller");
const typeorm_1 = require("@nestjs/typeorm");
const jobprovider_entity_1 = require("./entities/jobprovider.entity");
let JobproviderModule = class JobproviderModule {
};
exports.JobproviderModule = JobproviderModule;
exports.JobproviderModule = JobproviderModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([jobprovider_entity_1.Jobprovider])],
        controllers: [jobprovider_controller_1.JobproviderController],
        providers: [jobprovider_service_1.JobproviderService],
    })
], JobproviderModule);
//# sourceMappingURL=jobprovider.module.js.map
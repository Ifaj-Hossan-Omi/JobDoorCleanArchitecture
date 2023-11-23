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
exports.jobInterviewerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const JobInterviewer_entity_1 = require("./entity/JobInterviewer.entity");
const typeorm_2 = require("@nestjs/typeorm");
let jobInterviewerService = class jobInterviewerService {
    async get_profile(id) {
        var profile = await this.interviewerRepo.findOne({ where: { id: id }, relations: { interview_processes: true } });
        return profile;
    }
    async get() {
        return await this.interviewerRepo.find();
    }
    async login(userLoginDTO) {
        let userData = await this.interviewerRepo.findOneBy({ uname: userLoginDTO.username, pass: userLoginDTO.password });
        return userData;
    }
    async is_correct_password(id, old_password) {
        let result = await this.interviewerRepo.findOneBy({ id: id, pass: old_password });
        return result;
    }
    async change_password(id, new_password) {
        let obj = await this.interviewerRepo.findOneBy({ id: id });
        obj.pass = new_password;
        return await this.interviewerRepo.update(id, obj);
    }
    async change_email(id, mail) {
        let obj = await this.interviewerRepo.findOneBy({ id: id });
        obj.mail = mail;
        return await this.interviewerRepo.update(id, obj);
    }
    async change_uname(id, uname) {
        let obj = await this.interviewerRepo.findOneBy({ id: id });
        obj.uname = uname;
        return await this.interviewerRepo.update(id, obj);
    }
    async email_exists(email) {
        let result = await this.interviewerRepo.findOneBy({ mail: email });
        return result != null;
    }
    async uname_exists(uname) {
        let result = await this.interviewerRepo.findOneBy({ uname: uname });
        return result != null;
    }
    async registration(InterviewerRegistrationDTO) {
        let result = await this.interviewerRepo.insert(InterviewerRegistrationDTO);
        return result;
    }
    async update(id, InterviewerUpdateDTO) {
        var obj = await this.interviewerRepo.findOneBy({ id: id });
        obj.fname = InterviewerUpdateDTO.fname;
        obj.lname = InterviewerUpdateDTO.lname;
        obj.company = InterviewerUpdateDTO.company;
        obj.position = InterviewerUpdateDTO.position;
        obj.job_provider_id = InterviewerUpdateDTO.job_provider_id;
        let result = await this.interviewerRepo.update(id, obj);
        return result;
    }
    async delete(id) {
        let result = await this.interviewerRepo.delete(id);
        return result;
    }
    async update_image(id, file) {
        var interviewer = await this.interviewerRepo.findOneBy({ id: id });
        interviewer.image = file.filename;
        console.log(file.filename);
        var result = await this.interviewerRepo.update(id, interviewer);
        return result.affected > 0;
    }
};
exports.jobInterviewerService = jobInterviewerService;
__decorate([
    (0, typeorm_2.InjectRepository)(JobInterviewer_entity_1.interviewer),
    __metadata("design:type", typeorm_1.Repository)
], jobInterviewerService.prototype, "interviewerRepo", void 0);
exports.jobInterviewerService = jobInterviewerService = __decorate([
    (0, common_1.Injectable)()
], jobInterviewerService);
//# sourceMappingURL=interviewer.service.js.map
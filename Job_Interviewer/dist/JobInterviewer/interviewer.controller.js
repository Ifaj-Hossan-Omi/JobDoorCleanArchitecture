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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const interviewer_service_1 = require("./interviewer.service");
const interviewer_login_dto_1 = require("./dto/interviewer.login.dto");
const interviewer_guard_1 = require("./interviewer.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const interviewer_change_password_dto_1 = require("./dto/interviewer.change-password.dto");
const interviewer_registration_dto_1 = require("./dto/interviewer_registration.dto");
const interviewer_update_dto_1 = require("./dto/interviewer_update.dto");
const interviewer_change_email_dto_1 = require("./dto/interviewer_change_email.dto");
const interviewer_change_uname_dto_1 = require("./dto/interviewer_change_uname.dto");
const mailer_1 = require("@nestjs-modules/mailer");
let UserController = class UserController {
    constructor(jobInterviewerService, mailerService) {
        this.jobInterviewerService = jobInterviewerService;
        this.mailerService = mailerService;
    }
    get() {
        return this.jobInterviewerService.get();
    }
    get_profile(session) {
        const id = session.user_id;
        return this.jobInterviewerService.get_profile(id);
    }
    async login(userLoginDTO, session) {
        const userData = await this.jobInterviewerService.login(userLoginDTO);
        if (userData != null) {
            session.user_id = userData.id;
            session.email = userData.mail;
            session.usertype = "interviewer";
            return { Message: "Login is successfull" };
        }
        else {
            throw new common_1.NotFoundException({ Message: "Invalid credential" });
        }
    }
    logout(session) {
        session.destroy();
        return { Message: "Log out successfully" };
    }
    async create(InterviewerRegistrationDTO) {
        if (await this.jobInterviewerService.email_exists(InterviewerRegistrationDTO.mail)) {
            throw new common_1.BadRequestException({ Message: "Mail already exists" });
        }
        if (await this.jobInterviewerService.uname_exists(InterviewerRegistrationDTO.uname)) {
            throw new common_1.BadRequestException({ Message: "Username already exists" });
        }
        try {
            this.mailerService.sendMail({
                to: InterviewerRegistrationDTO.mail,
                from: 'noneedradakash@gmail.com',
                subject: 'Welcome to Job Door Cleaner Architecture',
                text: 'Registration is successfyl',
                html: '<b>welcome</b>',
            });
        }
        catch (e) {
            console.log(e);
        }
        return this.jobInterviewerService.registration(InterviewerRegistrationDTO);
    }
    sendEmail() {
        const mail = "radshamat@gmail.com";
        try {
            this.mailerService.sendMail({
                to: mail,
                from: 'noneedradakash@gmail.com',
                subject: 'Welcome to Job Door Cleaner Architecture',
                text: 'Registration is successfyl',
                html: '<b>welcome</b>',
            });
            return { Message: "Message is sent" };
        }
        catch (e) {
            throw new common_1.InternalServerErrorException({ Message: "Email not send", Error: e });
        }
    }
    update(InterviewerUpdateDTO, session) {
        const id = session.user_id;
        return this.jobInterviewerService.update(id, InterviewerUpdateDTO);
    }
    async change_password(interviewerChangePasswordDto, session) {
        const id = session.user_id;
        if (await this.jobInterviewerService.is_correct_password(id, interviewerChangePasswordDto.old_password)) {
            return await this.jobInterviewerService.change_password(id, interviewerChangePasswordDto.new_password);
        }
        throw new common_1.ForbiddenException({ Message: "Old password is not correct" });
    }
    async change_email(interviewer_change_email_dto, session) {
        const id = session.user_id;
        var obj = await this.jobInterviewerService.is_correct_password(id, interviewer_change_email_dto.pass);
        if (obj == null) {
            throw new common_1.ForbiddenException({ Message: "Old password is not correct" });
        }
        if (obj.mail == interviewer_change_email_dto.mail) {
            throw new common_1.ForbiddenException({ Message: "You have choosed previous email" });
        }
        if (await this.jobInterviewerService.email_exists(interviewer_change_email_dto.mail)) {
            throw new common_1.ForbiddenException({ Message: "Email already exists." });
        }
        return await this.jobInterviewerService.change_email(id, interviewer_change_email_dto.mail);
    }
    async change_uname(interviewer_change_uname_dto, session) {
        const id = session.user_id;
        var obj = await this.jobInterviewerService.is_correct_password(id, interviewer_change_uname_dto.pass);
        if (obj == null) {
            throw new common_1.ForbiddenException({ Message: "Old password is not correct" });
        }
        if (obj.uname == interviewer_change_uname_dto.uname) {
            throw new common_1.ForbiddenException({ Message: "You have choosed previous email" });
        }
        if (await this.jobInterviewerService.email_exists(interviewer_change_uname_dto.uname)) {
            throw new common_1.ForbiddenException({ Message: "Email already exists." });
        }
        return await this.jobInterviewerService.change_uname(id, interviewer_change_uname_dto.uname);
    }
    uploadFile(file, session) {
        console.log(file);
        if (!file) {
            throw new common_1.NotAcceptableException({ Message: "File is required" });
        }
        const id = session.user_id;
        if (this.jobInterviewerService.update_image(id, file)) {
            return { Message: "Image update is successfull" };
        }
        else {
            throw new common_1.InternalServerErrorException({ Message: "Image update is not successful" });
        }
    }
    getImages(name, res) {
        res.sendFile(name, { root: './uploads' });
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "get", null);
__decorate([
    (0, common_1.UseGuards)(interviewer_guard_1.interviewerGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "get_profile", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interviewer_login_dto_1.interviewerLoginDTO, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('logout'),
    (0, common_1.UseGuards)(interviewer_guard_1.interviewerGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('registration'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interviewer_registration_dto_1.InterviewerRegistrationDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('send-email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "sendEmail", null);
__decorate([
    (0, common_1.Put)('update'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interviewer_update_dto_1.InterviewerUpdateDTO, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('change-password'),
    (0, common_1.UseGuards)(interviewer_guard_1.interviewerGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interviewer_change_password_dto_1.interviewerChangePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "change_password", null);
__decorate([
    (0, common_1.Patch)('change-email'),
    (0, common_1.UseGuards)(interviewer_guard_1.interviewerGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interviewer_change_email_dto_1.interviewer_change_email_dto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "change_email", null);
__decorate([
    (0, common_1.Patch)('change-uname'),
    (0, common_1.UseGuards)(interviewer_guard_1.interviewerGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interviewer_change_uname_dto_1.interviewer_change_uname_dto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "change_uname", null);
__decorate([
    (0, common_1.Post)('image'),
    (0, common_1.UseGuards)(interviewer_guard_1.interviewerGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 2 * 1024 * 1024 },
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        })
    })),
    __param(0, (0, common_1.UploadedFile)('file')),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('/getimage/:name'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getImages", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('jobInterviewer'),
    __metadata("design:paramtypes", [interviewer_service_1.jobInterviewerService,
        mailer_1.MailerService])
], UserController);
//# sourceMappingURL=interviewer.controller.js.map
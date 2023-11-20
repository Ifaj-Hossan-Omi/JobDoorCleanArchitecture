import { IsEmail, IsNotEmpty } from "class-validator";

export class interviewerForgetPasswordDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}
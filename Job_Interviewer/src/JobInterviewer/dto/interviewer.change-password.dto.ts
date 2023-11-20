import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class interviewerChangePasswordDto{
    @IsNotEmpty()
    old_password: string;

    @IsNotEmpty()
    @MinLength(8)
    new_password: string;
}
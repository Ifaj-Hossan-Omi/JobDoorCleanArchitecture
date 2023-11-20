import { IsEmail, IsNotEmpty } from "class-validator";

export class interviewer_change_email_dto{
    @IsNotEmpty()
    pass: string;

    @IsNotEmpty()
    @IsEmail()
    mail: string;
}
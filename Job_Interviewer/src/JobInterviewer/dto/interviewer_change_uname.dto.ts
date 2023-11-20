import { IsEmail, IsNotEmpty } from "class-validator";

export class interviewer_change_uname_dto{
    @IsNotEmpty()
    pass: string;

    @IsNotEmpty()
    uname: string;
}
import { IsEmail, IsNotEmpty } from "class-validator"

export class CreateJobproviderDto {
    @IsNotEmpty()
    uname: string

    @IsNotEmpty()
    pass: string

    @IsNotEmpty()
    @IsEmail()
    mail: string

    @IsNotEmpty()
    fname: string

    @IsNotEmpty()
    lname: string

    @IsNotEmpty()
    work_station: string
}

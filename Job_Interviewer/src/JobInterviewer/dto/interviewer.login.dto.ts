import { IsNotEmpty } from "class-validator"

export class interviewerLoginDTO {
    @IsNotEmpty()
    username: string
    @IsNotEmpty()
    password: string
}


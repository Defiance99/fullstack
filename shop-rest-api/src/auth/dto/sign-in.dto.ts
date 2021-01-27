import { IsNotEmpty, IsString, Length } from "class-validator"


export class SignInDto {
    @IsNotEmpty()
    @IsString()
    @Length(4,20)
    login: string

    @IsString()
    @Length(5,15)
    password: string
}
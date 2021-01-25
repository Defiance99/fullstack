import { IsNotEmpty, IsString, Length } from "class-validator"

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    @Length(5,15)
    userName: string

    @IsNotEmpty()
    @IsString()
    @Length(4,20)
    login: string

    @IsNotEmpty()
    @IsString()
    @Length(5,20)
    password: string
}
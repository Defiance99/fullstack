import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    @Length(4,20)
    userName: string

    @IsNotEmpty()
    @IsString()
    @Length(4,20)
    email: string

    @IsNotEmpty()
    @IsString()
    @Length(4,20)
    login: string

    @IsNotEmpty()
    @IsString()
    @Length(4,20)
    password: string
}
import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength, minLength } from "class-validator";

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    name : string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNumber()
    @IsNotEmpty()
    age: number

    @IsString()
    @MaxLength(10)
    @MinLength(6)
    password: string
}
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    name 

    @IsEmail()
    @IsNotEmpty()
    email

    @IsNumber()
    @IsNotEmpty()
    age
}
/* eslint-disable prettier/prettier */
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class UserDto {

    @IsString()
    nome: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
       minLength: 6,
       minNumbers: 0,
       minLowercase: 0,
       minSymbols: 0,
       minUppercase: 0
    })
    senha: string;

}
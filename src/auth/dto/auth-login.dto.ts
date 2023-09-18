import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class AuthLoginDTO {
  @IsEmail()
  login: string;

  @IsString()
  @IsStrongPassword({
    minLength: 6,
  })
  senha: string;
}

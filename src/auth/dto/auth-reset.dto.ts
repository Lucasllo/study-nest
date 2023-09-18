import { IsJWT, IsString, IsStrongPassword } from 'class-validator';

export class AuthResetDTO {
  @IsString()
  @IsStrongPassword({
    minLength: 6,
  })
  senha: string;

  @IsJWT()
  token: string;
}

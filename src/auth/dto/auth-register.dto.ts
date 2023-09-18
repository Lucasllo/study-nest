import { AuthLoginDTO } from './auth-login.dto';
import { PartialType } from '@nestjs/mapped-types';

export class AuthRegisterDTO extends PartialType(AuthLoginDTO) {}

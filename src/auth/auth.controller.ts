import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { login, senha }: AuthLoginDTO) {
    return this.authService.login(login, senha);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {}

  @Post('forget')
  async forget(@Body() { login }: AuthForgetDTO) {
    this.authService.forget(login);
  }

  @Post('reset')
  async reset(@Body() { senha, token }: AuthResetDTO) {
    this.authService.reset(senha, token);
  }
}
